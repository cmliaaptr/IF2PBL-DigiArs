"use client";

import { FaWhatsapp, FaInstagram } from "react-icons/fa";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      {/* Bagian utama */}
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16">
        {/* Teks kiri */}
        <div className="max-w-lg">
          <h1 className="text-5xl font-elegante mb-4 leading-tight">
            Hubungi Kami Langsung
          </h1>
          <p className="text-gray-300 mb-8 font-sans">
            Kami siap membantu ide kreatifmu dengan percakapan cepat!
          </p>

          <div className="flex flex-col gap-4 w-60">
            <a
              href="https://wa.me/62812345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 transition py-3 rounded-lg text-lg font-elegante"
            >
              <FaWhatsapp size={24} /> Whatsapp
            </a>
            <a
              href="https://instagram.com/digiars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90 transition py-3 rounded-lg text-lg font-elegante"
            >
              <FaInstagram size={24} /> Instagram
            </a>
          </div>
        </div>

        {/* Gambar ilustrasi kanan */}
        <div className="mt-10 md:mt-0">
          <img
            src="/images/contact-illustration.png"
            alt="Contact Illustration"
            className="w-80 md:w-[400px]"
          />
        </div>
      </div>
    </div>
  );
}
