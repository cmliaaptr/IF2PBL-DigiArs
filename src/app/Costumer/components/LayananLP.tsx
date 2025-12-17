"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LayananApi = {
  id: number;
  foto?: string;
  link_video?: string;
  kategori?: string;
  judul?: string;
  deskripsi?: string;
};

type LayananItem = {
  title: string;
  desc: string;
  img: string;        // thumbnail (foto atau youtube thumb)
  videoUrl?: string;  // link video asli (youtube/url)
};

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const API_BASE = `${BACKEND}/api/layanan`;
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
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.hostname.includes("youtube.com")) return u.searchParams.get("v") || "";
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
  try {
    const u = new URL(url);

    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    if (u.hostname.includes("youtube.com")) {
      const id = u.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    }

    return url;
  } catch {
    return url;
  }
}

export default function LayananLP() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const [layanan, setLayanan] = useState<LayananItem[]>([]);
  const [selected, setSelected] = useState<LayananItem | null>(null);

  // Fetch layanan
  useEffect(() => {
    const fetchLayanan = async () => {
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        const payload = await res.json();
        const arr = pickArray(payload) as LayananApi[];

        const mapped: LayananItem[] = arr
          .map((x) => {
            const videoUrl =
              x.link_video && String(x.link_video).trim() !== ""
                ? String(x.link_video).trim()
                : undefined;

            const fotoUrl = resolveStorageUrl(x.foto);
            const thumb = videoUrl ? getYoutubeThumb(videoUrl) : "";
            const img = fotoUrl || thumb || "/works/default.jpg";

            return {
              title: x.judul || x.kategori || `Layanan ${x.id}`,
              desc: x.deskripsi || "",
              img,
              videoUrl,
            };
          })
          .filter((x) => !!x.img);

        setLayanan(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchLayanan();
  }, []);

  // Auto scroll (template kamu)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const step = () => {
      if (isPausedRef.current) return;
      container.scrollLeft += 1;
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    };

    intervalRef.current = window.setInterval(step, 25);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [layanan.length]);

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

      <div
        ref={scrollRef}
        onMouseEnter={() => (isPausedRef.current = true)}
        onMouseLeave={() => (isPausedRef.current = false)}
        className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-hide"
      >
        {layanan.map((item, idx) => (
          <motion.div
            key={idx}
            onClick={() => setSelected(item)}
            className="min-w-[100px] md:min-w-[280px] bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer hover:shadow-yellow-500/20 transition-all"
            whileTap={{ scale: 1.05 }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Ukuran gambar sesuai template layanan */}
            <img
              src={item.img}
              alt={item.title}
              className="w-full h-48 md:h-52 object-cover brightness-90 hover:brightness-100 transition"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
              }}
            />

            {/* Depan: hanya judul */}
            <div className="p-5 text-left">
              <h3 className="text-xl font-semibold text-yellow-400">
                {item.title}
              </h3>
            </div>
          </motion.div>
        ))}

        {/* duplicate for smoother infinite loop (optional) */}
        {layanan.map((item, idx) => (
          <motion.div
            key={`dup-${idx}`}
            onClick={() => setSelected(item)}
            className="min-w-[100px] md:min-w-[280px] bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer hover:shadow-yellow-500/20 transition-all"
            whileTap={{ scale: 1.05 }}
            whileHover={{ scale: 1.03 }}
            aria-hidden
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
        ))}
      </div>

      {/* Popup Modal: ukuran media harus SAMA (w-full h-48) */}
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
              className="bg-[#1f1f1f] text-white rounded-2xl max-w-md w-[90%] p-6 relative shadow-lg"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
                onClick={() => setSelected(null)}
              >
                <X size={24} />
              </button>

              {/* MEDIA WRAPPER: SAMA utk image/video */}
              <div className="rounded-lg mb-4 w-full h-48 overflow-hidden">
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
                    autoPlay
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

              <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                {selected.title}
              </h3>

              {/* Deskripsi hanya di popup */}
              <p className="text-gray-300">
                {selected.desc ? selected.desc : "Deskripsi belum tersedia."}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
