import Link from "next/link";

export default function Hero() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-130 "
            style={{ backgroundImage: `url('/bgdesign.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Jasa Creative Design
                </h1>
                <p>
                    Bangun identitas visual brand Anda dengan desain kreatif, estetik, dan professional.
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