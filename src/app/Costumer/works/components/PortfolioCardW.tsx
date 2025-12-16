"use client";
import { useState, useEffect } from "react";
import ImageModalW from "./ImageModalW";

type Kategori =
  | "Photography"
  | "Videography"
  | "Animasi"
  | "Design"
  | "Broadcasting"
  | "Game"
  | "Sound Production"
  | "Sewa Barang";

interface PortfolioItem {
  id: number;
  src: string;          // thumbnail (foto / youtube thumb / default)
  category: Kategori;
  videoUrl?: string;    // youtube url / video url
  audioUrl?: string;    // mp3 url
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

function normalizeKategori(dbKategori: any): Kategori {
  const k = (dbKategori || "").toString().trim();

  const allowed: Kategori[] = [
    "Photography",
    "Videography",
    "Animasi",
    "Design",
    "Broadcasting",
    "Game",
    "Sound Production",
    "Sewa Barang",
  ];

  return (allowed.includes(k as Kategori) ? (k as Kategori) : "Photography");
}

export default function PortfolioCardW() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<"All" | Kategori>("All");
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video" | "audio";
    src: string;
  } | null>(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        const data = await res.json();
        console.log("API /works payload:", data);

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

          const kategori = normalizeKategori(w.kategori);

          const fotoUrl = resolveStorageUrl(w.foto);
          const audioUrl = resolveStorageUrl(w.audio);

          return {
            id: Number(w.id),
            category: kategori,
            src: fotoUrl || thumbFromYoutube || "/works/default.jpg",
            videoUrl,
            audioUrl: audioUrl || undefined,
            judul: w.judul || "",
            deskripsi: w.deskripsi || "",
          };
        });

        setPortfolioItems(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWorks();
  }, []);

  const categories: Array<"All" | Kategori> = [
    "All",
    "Photography",
    "Videography",
    "Animasi",
    "Design",
    "Broadcasting",
    "Game",
    "Sound Production",
    "Sewa Barang",
  ];

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      <div className="flex justify-center gap-6 mb-12 flex-wrap">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm md:text-base font-medium transition ${
              selectedCategory === cat
                ? "text-yellow-400 border-b-2 border-yellow-400"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredItems.map((item) => (
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
              alt={item.category}
              className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
              }}
            />

            <div className="p-3">
              <h3 className="text-white font-semibold text-sm mb-1">
                {item.judul}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2">
                {item.deskripsi}
              </p>

              {/* Optional label */}
              {item.audioUrl && (
                <p className="text-xs text-yellow-400 mt-1">MP3</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {selectedMedia && (
        <ImageModalW
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </section>
  );
}
