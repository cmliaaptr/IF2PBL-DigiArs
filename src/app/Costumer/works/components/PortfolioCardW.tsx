"use client";
import { useState, useEffect, useMemo } from "react";
import ImageModalW from "./ImageModalW";

type Filter = string;

interface PortfolioItem {
  id: number;
  src: string;
  filter: Filter;
  videoUrl?: string;
  audioUrl?: string;
  judul: string;
  deskripsi: string;
}

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const API_BASE = `${BACKEND}/api/works`;
const FILE_BASE = `${BACKEND}/storage/works/`;

function pickArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.works)) return payload.works;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
}

function resolveStorageUrl(file?: string): string {
  const f = (file || "").trim();
  if (!f) return "";
  if (/^https?:\/\//i.test(f)) return f;
  if (f.startsWith("/storage/works/")) return `${BACKEND}${f}`;
  if (f.startsWith("storage/works/")) return `${BACKEND}/${f}`;
  return `${FILE_BASE}${f}`;
}

// ✅ ambil label filter dari DB, kalau kosong masuk Others
function normalizeFilter(value: any): string {
  const v = (value || "").toString().trim();
  return v !== "" ? v : "Others";
}

function DescModalW({
  open,
  title,
  desc,
  onClose,
}: {
  open: boolean;
  title: string;
  desc: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#121212] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h3 className="text-white font-semibold text-base md:text-lg">
            {title || "Detail"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {desc || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioCardW() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("All");

  // modal media (image/video/audio)
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video" | "audio";
    src: string;
  } | null>(null);

  // modal deskripsi panjang
  const [selectedDesc, setSelectedDesc] = useState<{
    judul: string;
    deskripsi: string;
  } | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        const data = await res.json();

        const getYoutubeId = (url: string) => {
          try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
            return u.searchParams.get("v") || "";
          } catch {
            return "";
          }
        };

        const getYoutubeThumb = (url?: string) => {
          if (!url) return "";
          const id = getYoutubeId(url);
          return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
        };

        const arr = pickArray(data);

        const mapped: PortfolioItem[] = arr.map((w: any) => {
          const videoUrl =
            w.link_video && String(w.link_video).trim() !== ""
              ? String(w.link_video).trim()
              : undefined;

          const thumbFromYoutube = videoUrl ? getYoutubeThumb(videoUrl) : "";

          const fotoUrl = resolveStorageUrl(w.foto);
          const audioUrl = resolveStorageUrl(w.audio);

          return {
            id: Number(w.id),
            filter: normalizeFilter(w.kategori), // ✅ dari DB
            src: fotoUrl || thumbFromYoutube || "/works/default.jpg",
            videoUrl,
            audioUrl: audioUrl || undefined,
            judul: w.judul || "",
            deskripsi: w.deskripsi || "",
          };
        });

        setItems(mapped);

        // kalau filter yang kepilih ternyata udah nggak ada, balik ke All
        const uniqueNow = new Set(mapped.map((x) => x.filter));
        setSelectedFilter((prev) => (prev === "All" || uniqueNow.has(prev) ? prev : "All"));
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    };

    fetchWorks();
  }, []);

  // ✅ tombol filter otomatis dari DB
  const filters = useMemo(() => {
    const unique = Array.from(
      new Set(items.map((x) => (x.filter || "").trim()).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    return ["All", ...unique];
  }, [items]);

  const filteredItems =
    selectedFilter === "All"
      ? items
      : items.filter((it) => it.filter === selectedFilter);

  const LONG_DESC_THRESHOLD = 110;

  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      {/* FILTER BUTTONS */}
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setSelectedFilter(f)}
            className={`text-sm md:text-base font-medium transition ${
              selectedFilter === f
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredItems.map((item) => {
          const descTrim = (item.deskripsi || "").trim();
          const isLong = descTrim.length > LONG_DESC_THRESHOLD;

          return (
            <div
              key={item.id}
              className="overflow-hidden rounded-xl cursor-pointer group"
              onClick={() => {
                if (item.audioUrl) {
                  setSelectedMedia({ type: "audio", src: item.audioUrl });
                } else if (item.videoUrl) {
                  setSelectedMedia({ type: "video", src: item.videoUrl });
                } else {
                  setSelectedMedia({ type: "image", src: item.src });
                }
              }}
            >
              <img
                src={item.src}
                alt={item.judul}
                className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
                }}
              />

              <div className="p-3">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {item.judul}
                </h3>

                <p className="text-gray-400 text-xs line-clamp-2">{descTrim}</p>

                {isLong && (
                  <button
                    className="mt-2 text-xs text-yellow-400 hover:text-yellow-300 underline underline-offset-4"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDesc({ judul: item.judul, deskripsi: item.deskripsi });
                    }}
                  >
                    Lainnya
                  </button>
                )}

                {item.audioUrl && (
                  <p className="text-xs text-yellow-400 mt-2">MP3</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal media */}
      {selectedMedia && (
        <ImageModalW media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}

      {/* Modal deskripsi panjang */}
      <DescModalW
        open={!!selectedDesc}
        title={selectedDesc?.judul || ""}
        desc={selectedDesc?.deskripsi || ""}
        onClose={() => setSelectedDesc(null)}
      />
    </section>
  );
}
