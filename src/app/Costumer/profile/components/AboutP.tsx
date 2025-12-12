import Image from "next/image";

export default function AboutP() {
  return (
    <section className="flex flex-col md:flex-row justify-center items-center bg-[#1a1a1a] py-16 gap-8 px-6">
      <div className="max-w-sm">
        <h2 className="text-3xl font-bold mb-3">Visi</h2>
        <p>Menjadi jembatan antara masyarakat, pendidikan, dan industri</p>
      </div>

      <div className="flex justify-center">
        <Image
          src="/visi.jpg"
          alt="Visi Misi"
          width={400}
          height={400}
          className="rounded-lg object-cover"
        />
      </div>

      <div className="max-w-sm">
        <h2 className="text-3xl font-bold mb-3">Misi</h2>
        <p>
          Menghadirkan solusi kreatif yang inovatif dan relevan dengan perkembangan zaman
        </p>
      </div>
    </section>
  );
}
