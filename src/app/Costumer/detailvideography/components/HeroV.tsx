import Link from "next/link";

export default function HeroV() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-130 "
            style={{ backgroundImage: `url('/bgvideography.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Jasa Videography Profesional
                </h1>
                <p>
                    Merekam setiap moment menjadi cerita <br /> hidup. Dari dokumentasi hingga <br /> video promosi, kami hadirkan karya <br /> visual yang penuh dengan makna
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