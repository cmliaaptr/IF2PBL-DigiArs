const animasi = [
  {
    title: "Peralatan Profesional",
    desc: "Peralatan modern menghasilkan gambar tajam dan berkarakter",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Retouching & Editing Berkualitas",
    desc: "Proses pasca-produksi dilakukan secara detail untuk hasil akhir yang sempurna",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Konsep Pemotretan Kreatif",
    desc: "Kami membantu merancang konsep visual yang sesuai dengan brand dan pesan yang ingin disampaikan.",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Beragam Jenis Pemotretan",
    desc: "Layanan mencakup foto produk, potrait hingga landscape sesuai kebutuhan klien.",
    color: "bg-teal-600",
    icon: "/fotografer.png",
  },
];

export default function CardF() {
  return (
    <section className="text-center py-16">
      <h2 className="text-2xl mb-10 font-semibold">
        Apa saja yang bisa didapatkan?
      </h2>
      <div className="grid md:grid-cols-2 gap-8 px-6 w-180 mx-auto">
        {animasi.map((item, i,) => (
          <div
            key={i}
            className={`${item.color} p-6 rounded-xl text-left font-serif text-white`}
          >
            <div className="flex items-center space-x-2 mb-4">
              <img src={item.icon} alt={item.title} className="h-12 w-12" />
            </div>
            <h3 className="font-bold text-2xl mb-2">{item.title}</h3>
            <p className="text-sm text-neutral-200">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
