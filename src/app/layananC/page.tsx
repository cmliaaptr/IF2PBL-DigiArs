import HeroL from "./components/HeroL";
import CardL from "./components/CardL";

const services = [
  { id: 1, title: "Videography", desc: "Abadikan momen bersama DigiArs", icon: "/images/videography.png", href: "/detailvideography" },
  { id: 2, title: "Fotography", desc: "Foto yang menarik hasil yang lebih baik", icon: "/images/fotographer.png", href: "/detailfotography" },
  { id: 3, title: "Animasi", desc: "Hasilkan karakter animasi yang bagus", icon: "/images/animasi.png", href: "/delayanimasi" },
  { id: 4, title: "Broadcast", desc: "Buat broadcast terbaikmu dengan kami", icon: "/images/broadcasting.png", href: "/delaybroadcasting" },
  { id: 5, title: "Game", desc: "Maksimalkan gamemu bersama DigiArs", icon: "/images/game.png", href: "/detailgame" },
  { id: 6, title: "Design", desc: "Rancang designmu bersama kami", icon: "/images/design.png", href: "/delaydesign" },
  { id: 7, title: "Sewa Barang", desc: "Menyediakan barang multimedia", icon: "/images/sewabarang.png", href: "/detailsewa" },
  { id: 8, title: "Sound Produksi", desc: "Sound produksi terbaik", icon: "/images/sound.png", href: "/detailsound" },
];

export default function LayananPage() {
  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <HeroL />
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-center text-4xl font-semibold text-orange-500 mb-10">Layanan</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {services.map((service) => (
            <CardL key={service.id} {...service} />
          ))}
        </div>
      </section>
    </div>
  );
}
