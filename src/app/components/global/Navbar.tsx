"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Works", path: "/works" },
    { name: "Layanan", path: "/layananC" },
    { name: "Profile", path: "/profile" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* === LOGO === */}
        <Link href="/" className="flex items-center space-x-3">
          <Image
            src="/images/logo.png"
            alt="Logo DigiArs"
            width={120}
            height={120}
            className="object-contain"
            priority
          />
        </Link>

        {/* === DESKTOP MENU === */}
        <div className="hidden md:flex gap-8">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* === MOBILE BUTTON === */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* === MOBILE DROPDOWN === */}
      {isOpen && (
        <div className="md:hidden bg-black/60 backdrop-blur-md absolute top-full left-0 w-full text-center py-4 space-y-4">
          {navLinks.map((link, i) => (
            <Link
              key={i}
              href={link.path}
              onClick={() => setIsOpen(false)}
              className="block text-white hover:text-gray-300 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
