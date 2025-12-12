export default function Hero() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-130 "
            style={{ backgroundImage: `url('/iya.png')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Hidupkan Cerita dengan Animasi
                </h1>
                <p>
                    Dari motion graphic, explainer video, hingga animasi karakter - <br /> kami membuat ide Anda jadi nayata dengan visual yang memikat.
                </p>
                <button className="bg-green-500 text-black text-xl px-4 py-2 rounded-full font-medium hover:bg-green-400">
                    Hubungi Kami
                </button>
            </div>
        </section>
    );
}