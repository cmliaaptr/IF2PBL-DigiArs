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
          Adalah production house kreatif yang didirikan oleh Politeknik Negeri Batam sebagai sarana pembelajaran 
          berbasis proyek untuk mahasiswa jurusan Teknik Informatika (Prodi Multimedia Jaringan dan Prodi Animasi). 
          Kami berfokus pada pembuatan kontek multimedia dan animasi sebagai wujud kolaborasi antara teknologi digital
          dan seni.
        </p>
      </div>
    </section>
  );
}
