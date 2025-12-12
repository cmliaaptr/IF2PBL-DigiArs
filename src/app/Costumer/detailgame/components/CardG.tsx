const animasi = [
  {
    title: "Teknologi Interaktif Modern",
    desc: "Menggunakan engine populer untuk hasil visual dan gameplay yang optimal",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Desain Game Kreatif",
    desc: "Tim kreatif kami mengembangkan konsep dan dunia permainan yang impersif dan menarik",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Dukungan Multi-Platform",
    desc: "Game dapat dikembangkan dengan menggunakan multi-platform yang kami sediakan",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Kolaborasi dengan Klien",
    desc: "Proses pengembangan dilakukan bersama klien untuk memastikan setiap elemen sesuai dengan visi dan kebutuhan",
    color: "bg-teal-600",
    icon: "/fotografer.png",
  },
];

export default function CardG() {
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
