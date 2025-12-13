"use client";
import { useState, useEffect } from "react";
import ImageModalW from "./ImageModalW";

interface PortfolioItem {
  id: number;
  src: string; // thumbnail
  category: "Foto" | "Video" | "Animasi";
  videoUrl?: string; // optional untuk video / animasi
  judul: string;
  deskripsi: string;
}

const API_BASE = "http://192.168.1.13:8001/api/works";

export default function PortfolioCardW() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMedia, setSelectedMedia] = useState<{
    type: "image" | "video";
    src: string;
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

        const mapped: PortfolioItem[] = (Array.isArray(data) ? data : []).map(
          (w: any) => {
            const videoUrl =
              w.link_video && w.link_video.trim() !== ""
                ? w.link_video
                : undefined;

            const thumbFromYoutube = videoUrl ? getYoutubeThumb(videoUrl) : "";

            const dbKategori = (w.kategori || "").toString().trim();
            const kategori =
              dbKategori === "Foto" ||
              dbKategori === "Video" ||
              dbKategori === "Animasi"
                ? (dbKategori as "Foto" | "Video" | "Animasi")
                : videoUrl
                ? "Video"
                : "Foto";

            return {
              id: w.id,
              category: kategori,
              // ✅ kalau ada foto pakai foto, kalau tidak ada dan ada youtube pakai thumbnail youtube
              src: w.foto
                ? `/works/${w.foto}`
                : thumbFromYoutube || "/works/default.jpg",
              videoUrl,
              judul: w.judul,
              deskripsi: w.deskripsi,
            };
          }
        );

        setPortfolioItems(mapped);
      } catch (e) {
        console.error(e);
      }
    };

    fetchWorks();
  }, []);

  const categories: Array<"All" | "Foto" | "Video" | "Animasi"> = [
    "All",
    "Foto",
    "Video",
    "Animasi",
  ];

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

            {/* JUDUL & DESKRIPSI */}
            <div className="p-3">
              <h3 className="text-white font-semibold text-sm mb-1">
                {item.judul}
              </h3>
              <p className="text-gray-400 text-xs line-clamp-2">
                {item.deskripsi}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMedia && (
        <ImageModalW
          media={selectedMedia}
          onClose={() => setSelectedMedia(null)}
        />
      )}
    </section>
  );
}
