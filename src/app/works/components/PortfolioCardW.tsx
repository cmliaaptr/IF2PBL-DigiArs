"use client";
import { useState } from "react";
import ImageModalW from "./ImageModalW";

interface PortfolioItem {
  id: number;
  src: string; // thumbnail
  category: "Foto" | "Video" | "Animasi";
  videoUrl?: string; // optional untuk video / animasi
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, src: "/works/foto1.jpg", category: "Foto" },
  { id: 2, src: "/works/foto2.jpg", category: "Foto" },
  {
    id: 3,
    src: "/works/video1.jpg",
    category: "Video",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  },
  {
    id: 4,
    src: "/works/video2.jpg",
    category: "Video",
    videoUrl: "https://www.youtube.com/embed/Zi_XLOBDo_Y",
  },
  {
    id: 5,
    src: "/works/animasi1.jpg",
    category: "Animasi",
    videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
  },
  { id: 6, src: "/works/animasi2.jpg", category: "Animasi" },
  { id: 7, src: "/works/foto3.jpg", category: "Foto" },
  { id: 8, src: "/works/video3.jpg", category: "Video", videoUrl: "/works/sample.mp4" },
  { id: 9, src: "/works/animasi3.jpg", category: "Animasi" },
];

export default function PortfolioCardW() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<{ type: "image" | "video"; src: string } | null>(null);

  const categories = ["All", "Foto", "Video", "Animasi"];

  const filteredItems =
    selectedCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  return (
    <section className="bg-[#0a0a0a] py-20 px-6">
      {/* Filter Buttons */}
      <div className="flex justify-center gap-6 mb-12">
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

      {/* Grid Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="overflow-hidden rounded-xl cursor-pointer group"
            onClick={() =>
              item.videoUrl
                ? setSelectedMedia({ type: "video", src: item.videoUrl })
                : setSelectedMedia({ type: "image", src: item.src })
            }
          >
            <img
              src={item.src}
              alt={item.category}
              className="w-full h-64 object-cover rounded-lg transform group-hover:scale-105 transition duration-300"
            />
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <ImageModalW media={selectedMedia} onClose={() => setSelectedMedia(null)} />
      )}
    </section>
  );
}
