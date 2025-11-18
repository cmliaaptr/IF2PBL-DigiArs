const animasi = [
  {
    title: "Gaya Animasi Kreatif",
    desc: "Menyediakan berbagai gaya mulai dari 2D, 3D, motion graphic atau explainer sesuai kebutuhan proyek.",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Tim Produksi Terencana",
    desc: "Tahapan produksi jelas dari storyboard hingga final rendering menjaga efisiensi dan kualitas.",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Visual Storytelling yang Kuat",
    desc: "Setiap animasi dirancang untuk menyampaikan pesan secara menarik dan mudah untuk dipahami.",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Tim Animator Ahli",
    desc: "Animator kami menggabungkan kreativitas dan teknik untuk hasil animasi yang halus dan ekspresif.",
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
