import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 border-t mt-16">
      {/* Bagian atas */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Kolom 1: Logo + Deskripsi */}
        <div>
          <div className="mb-4">
            <Image
              src="/assets/logoftr.png"
              alt="DigiArs Logo"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-md">
            Production House terbaik di Batam, siap membantu berbagai brand owner
            meningkatkan dan mengembangkan bisnis di media sosial. Kami memiliki
            berbagai layanan unggulan serta tim yang kompeten, profesional, dan
            berpengalaman di dunia Creative Digital.
          </p>
        </div>

        {/* Kolom 2: Menu Navigasi */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">DigiArs</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/profile" className="hover:text-blue-400 transition-colors">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="hover:text-blue-400 transition-colors">
                  Portfolio
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Layanan</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/layanan/fotografi" className="hover:text-blue-400 transition-colors">
                  Fotografi
                </Link>
              </li>
              <li>
                <Link href="/layanan/videografi" className="hover:text-blue-400 transition-colors">
                  Videografi
                </Link>
              </li>
              <li>
                <Link href="/layanan/animasi" className="hover:text-blue-400 transition-colors">
                  Animasi
                </Link>
              </li>
              <li>
                <Link href="/layanan/broadcasting" className="hover:text-blue-400 transition-colors">
                  Broadcasting
                </Link>
              </li>
              <li>
                <Link href="/layanan/game" className="hover:text-blue-400 transition-colors">
                  Game
                </Link>
              </li>
              <li>
                <Link href="/layanan/design" className="hover:text-blue-400 transition-colors">
                  Design
                </Link>
              </li>
              <li>
                <Link href="/layanan/sound-production" className="hover:text-blue-400 transition-colors">
                  Sound Production
                </Link>
              </li>
              <li>
                <Link href="/layanan/sewa-barang" className="hover:text-blue-400 transition-colors">
                  Sewa Barang
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Kolom 3: Hubungi Kami */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Hubungi Kami</h3>
          <p className="text-sm text-gray-400 mb-4">
            Informasi lanjut mengenai jasa, sewa barang, dan paket, promo hubungi kami melalui:
          </p>
          <div className="space-y-3 text-sm">
            <Link
              href="https://wa.me/62812345678"
              target="_blank"
              className="flex items-center gap-2 hover:text-green-400 transition-colors"
            >
              <Phone size={16} />
              +62 812-3456-78
            </Link>
            <Link
              href="https://instagram.com/digiars"
              target="_blank"
              className="flex items-center gap-2 hover:text-pink-400 transition-colors"
            >
              <Instagram size={16} />
              Digiars
            </Link>
          </div>
        </div>
      </div>

      {/* Bagian bawah */}
      <div className="border-t border-gray-700 bg-[#0b0b0b] py-4">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Image
            src="/assets/logoftr.png"
            alt="Footer Logo"
            width={100}
            height={30}
            className="object-contain"
          />
          <p className="text-xs text-gray-500">© 2025 DigiArs. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
