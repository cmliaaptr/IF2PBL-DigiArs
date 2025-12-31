import Link from "next/link";

export default function HeroAudio() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-145 "
            style={{ backgroundImage: `url('/bgproduction.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Menciptakan Suara yang Membawa Pengalaman Baru
                </h1>
                <p>
                    Kami menghadirkan layanan produk audio lengkap - <br /> mulai dari rekaman, mixing, mastering <br /> dengan standar studio professional
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
