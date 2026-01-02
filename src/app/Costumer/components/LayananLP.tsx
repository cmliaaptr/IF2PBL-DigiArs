"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LayananApi = {
  id: number;
  foto?: string;
  link_video?: string;
  kategori_nama?: string;
  kategori?: string;
  judul?: string;
  deskripsi?: string;
};

type LayananItem = {
  title: string;
  desc: string;
  img: string;
  videoUrl?: string;
};

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const API_BASE = `${BACKEND}/api/layanan/public`;
const FILE_BASE = `${BACKEND}/storage/layanan/`;

function pickArray(payload: any): any[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.layanan)) return payload.layanan;
  if (Array.isArray(payload?.rows)) return payload.rows;
  return [];
}

function resolveStorageUrl(file?: string): string {
  const f = (file || "").trim();
  if (!f) return "";
  if (/^https?:\/\//i.test(f)) return f;
  if (f.startsWith("/storage/layanan/")) return `${BACKEND}${f}`;
  if (f.startsWith("storage/layanan/")) return `${BACKEND}/${f}`;
  return `${FILE_BASE}${f}`;
}

function getYoutubeId(url: string) {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    if (host === "youtu.be") return u.pathname.split("/")[1] || "";

    if (host.includes("youtube.com")) {
      const v = u.searchParams.get("v");
      if (v) return v;

      const parts = u.pathname.split("/").filter(Boolean);
      if (parts[0] === "shorts" && parts[1]) return parts[1];
      if (parts[0] === "embed" && parts[1]) return parts[1];
    }

    return "";
  } catch {
    return "";
  }
}

function getYoutubeThumb(url?: string) {
  if (!url) return "";
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

function toYoutubeEmbedUrl(url: string) {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

export default function LayananLP() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const [layanan, setLayanan] = useState<LayananItem[]>([]);
  const [selected, setSelected] = useState<LayananItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLayanan = async () => {
      setLoading(true);
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });

        if (!res.ok) {
          const text = await res.text().catch(() => "");
          console.error("FETCH LAYANAN FAILED:", res.status, text);
          setLayanan([]);
          return;
        }

        const payload = await res.json();
        const arr = pickArray(payload) as LayananApi[];

        const mapped: LayananItem[] = (arr || [])
          .map((x) => {
            const videoUrl =
              x.link_video && String(x.link_video).trim() !== ""
                ? String(x.link_video).trim()
                : undefined;

            const fotoUrl = resolveStorageUrl(x.foto);
            const thumb = videoUrl ? getYoutubeThumb(videoUrl) : "";
            const img = fotoUrl || thumb || "/works/default.jpg";

            const kategori =
              (x.kategori_nama || x.kategori || "").toString().trim();

            return {
              title: (x.judul || kategori || `Layanan ${x.id}`).toString(),
              desc: (x.deskripsi || "").toString(),
              img,
              videoUrl,
            };
          })
          .filter((x) => !!x.img);

        setLayanan(mapped);
      } catch (e) {
        console.error("FETCH ERROR:", e);
        setLayanan([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLayanan();
  }, []);

  // Auto scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    if (layanan.length === 0) return;

    const step = () => {
      if (isPausedRef.current) return;

      container.scrollLeft += 1;

      // reset ketika mendekati mentok kanan
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 5) {
        container.scrollLeft = 0;
      }
    };

    intervalRef.current = window.setInterval(step, 25);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [layanan.length]);

  // ✅ tetap duplicate untuk looping, tapi yang duplikat disembunyikan
  const cards = layanan.length > 0 ? [...layanan, ...layanan] : [];

  return (
    <section id="layanan" className="py-20 bg-[#141414] text-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-500">
          Layanan Kami
        </h2>
        <p className="text-gray-400 mt-2">
          Kami menyediakan berbagai layanan kreatif untuk memenuhi kebutuhan visual Anda
        </p>
      </div>

      {loading && (
        <div className="text-center text-gray-400 pb-6">Memuat layanan...</div>
      )}

      {!loading && layanan.length === 0 && (
        <div className="text-center text-gray-400 pb-6">Belum ada layanan.</div>
      )}

      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-hide"
      >
        {cards.map((item, idx) => {
          const isDup = idx >= layanan.length;

          return (
            <motion.div
              key={idx}
              onClick={() => {
                if (!isDup) setSelected(item); // ✅ duplikat tidak bisa diklik
              }}
              className={`min-w-[240px] md:min-w-[280px] bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer hover:shadow-yellow-500/20 transition-all ${
                isDup ? "opacity-0 pointer-events-none" : ""
              }`}
              whileTap={{ scale: 1.03 }}
              whileHover={{ scale: 1.02 }}
              aria-hidden={isDup}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-48 md:h-52 object-cover brightness-90 hover:brightness-100 transition"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
                }}
              />

              <div className="p-5 text-left">
                <h3 className="text-xl font-semibold text-yellow-400">
                  {item.title}
                </h3>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Popup Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="bg-[#1f1f1f] text-white rounded-2xl shadow-xl w-[95%] md:w-[1000px] max-h-[90vh] overflow-hidden"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 p-6 border-b border-gray-700/50">
                <h3 className="text-2xl font-bold text-yellow-400">
                  {selected.title}
                </h3>

                <button
                  className="text-gray-400 hover:text-white"
                  onClick={() => setSelected(null)}
                  aria-label="Close"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
                <div className="relative w-full h-[320px] md:h-[520px] bg-black overflow-hidden rounded-xl">
                  {selected.videoUrl &&
                  (selected.videoUrl.includes("youtube.com") ||
                    selected.videoUrl.includes("youtu.be")) ? (
                    <iframe
                      src={toYoutubeEmbedUrl(selected.videoUrl)}
                      title="Video Player"
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : selected.videoUrl ? (
                    <video
                      src={selected.videoUrl}
                      controls
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={selected.img}
                      alt={selected.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "/works/default.jpg";
                      }}
                    />
                  )}
                </div>

                <p className="mt-5 text-gray-300 whitespace-pre-line leading-relaxed">
                  {selected.desc ? selected.desc : "Deskripsi belum tersedia."}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
