const animasi = [
  {
    title: "Studio Rekaman Professional",
    desc: "Dilengkapi peralatan audio berkualitas tinggi untuk hasil dengan suara jernih dan dinamis.",
    color: "bg-teal-600",
    icon: "/kotak.png",
  },
  {
    title: "Sound Designer Ahli",
    desc: "Tim kami terdiri dari profesional dibidang musik dan sound design.",
    color: "bg-teal-600",
    icon: "/lampu.png",
  },
  {
    title: "Beragam Layanan Audio",
    desc: "Termasuk jingle voice, voice over, sound effect, dan mixing masteries.",
    color: "bg-teal-600",
    icon: "/galeri.png",
  },
  {
    title: "Kualitas Audio Premium",
    desc: "Hasil akhir audio memiliki kedalaman dan berkarakter.",
    color: "bg-teal-600",
    icon: "/fotografer.png",
  },
];

export default function CardAudio() {
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
