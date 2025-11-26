export default function WhyF () {
  const animasi = [
    {
      persentase: "98%",
      desc: "Klien puas dengan hasil pekerjaan kami dan bersedia melakukan perpanjangan kontrak untuk bisnisnya.",
    },
    {
      persentase: "95%",
      desc: "Tim kami cepat tanggap dan responsif dalam menangani revisi serta komunikasi proyek.",
    },
    {
      persentase: "97%",
      desc: "Kualitas video dan animasi memenuhi standar profesional dengan sentuhan visual yang memikat.",
    },
    {
      persentase: "99%",
      desc: "Proses kerja transparan, deadline tepat waktu, dan hasil sesuai ekspektasi klien.",
    },
  ];

  return (
    <section className="py-12 text-left px-30">
      <h2 className="text-2xl mb-10 font-bold font-serif">
        Mengapa harus bekerja sama <br/>Bersama Digi Ars Creative?
      </h2>
    <section className="py-8 text-left flex items-start">
      <img src="/mengapa.png" 
      alt="Garis Hijau" 
      width={600}
      height={600}
      className="object-contain"/>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        {animasi.map((item, i) => (
          <div
            key={i}
            className="bg-neutral-900 hover:bg-neutral-800 transition-all duration-300 p-6 rounded-xl ring-1 ring-white/10"
          >
            <h3 className="text-3xl font-bold text-emerald-400 mb-2">
              {item.persentase}
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
    </section>
  );
}
