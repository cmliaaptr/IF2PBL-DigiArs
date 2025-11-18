"use client";

import Image from "next/image";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function PhotographyPage() {
  return (
    <div className="min-h-screen bg-black text-white font-sans flex flex-col justify-between">
      {/* SECTION 1: Hero */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-20 gap-10">
        <div className="max-w-lg">
          <h1 className="text-5xl font-elegante mb-6">Pengalaman Interaktif dengan Simulator & Game</h1>
          <p className="text-gray-300 mb-8 leading-relaxed">
            Buat event, pameran, atau promosi Anda lebih seru dengan simulasi dan game interaktif yang dirancang khusus untuk audiens Anda.
          </p>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 transition py-3 px-8 rounded-lg text-lg font-semibold inline-block"
          >
            Hubungi Kami
          </a>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
          <Image
            src="/images/Gaming.svg"
            alt="Game"
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
              title: "Teknologi Interaktif Modern",
              desc: "Menggunakan engine populer untuk hasil visual dan gameplay yang optimal",
              icon: "/images/open pelican case.png",
            },
            {
              title: "Desain Game Kreatif",
              desc: "Tim kreatif kami mengembangkan konsep dan dunia permainan yang impersif dan menarik",
              icon: "/images/Idea yellow lamp.png",
            },
            {
              title: "Dukungan Multi Platform",
              desc: "Game dapat dikembangkan dengan menggunakan multi-platform yang kami sediakan",
              icon: "/images/edit image.png",
            },
            {
              title: "Kolaborasi dengan Klien",
              desc: "Proses pengembangan dilakukan bersama klien untuk memastikan setiap elemen sesuai dengan visi dan kebutuhan",
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
            src="/images/mobile-legends.jpg"
            alt="Portfolio 1"
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[250px]"
          />
          <Image
            src="/images/free-fire.jpg"
            alt="Portfolio 2"
            width={400}
            height={250}
            className="rounded-lg object-cover w-full h-[250px]"
          />
          <Image
            src="/images/roblox.jpg"
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
    </div>
  );
}
