import Image from "next/image";
import Link from "next/link";
import { Instagram, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#111] text-gray-300 border-t mt-16"> 
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
