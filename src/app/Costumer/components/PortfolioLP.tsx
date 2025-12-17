"use client";

import React, { useEffect, useRef, useState } from "react";

type Work = {
  id: number;
  foto?: string;
  link_video?: string;
  kategori?: string;
  judul?: string;
  deskripsi?: string;
};

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

export default function PortfolioLP() {
  const [items, setItems] = useState<{ img: string; alt: string; id: number }[]>(
    []
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  // 1) Fetch Works dari backend
  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch(API_BASE, { cache: "no-store" });
        const payload = await res.json();
        const arr = pickArray(payload) as Work[];

        const mapped = arr
          .map((w) => {
            const fotoUrl = resolveStorageUrl(w.foto);
            const thumb = w.link_video ? getYoutubeThumb(w.link_video) : "";
            const img = fotoUrl || thumb || "/works/default.jpg";

            return {
              id: Number(w.id),
              img,
              alt: w.judul ? w.judul : `Work ${w.id}`,
            };
          })
          // optional: buang item yang benar2 kosong
          .filter((x) => !!x.img);

        setItems(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWorks();
  }, []);

  // 2) Auto scroll (tetap seperti template kamu)
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

    intervalRef.current = window.setInterval(step, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [items.length]); // <- supaya jalan setelah data masuk

  const handleMouseEnter = () => (isPausedRef.current = true);
  const handleMouseLeave = () => (isPausedRef.current = false);

  return (
    <section id="portfolio" className="py-20 bg-[#141414] text-white">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-yellow-500">Portfolio Kami</h2>
      </div>

      <div
        ref={scrollRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="flex gap-6 overflow-x-auto px-6 py-4 scrollbar-hide"
      >
        {items.map((p) => (
          <div
            key={p.id}
            className="min-w-[220px] md:min-w-[260px] bg-gray-800 rounded-xl overflow-hidden flex-shrink-0"
          >
            <img
              src={p.img}
              alt={p.alt}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
              }}
            />
          </div>
        ))}

        {/* duplicate for smoother infinite loop */}
        {items.map((p) => (
          <div
            key={`dup-${p.id}`}
            className="min-w-[220px] md:min-w-[260px] bg-gray-800 rounded-xl overflow-hidden flex-shrink-0"
            aria-hidden
          >
            <img
              src={p.img}
              alt={p.alt}
              className="w-full h-48 object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/works/default.jpg";
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
