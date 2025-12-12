"use client";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative w-full h-[90vh] flex items-center justify-start px-10 md:px-20 text-white"
      style={{
        backgroundImage: "url('/images/bglayanan.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Konten teks */}
      <div className="relative z-10 max-w-2xl">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
            Layanan DigiArs
        </h1>
        <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">
          Kami menyediakan berbagai layanan mulai dari fotografi, videografi
          dan lainnya, kami juga menyediakan layanan penyewaan barang dengan 
          berbagai macam barang multimedia untuk memenuhi kebutuhan anda

        </p>
        <Link href="/Costumer/contact">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition">
          Hubungi Kami
        </button>
        </Link>
      </div>
    </section>
  );
}
