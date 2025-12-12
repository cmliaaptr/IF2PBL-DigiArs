"use client";

import React, { useEffect, useRef } from "react";

const portfolio = [
  { img: "/p1.jpg", alt: "Project 1" },
  { img: "/p2.jpg", alt: "Project 2" },
  { img: "/p3.jpg", alt: "Project 3" },
  { img: "/p4.jpg", alt: "Project 4" },
  { img: "/p5.jpg", alt: "Project 5" },
];

export default function PortfolioLP() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const step = () => {
      if (isPausedRef.current) return;
      container.scrollLeft += 1;

      // untuk mengulang dari awal auto scrollnya
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
        container.scrollLeft = 0;
      }
    };

    intervalRef.current = window.setInterval(step, 18);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

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
        {portfolio.map((p, i) => (
          <div key={i} className="min-w-[220px] md:min-w-[260px] bg-gray-800 rounded-xl overflow-hidden flex-shrink-0">
            <img src={p.img} alt={p.alt} className="w-full h-48 object-cover" />
          </div>
        ))}

        {/* duplicate for smoother infinite loop (optional) */}
        {portfolio.map((p, i) => (
          <div key={`dup-${i}`} className="min-w-[220px] md:min-w-[260px] bg-gray-800 rounded-xl overflow-hidden flex-shrink-0" aria-hidden>
            <img src={p.img} alt={p.alt} className="w-full h-48 object-cover" />
          </div>
        ))}
      </div>
    </section>
  );
}
