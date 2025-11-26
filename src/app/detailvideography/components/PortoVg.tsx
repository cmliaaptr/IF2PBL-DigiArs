"use client";

import { useState } from "react";
import ImageModal from "./ImageModal";

export default function Portfolio() {
  const [selected, setSelected] = useState<{
    img: string;
    title: string;
  } | null>(null);

  const data = [
    {
      img: "/animasi.jpg",
      title: "Motion Graphic Campaign",
      desc: "Proyek animasi promosi produk dengan gaya modern dan dinamis.",
    },
    {
      img: "/animasi2.jpg",
      title: "Explainer Video Startup",
      desc: "Video singkat menjelaskan konsep bisnis startup dengan visual menarik.",
    },
    {
      img: "/animasi3.jpg",
      title: "Brand Animation",
      desc: "Meningkatkan awareness melalui karakter dan gerakan brand yang khas.",
    },
    {
      img: "/animasi4.jpg",
      title: "Social Media Ads",
      desc: "Konten animasi untuk iklan sosial media dengan efek visual halus.",
    },
  ];

  return (
    <section id="portfolio" className="py-16 text-center bg-neutral-950 text-white">
      <h2 className="text-3xl font-semibold font-serif mb-10">Portfolio</h2>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* SLIDER */}
        <div
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            rounded-2xl
          "
          style={{ scrollPaddingLeft: "0.5rem", scrollPaddingRight: "0.5rem" }}
        >
          {data.map((item, i) => {
            const idx = i + 1;

            return (
              <article
                key={idx}
                id={`slide-${idx}`}
                onClick={() => setSelected(item)}
                className="
                  snap-center shrink-0 cursor-pointer
                  w-[88%] md:w-[60%] lg:w-[40%]
                  overflow-hidden rounded-2xl ring-1 ring-white/10
                  bg-neutral-900 text-left relative
                  hover:scale-[1.02] transition-transform duration-300
                "
              >
                <div className="aspect-video bg-neutral-800 flex items-center justify-center">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </article>
            );
          })}
        </div>

        {/* DOTS */}
        <div className="mt-6 flex justify-center gap-2">
          {data.map((_, i) => {
            const idx = i + 1;
            return (
              <a
                key={idx}
                href={`#slide-${idx}`}
                aria-label={`Ke slide ${idx}`}
                className="h-2 w-2 rounded-full bg-neutral-600 hover:bg-neutral-400 ring-1 ring-white/10 transition"
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <a
          href="#slide-1"
          className="bg-violet-500 hover:bg-violet-400 text-neutral-900 font-semibold font-serif px-6 py-3 rounded-full shadow-lg shadow-violet-500/20 transition-all"
        >
          Portofolio Lain
        </a>
      </div>

      {/* MODAL */}
      {selected && (
        <ImageModal
          img={selected.img}
          title={selected.title}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}
