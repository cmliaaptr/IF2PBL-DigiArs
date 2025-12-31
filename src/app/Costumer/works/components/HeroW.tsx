"use client";
import Image from "next/image";

export default function HeroW() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-start px-10 md:px-20 text-white"
      style={{
        backgroundImage: "url('/images/bgworks.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/15"></div>

      {/* Konten teks */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Setiap Karya <br /> Punya Cerita
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Dari fotografi, videografi, hingga animasi kami membantu brand dan individu 
          mengabadikan momen dengan sentuhan kreatif.
        </p>
      </div>
    </section>
  );
}
