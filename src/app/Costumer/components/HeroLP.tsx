import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/bg-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay agar teks lebih kontras */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Konten Hero */}
      <div className="relative z-20 text-center text-white px-4">
        <h1 className="text-4xl md:text-4xl font-bold mb-4">
          Tempat Terbaik
        </h1>
        <p className="text-4xl md:text-8xl font-bold mb-8 text-gray-300">
          Portfolio
        </p>
        <p className="text-4xl md:text-8xl font-bold mb-8 text-sky-500">
          Digiars
        </p>
        <Link href="/Costumer/works">
        <button className="bg-sky-400 hover:bg-sky-500 text-black font-semibold px-6 py-3 rounded-xl transition">
          Lihat Portfolio
        </button>
        </Link> 
      </div>
    </section>
  );
}
