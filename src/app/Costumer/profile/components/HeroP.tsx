"use client";
import Image from "next/image";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-start px-10 md:px-20 text-white"
      style={{
        backgroundImage: "url('/images/bgherow.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay gelap */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Konten teks */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            DigiArs
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed">
          Kami adalah rumah produksi kreatif yang berisikan para professional di bidangnya
          masing-masing. Menjamin ide yang mitra kami miliki tervisualisasikan sesuai dengan apa yang
          diimpikan. Dengan lebih dari 10 tahun pengalaman kami membantu para mitra untuk
          merancang hingga mendokumentasikan berbagai kebutuhan kreatif yang dapat dipikirkan.
        </p>
      </div>
    </section>
  );
}
