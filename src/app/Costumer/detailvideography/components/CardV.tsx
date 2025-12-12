const animasi = [
  {
    title: "Peralatan Lengkap",
    desc: "Kami memiliki studio dengan peralatan dan properti yang lengkap untuk memaksimalkan kebutuhan video kamu",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Konsep Kreatif dan Unik",
    desc: "Kami membantu menciptakan ide dan konsep video yang menarik, relevan dan sesuai target audiens",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Tim Profesional",
    desc: "Untuk hasil video yang maksimal, kami sediakan video editor agar video lebih menarik dan mudah dipublikasikan",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Proses Produksi Efisien",
    desc: "Workflow terstruktur memastikan hasil akhir berkualitas tinggi dengan waktu pengerjaan yang optimal",
    color: "bg-teal-600",
    icon: "/fotografer.png",
  },
];

export default function CardV() {
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
