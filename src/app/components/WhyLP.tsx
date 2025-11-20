"use client";

import { Globe, Puzzle, Layers } from "lucide-react";

export default function WhyLP() {
  return (
    <section className="bg-[#0f0f0f] py-20 text-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Judul */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold">
            Kenapa milih <span className="text-yellow-500">Digi Ars?</span>
          </h2>
          <p className="text-gray-400 mt-3 text-sm md:text-base">
            Karena DigiArs memiliki keunikan dan perbedaan sendiri jika
            dibandingkan dengan Production House lainnya. Berikut beberapa
            alasan kenapa harus memilih DigiArs.
          </p>
        </div>

        {/* Card utama */}
        <div
          className="
          relative bg-[#1a1a1a] rounded-3xl shadow-lg border border-[#2a2a2a]
          px-8 md:px-12 py-12 md:py-16 text-center overflow-hidden
          before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-0
          after:content-[''] after:absolute after:bottom-0 after:right-0 after:w-0 after:h-0
          "
          style={{
            clipPath:
              "polygon(0 10%, 5% 0, 95% 0, 100% 10%, 100% 90%, 95% 100%, 5% 100%, 0 90%)",
          }}
        >
          {/* Isi konten */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10 mt-10">
            {/* 1️⃣ Platform Terpadu */}
            <div className="flex flex-col items-center px-4">
              <div className="bg-[#2a2a2a] p-4 rounded-full mb-4">
                <Layers size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Platform Terpadu Karya Digital
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                DigiArs menggabungkan berbagai bidang kreatif seperti videografi,
                fotografi, game, dan animasi dalam satu sistem informasi yang
                menampilkan hasil karya secara profesional dan menarik.
              </p>
            </div>

            {/* 2️⃣ Layanan Proyek Terintegrasi */}
            <div className="flex flex-col items-center px-4">
              <div className="bg-[#2a2a2a] p-4 rounded-full mb-4">
                <Puzzle size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Menyediakan Layanan Sewa Proyek Terintegrasi
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Selain menampilkan portfolio, DigiArs memudahkan klien untuk
                langsung menyewa jasa kreator melalui sistem pemesanan proyek
                yang otomatis dan efisien.
              </p>
            </div>

            {/* 3️⃣ Ekosistem Kreatif */}
            <div className="flex flex-col items-center px-4">
              <div className="bg-[#2a2a2a] p-4 rounded-full mb-4">
                <Globe size={32} className="text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Mendukung Ekosistem Industri Kreatif Digital
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                DigiArs menjadi wadah kolaborasi dan promosi bagi mahasiswa,
                freelancer, maupun profesional untuk memperluas jaringan,
                meningkatkan visibilitas karya, dan membuka peluang kerja di
                bidang kreatif digital.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
