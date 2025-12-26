"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Home,
  Wrench,
  Camera,
  Video,
  Brush,
  Film,
  Gamepad2,
  Radio,
  Headphones,
  Package,
  LogOut,
  Settings,
} from "lucide-react";

export default function LayoutWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // Dropdown terbuka jika berada di halaman layanan
  const [isDropdownOpen, setIsDropdownOpen] = useState(
    pathname.startsWith("/layanan")
  );

  // === Daftar dropdown menu untuk Layanan ===
 const [layananMenu, setLayananMenu] = useState<
  { id: number; judul: string }[]
>([]);

useEffect(() => {
  fetch("http://localhost:8001/api/layananc")
    .then((res) => res.json())
    .then((data) => setLayananMenu(data))
    .catch(console.error);
}, []);


  // === Fungsi Logout ===
  const handleLogout = () => {
    if (confirm("Apakah anda yakin ingin keluar?")) {
      window.location.href = "/Admin/login";
    }
  };

  // === Klik tombol utama "Layanan" ===
  const handleLayananClick = () => {
    router.push("/Admin/layanan"); // langsung ke halaman layanan utama
    setIsDropdownOpen(true); // tetap buka dropdown
  };

  // === Klik panah (toggle dropdown saja, tanpa navigasi) ===
  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation(); // biar gak trigger handleLayananClick
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex min-h-screen font-poppins">
      {/* === SIDEBAR === */}
      <aside className="w-64 bg-teal-700 text-white flex flex-col">
        {/* LOGO */}
        <div className="p-6 border-b border-teal-600 flex justify-center">
          <img
            src="/logo-digiars.png"
            alt="DigiArs"
            className="h-20 brightness-125 drop-shadow-lg"
          />
        </div>

        {/* === NAV MENU === */}
        <nav className="flex flex-col mt-4">
          {/* DASHBOARD */}
          <Link
            href="/Admin/dashboard"
            className={`px-5 py-3 flex items-center gap-2 transition-colors ${
              pathname === "/dashboard" ? "bg-orange-500" : "hover:bg-orange-400"
            }`}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          {/* === LAYANAN + DROPDOWN === */}
          <div>
            {/* Tombol utama layanan (klik untuk ke /layanan) */}
            <button
              onClick={handleLayananClick}
              className={`w-full px-5 py-3 flex justify-between items-center transition-colors ${
                pathname.startsWith("/layanan")
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-400"
              }`}
            >
              <span className="flex items-center gap-2">
                <Wrench size={18} />
                <span>Layanan</span>
              </span>

              {/* Panah dropdown (hanya buka/tutup menu) */}
              <span
                onClick={toggleDropdown}
                className={`text-sm transform transition-transform duration-200 cursor-pointer ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {/* DROPDOWN MENU */}
            {isDropdownOpen && (
              <div className="flex flex-col bg-teal-800 text-sm animate-fade-in">
                {layananMenu.map((item) => (
                <Link
                  key={item.id}
                  href={`/Admin/layanan/${item.judul
                    .toLowerCase()
                    .replace(/\s+/g, "")}`}
                  className={`px-8 py-2 flex items-center gap-2 transition ${
                    pathname === `/Admin/layanan/${item.judul.toLowerCase().replace(/\s+/g, "")}`
                      ? "bg-teal-600 font-semibold"
                      : "hover:bg-teal-600"
                  }`}
                >
                  <Wrench size={14} />
                  {item.judul}
                </Link>
                ))}
              </div>
            )}
          </div>
          {/* DASHBOARD */}
          <Link
            href="/Admin/settings"
            className={`px-5 py-3 flex items-center gap-2 transition-colors ${
              pathname === "/dashboard" ? "bg-orange-500" : "hover:bg-orange-400"
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      {/* === MAIN CONTENT === */}
      <main className="flex-1 bg-white p-8 relative">
        {/* 🔴 ICON LOGOUT di pojok kanan atas */}
        <div className="absolute top-10 right-6">
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
          >
            <LogOut size={20} />
          </button>
        </div>

        {/* === KONTEN HALAMAN === */}
        {children}
      </main>
    </div>
  );
}
