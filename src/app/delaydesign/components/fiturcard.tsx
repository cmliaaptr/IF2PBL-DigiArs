const design = [
  {
    title: "Desain yang Relavan dan Menarik",
    desc: "Visual yang dirancang sesuai identitas brand dan tren desain terkini.",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Layanan Design Terintegrasi",
    desc: "Meliputi logo, branding, kemasan, poster, hingga materi digital marketing.",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Tim Desainer Berpengalaman",
    desc: "Dikerjakan oleh professional yang mengerti prinsip esstetika dan komunikasi visual.",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Revisi Fleksibel",
    desc: "Kami memberikan kesempatan revisi agar hasil desain sesuai dengan harapan costumer.",
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
        {design.map((item, i,) => (
          <div
            key={i}
            className={`${item.color} p-6 rounded-xl text-left font-serif text-white`}
          >
            <div className="absolute-left-4 -top-4 flex items-center justify-center h-12 w-12 rounded-full">
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
