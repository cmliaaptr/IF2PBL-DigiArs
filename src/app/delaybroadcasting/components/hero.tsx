export default function Hero() {
    return (
        <section className="px-12 py-16 bg-neutral-950 text-white bg-cover bg-center h-145 "
            style={{ backgroundImage: `url('/broadcasting.jpg')` }}>

            <div className="max-w-md space-y-4">
                <h1 className="text-6xl font-bold font-serif">
                    Siarkan Kreativitas Anda ke Dunia
                </h1>
                <p>
                    Dari live streaming event, konser, hingga webinar - <br /> kami hadirkan siaran profesional dengan kualitas tinggi dan tampilan visual yang memukau.
                </p>
                <button className="bg-green-500 text-black text-xl px-4 py-2 rounded-full font-medium hover:bg-green-400">
                    Hubungi Kami
                </button>
            </div>
        </section>
    );
}
