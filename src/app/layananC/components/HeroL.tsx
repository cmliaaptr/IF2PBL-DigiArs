"use client";

export default function HeroL() {
  return (
    <section className="relative h-[80vh] flex items-center justify-start text-left px-8 md:px-20 overflow-hidden">
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black bg-opacity-60" />

      <div className="relative z-10 max-w-xl">
        <h1 className="text-5xl font-bold mb-4">Layanan DigiArs</h1>
        <p className="text-lg mb-6">
          Kami menyediakan layanan penyewaan alat multimedia, videografi, fotografi
          untuk berbagai kebutuhan acara anda.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition">
          Hubungi Kami
        </button>
      </div>
    </section>
  );
}
