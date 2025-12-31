import Link from "next/link";

export default function HeroF() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-130 "
            style={{ backgroundImage: `url('/bg-fotography.png')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Jasa Fotography Profesional
                </h1>
                <p>
                    Merekam setiap moment menjadi cerita <br /> hidup. Dari dokumentasi acara hingga <br /> foto produk, kami hadirkan karya <br /> visual yang penuh dengan makna
                </p>
                <Link href="/Costumer/contact">
        <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition">
          Hubungi Kami
        </button>
        </Link>
            </div>
        </section>
    );
}