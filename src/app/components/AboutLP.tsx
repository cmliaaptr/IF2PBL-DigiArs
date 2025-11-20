export default function AboutLP() {
  return (
    <section className="bg-[#141414] text-white py-24 px-6 md:px-16">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 items-center">

        {/* Kolom Kiri */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-semibold text-yellow-500">
            Siapa DigiArs?
          </h2>
          <p className="text-gray-300 leading-relaxed">
            Kami adalah Production House yang dikelola oleh Politeknik Negeri Batam
            yang berisikan mahasiswa Jurusan Teknik Multimedia Rekayasa dan Animasi.
          </p>
        </div>

        {/* Kolom Tengah (Gambar) */}
        <div className="flex justify-center">
          <div className="overflow-hidden rounded-2xl shadow-lg w-[280px] h-[360px] md:w-[340px] md:h-[420px]">
            <img
              src="/fotoabout.jpg"
              alt="Tentang DigiArs"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Kolom Kanan */}
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              DigiArs ngapain aja?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Kami melakukan jasa Video, Foto, Animasi, dan Sewa barang Multimedia.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-yellow-500 mb-2">
              Kenapa harus DigiArs?
            </h3>
            <p className="text-gray-300 leading-relaxed">
              Kreatifitas tanpa batas, layanan personal, dan hasil yang nyata.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
