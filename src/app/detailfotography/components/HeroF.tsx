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
                <button className="bg-green-500 text-black text-xl px-4 py-2 rounded-full font-medium hover:bg-green-400">
                    Hubungi Kami
                </button>
            </div>
        </section>
    );
}