const animasi = [
  {
    title: "Teknologi Siaran Modern",
    desc: "Menggunakan sistem broadcasting digital terkini untuk menjamin kualitas tayang yang stabil dan jernih.",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Tim Teknis yang Handal",
    desc: "Operator dan teknisi berpengalaman siap memastikan kelancaran setiap siaran langsung.",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Multi-Platform Streaming",
    desc: "Layanan kami mendukung tayangan di berbagai platform seperti Siaran Televisi, Youtube, dan media sosial lainnya.",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Kualitas Audio Visual Premium",
    desc: "Standar produksi broadcast kami menjamin kualitas suara dan gambar tetap profesional di setiap kondisi.",
    color: "bg-teal-600",
    icon: "/fotografer.png",
  },
];

export default function FiturCard() {
  return (
    <section className="text-center py-16">
      <h2 className="text-2xl mb-10 font-semibold">
        Apa saja yang bisa didapatkan?
      </h2> 
      <div className="grid md:grid-cols-2 gap-8 px-6 w-170 mx-auto">
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
