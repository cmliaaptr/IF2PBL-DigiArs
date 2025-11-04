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

      {/* Footer bawah sederhana */}
      <div className="bg-neutral-900 px-8 md:px-24 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-gray-300">
        <div>
          <img src="/images/logo-digiars.png" alt="DigiArs" className="h-10 mb-4" />
          <p className="text-sm">
            Production House terbaik di Batam, siap membantu berbagai brand owner
            meningkatkan dan mengembangkan bisnis di media sosial. Kami memiliki
            layanan unggulan serta tim yang profesional dan berpengalaman di dunia
            Creative Digital.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Layanan</h3>
          <ul className="space-y-1 text-sm">
            <li>Fotografi</li>
            <li>Videografi</li>
            <li>Animasi</li>
            <li>Broadcasting</li>
            <li>Game</li>
            <li>Design</li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Hubungi Kami</h3>
          <p className="text-sm mb-3">
            Informasi lanjut mengenai jasa, sewa barang, dan paket promo hubungi kami melalui:
          </p>
          <div className="flex flex-col gap-2">
            <a
              href="https://wa.me/62812345678"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-green-500"
            >
              <FaWhatsapp /> +62 812 3456 78
            </a>
            <a
              href="https://instagram.com/digiars"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-pink-400"
            >
              <FaInstagram /> Digiars
            </a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-gray-500 py-4 border-t border-neutral-800">
        © 2025 DigiArs. All rights reserved.
      </div>
    </div>
  );
}
