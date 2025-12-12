"use client";

export default function Portfolio() {
  const data = [
    {
      img: "/design2.png",
      title: "Motion Graphic Campaign",
      desc: "Proyek animasi promosi produk dengan gaya modern dan dinamis.",
    },
    {
      img: "/design3.png",
      title: "Explainer Video Startup",
      desc: "Video singkat menjelaskan konsep bisnis startup dengan visual menarik.",
    },
    {
      img: "/design4.png",
      title: "Brand Animation",
      desc: "Meningkatkan awareness melalui karakter dan gerakan brand yang khas.",
    },
    {
      img: "/design5.png",
      title: "Social Media Ads",
      desc: "Konten animasi untuk iklan sosial media dengan efek visual halus.",
    },
  ];

  return (
    <section id="portfolio" className="py-16 text-center bg-neutral-950 text-white">
      <h2 className="text-3xl font-semibold font-serif mb-10">Portfolio</h2>

      <div className="relative mx-auto max-w-7xl px-4">
        {/* TRACK / RAIL SLIDER */}
        <div
          className="
            flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-smooth
            [scrollbar-width:none] [&::-webkit-scrollbar]:hidden
            rounded-2xl
          "
          style={{ scrollPaddingLeft: "0.5rem", scrollPaddingRight: "0.5rem" }}
        >
          {data.map((item, i) => {
            const idx = i + 1;
            const prev = i === 0 ? data.length : i;         // ke slide sebelumnya
            const next = i === data.length - 1 ? 1 : i + 2; // ke slide berikutnya

            return (
              <article
                key={idx}
                id={`slide-${idx}`}
                className="
                  snap-center shrink-0
                  w-[88%] md:w-[60%] lg:w-[40%]
                  overflow-hidden rounded-2xl ring-1 ring-white/10
                  bg-neutral-900 text-left relative
                  hover:scale-[1.02] transition-transform duration-300
                "
              >
                {/* Gambar placeholder (ganti dengan <Image /> jika perlu) */}
                <div className="aspect-video bg-neutral-800 flex items-center justify-center text-neutral-500">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Kontrol kiri/kanan (tanpa JS) */}
                <div className="pointer-events-none absolute inset-y-0 left-0 right-0 flex items-center justify-between px-2">
                  
                </div>
              </article>
            );
          })}
        </div>

        {/* Indicator / Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {data.map((_, i) => {
            const idx = i + 1;
            return (
              <a
                key={idx}
                href={`#slide-${idx}`}
                aria-label={`Ke slide ${idx}`}
                className="h-2 w-2 rounded-full bg-neutral-600 hover:bg-neutral-400 ring-1 ring-white/10 transition"
              />
            );
          })}
        </div>
      </div>

      <div className="mt-10">
        <a
          href="#slide-1"
          className="bg-violet-500 hover:bg-violet-400 text-neutral-900 font-semibold font-serif px-6 py-3 rounded-full shadow-lg shadow-violet-500/20 transition-all"
        >
          Portofolio Lain
        </a>
      </div>
    </section>
  );
}
