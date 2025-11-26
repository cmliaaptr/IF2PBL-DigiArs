export default function HeroAudio() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-145 "
            style={{ backgroundImage: `url('/broadcasting.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Menciptakan Suara yang Membawa Pengalaman Baru
                </h1>
                <p>
                    Kami menghadirkan layanan produk audio lengkap - <br /> mulai dari rekaman, mixing, mastering <br /> dengan standar studio professional
                </p>
                <button className="bg-green-500 text-black text-xl px-4 py-2 rounded-full font-medium hover:bg-green-400">
                    Hubungi Kami
                </button>
            </div>
        </section>
    );
}
