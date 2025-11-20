import HeroL from "./components/HeroL";
import CardL from "./components/CardL";

const services = [
  { id: 1, title: "Videography", desc: "Abadikan momen bersama DigiArs", icon: "/images/icon-video.png", href: "/layanan/videography" },
  { id: 2, title: "Fotography", desc: "Foto yang menarik hasil yang lebih baik", icon: "/images/icon-camera.png", href: "/layanan/fotography" },
  { id: 3, title: "Animasi", desc: "Hasilkan karakter animasi yang bagus", icon: "/images/icon-animation.png", href: "/layanan/animasi" },
  { id: 4, title: "Broadcast", desc: "Buat broadcast terbaikmu dengan kami", icon: "/images/icon-broadcast.png", href: "/layanan/broadcast" },
  { id: 5, title: "Game", desc: "Maksimalkan gamemu bersama DigiArs", icon: "/images/icon-game.png", href: "/layanan/game" },
  { id: 6, title: "Design", desc: "Rancang designmu bersama kami", icon: "/images/icon-design.png", href: "/layanan/design" },
  { id: 7, title: "Sewa Barang", desc: "Menyediakan barang multimedia", icon: "/images/icon-tools.png", href: "/layanan/sewa" },
  { id: 8, title: "Sound Produksi", desc: "Sound produksi terbaik", icon: "/images/icon-sound.png", href: "/layanan/sound" },
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
