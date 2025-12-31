import Link from "next/link";

export default function HeroG() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-145 "
            style={{ backgroundImage: `url('/bggame.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Pengalaman Interaktif dengan Simulator & Game
                </h1>
                <p>
                    Buat event, pameran, atau promosi anda lebih seru  <br /> dengan simulasi dan game interaktif yang dirancang <br /> khusus untuk audiens anda.
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
