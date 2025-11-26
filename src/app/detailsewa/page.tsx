"use client";

import { useState } from "react";
import HeroB from "./components/HeroB";
import CardB from "./components/CardB";
import ImageModal from "./components/ImageModal";

export default function Home() {
    
  const categories = ["semua", "kamera", "audio", "lighting", "aksesoris"];

  const items = [
    {
      img: "/items/lensa1.png",
      name: "Lensa Lumi 14-42mm F3.5 - 5.6",
      category: "kamera",
    },
    {
      img: "/items/tripod.png",
      name: "Lensa Lumi 14-42mm F3.5 - 5.6",
      category: "aksesoris",
    },
    {
      img: "/items/mixer.png",
      name: "Atem Mini Extreme",
      category: "audio",
    },
    {
      img: "/items/wireless.png",
      name: "Cineye-2s Pro",
      category: "audio",
    },
    {
      img: "/items/reflektor.png",
      name: "Reflektor Cahaya",
      category: "lighting",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState("semua");
  const [modalImage, setModalImage] = useState<string | null>(null);

  const filtered = selectedCategory === "semua"
    ? items
    : items.filter((i) => i.category === selectedCategory);

  return (
    <>
    <HeroB />
    <section className="min-h-screen bg-neutral-900 text-white px-5 pt-10">
      {/* Dropdown */}
      <div className="mb-6">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-lg"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      {/* Grid Items */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {filtered.map((item, i) => (
          <CardB
            key={i}
            img={item.img}
            name={item.name}
            onClick={() => setModalImage(item.img)}
          />
        ))}
      </div>

      {/* Modal untuk image pop up */}
      {modalImage && (
        <ImageModal img={modalImage} onClose={() => setModalImage(null)} />
      )}
      
    </section>
    </>
  );
}
