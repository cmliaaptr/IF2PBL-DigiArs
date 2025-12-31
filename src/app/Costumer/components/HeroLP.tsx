import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('/images/bglp.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      >
      {/* Overlay agar teks lebih kontras */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
    </section>
  );
}
