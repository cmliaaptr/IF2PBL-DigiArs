"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type LayananItem = {
  title: string;
  desc: string;
  img: string;
};

const layanan: LayananItem[] = [
  {
    title: "Fotografi",
    desc: "",
    img: "/foto1.jpg",
  },
  {
    title: "Videografi",
    desc: "",
    img: "/foto2.jpg",
  },
  {
    title: "Animasi",
    desc: "",
    img: "/foto3.jpg",
  },
  {
    title: "Broadcasting",
    desc: "",
    img: "/foto4.jpg",
  },
  {
    title: "Desain Grafis",
    desc: "",
    img: "/foto5.jpg",
  },
  {
    title: "Game",
    desc: "",
    img: "/foto6.jpg",
  },
  {
    title: "sewa barang multimedia",
    desc: "",
    img: "/foto5.jpg",
  },
  {
    title: "sound production",
    desc: "",
    img: "/foto5.jpg",
  },
];

export default function LayananLP() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const isPausedRef = useRef(false);

  const [selected, setSelected] = useState<LayananItem | null>(null);

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
  }, []);

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
            <img
              src={item.img}
              alt={item.title}
              className="w-30 h-50 md:h-52 object-cover brightness-90 hover:brightness-100 transition"
            />
            <div className="p-5 text-left">
              <h3 className="text-xl font-semibold mb-2 text-yellow-400">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                {item.desc}
              </p>
            </div>
          </motion.div>
        ))}
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

              <img
                src={selected.img}
                alt={selected.title}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-2xl font-bold text-yellow-400 mb-3">
                {selected.title}
              </h3>
              <p className="text-gray-300">{selected.desc}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}