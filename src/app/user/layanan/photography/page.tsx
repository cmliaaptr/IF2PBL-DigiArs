"use client";

import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      {/* SECTION 1: Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 gap-10">
        <div className="max-w-lg">
          <h1 className="text-5xl font-elegante mb-6">Jasa Fotography</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Merekam setiap moment menjadi cerita hidup. Dari dokumentasi acara hingga foto produk, kami hadirkan karya visual yang penuh dengan makna.
          </p>
          <a
            href="https://wa.me/62812345678"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 transition py-3 px-8 rounded-lg text-lg font-semibold inline-block"
          >
            Hubungi Kami
          </a>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <Image
                src="/images/photography.svg"
                alt="Photography"
                width={400}
                height={400}
                className="rounded-lg"
            />
        </div>
      </section>

      {/* SECTION 2: Keunggulan */}
      <section className="px-8 md:px-24 py-16 bg-black text-center">
        <h2 className="text-2xl font-elegante mb-10">
          Apa saja yang bisa didapatkan?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {[
            {
              title: "Peralatan Profesional",
              desc: "Peralatan modern menghasilkan gambar tajam dan berkarakter",
              icon: "/images/open pelican case.png",
            },
            {
              title: "Retouching & Editing Berkualitas",
              desc: "Proses pasca-produksi dilakukan secara detail untuk hasil akhir yang sempurna",
              icon: "/images/Idea yellow lamp.png",
            },
            {
              title: "Konsep Pemotretan Kreatif",
              desc: "Kami membantu merancang konsep visual sesuai dengan brand dan pesan yang ingin disampaikan",
              icon: "/images/edit image.png",
            },
            {
              title: "Beragam Jenis Pemotretan",
              desc: "Layanan mencakup foto produk, potrait hingga landscape",
              icon: "/images/Woman photographer.png",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-teal-700 hover:bg-teal-600 transition rounded-xl p-6 flex flex-col gap-4 shadow-md"
            >
              <div className="h-12 w-12">
                {item.icon && (
                  <Image
                    src={item.icon}
                    alt={item.title}
                    width={48}
                    height={48}
                  />
                )}
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="text-gray-200 text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Mengapa DigiArs */}
      <section className="px-8 md:px-24 py-20 bg-black flex flex-col items-center text-center">
        <h2 className="text-2xl font-elegante mb-12">
          Mengapa harus bekerja sama <br /> Bersama Digi Ars Creative?
        </h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <Image
            src="/images/photographer.png"
            alt="Photography Team"
            width={400}
            height={400}
            className="rounded-lg"
          />

          <div className="grid grid-cols-2 gap-8 text-left">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="max-w-xs">
                  <p className="text-4xl font-bold text-teal-400">98%</p>
                  <p className="text-gray-300 text-sm">
                    Klien puas dengan hasil pekerjaan kami dan bersedia melakukan perpanjangan kontrak untuk bisnisnya
                  </p>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: Portfolio */}
      <section className="px-8 md:px-24 py-20 bg-black text-center">
        <h2 className="text-3xl font-elegante mb-10">Portfolio</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <Image
            src="/images/Pemandangan_Gunung_Bromo.jpg"
            alt="Portfolio 1"
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[250px]"
          />
          <Image
            src="/images/Taipei - Taiwan.jpg"
            alt="Portfolio 2"
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[250px]"
          />
          <Image
            src="/images/Pemandangan-Aurora.jpg"
            alt="Portfolio 3"
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[250px]"
          />
        </div>

        <a
          href="#"
          className="bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition py-3 px-8 rounded-lg text-lg font-semibold"
        >
          Portfolio lain
        </a>
      </section>

      {/* SECTION 5: Footer singkat (tanpa navbar/footer utama) */}
      <div className="bg-neutral-900 px-8 md:px-24 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-300 font-sans">
        <div>
          <img src="/images/logo-digiars.png" alt="DigiArs" className="h-10 mb-4" />
          <p className="text-sm">
            Production House terbaik di Batam, siap membantu berbagai brand owner
            meningkatkan dan mengembangkan bisnis di media sosial. Kami memiliki
            layanan unggulan serta tim yang profesional dan berpengalaman di dunia
            Creative Digital.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 font-elegante text-xl">Layanan</h3>
          <ul className="space-y-1 text-sm">
            <li>Fotografi</li>
            <li>Videografi</li>
            <li>Animasi</li>
            <li>Broadcasting</li>
            <li>Game</li>
            <li>Design</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3 font-elegante text-xl">Hubungi Kami</h3>
          <p className="text-sm mb-3">
            Informasi lanjut mengenai jasa, sewa barang, dan paket promo hubungi kami melalui:
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/62812345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-500"
            >
              <FaWhatsapp /> +62 812 3456 78
            </a>
            <a
              href="https://instagram.com/digiars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-400"
            >
              <FaInstagram /> Digiars
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-neutral-800 font-sans">
        © 2025 DigiArs. All rights reserved.
      </div>
    </div>
  );
}
