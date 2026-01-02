"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Home, Wrench, LogOut, Settings } from "lucide-react";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

export default function LayoutWithSidebar({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ GUARD
  useEffect(() => {
    const isAuthPage = pathname === "/Admin/login";
    if (isAuthPage) return;

    const token = localStorage.getItem("token");
    if (!token) router.replace("/Admin/login");
  }, [pathname, router]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(
    pathname.startsWith("/Admin/layanan")
  );

  const [layananMenu, setLayananMenu] = useState<
    { id: number; judul: string }[]
  >([]);

  const fetchMenu = useCallback(async () => {
    try {
      const token = localStorage.getItem("token");

      // kalau belum login, jangan fetch (biar ga spam 401)
      if (!token) {
        setLayananMenu([]);
        return;
      }

      const res = await fetch(`${BACKEND}/api/layananc`, {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // kalau token invalid / expired
      if (res.status === 401) {
        setLayananMenu([]);
        localStorage.removeItem("token");
        router.replace("/Admin/login");
        return;
      }

      const data = await res.json().catch(() => []);
      setLayananMenu(Array.isArray(data) ? data : []);
    } catch (e) {
      console.error(e);
      setLayananMenu([]);
    }
  }, [router]);

  // ✅ pertama kali load
  useEffect(() => {
    fetchMenu();
  }, [fetchMenu]);

  // ✅ setiap pindah halaman layanan, dropdown kebuka + menu refresh
  useEffect(() => {
    if (pathname.startsWith("/Admin/layanan")) {
      setIsDropdownOpen(true);
      fetchMenu();
    }
  }, [pathname, fetchMenu]);

  const handleLogout = () => {
    if (confirm("Apakah anda yakin ingin keluar?")) {
      localStorage.removeItem("token");
      router.replace("/Admin/login");
    }
  };

  const handleLayananClick = () => {
    router.push("/Admin/layanan");
    setIsDropdownOpen(true);
  };

  const toggleDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDropdownOpen((v) => !v);
  };

  return (
    <div className="flex min-h-screen font-poppins">
      <aside className="w-64 bg-teal-700 text-white flex flex-col">
        <div className="p-6 border-b border-teal-600 flex justify-center">
          <img
            src="/logo-digiars.png"
            alt="DigiArs"
            className="h-20 brightness-125 drop-shadow-lg"
          />
        </div>

        <nav className="flex flex-col mt-4">
          <Link
            href="/Admin/dashboard"
            className={`px-5 py-3 flex items-center gap-2 transition-colors ${
              pathname === "/Admin/dashboard"
                ? "bg-orange-500"
                : "hover:bg-orange-400"
            }`}
          >
            <Home size={18} />
            <span>Dashboard</span>
          </Link>

          <div>
            <button
              onClick={handleLayananClick}
              className={`w-full px-5 py-3 flex justify-between items-center transition-colors ${
                pathname.startsWith("/Admin/layanan")
                  ? "bg-orange-500 text-white"
                  : "hover:bg-orange-400"
              }`}
              type="button"
            >
              <span className="flex items-center gap-2">
                <Wrench size={18} />
                <span>Layanan</span>
              </span>

              <span
                onClick={toggleDropdown}
                className={`text-sm transform transition-transform duration-200 cursor-pointer ${
                  isDropdownOpen ? "rotate-180" : "rotate-0"
                }`}
              >
                ▼
              </span>
            </button>

            {isDropdownOpen && (
              <div className="flex flex-col bg-teal-800 text-sm animate-fade-in">
                {layananMenu.map((item) => {
                  const href = `/Admin/layanan/${item.id}`;

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className={`px-8 py-2 flex items-center gap-2 transition ${
                        pathname === href
                          ? "bg-teal-600 font-semibold"
                          : "hover:bg-teal-600"
                      }`}
                    >
                      <Wrench size={14} />
                      {item.judul}
                    </Link>
                  );
                })}

                {layananMenu.length === 0 && (
                  <div className="px-8 py-2 text-white/70">Belum ada layanan</div>
                )}
              </div>
            )}
          </div>

          <Link
            href="/Admin/settings"
            className={`px-5 py-3 flex items-center gap-2 transition-colors ${
              pathname === "/Admin/settings"
                ? "bg-orange-500"
                : "hover:bg-orange-400"
            }`}
          >
            <Settings size={18} />
            <span>Settings</span>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 bg-white p-8 relative">
        <div className="absolute top-10 right-6">
          <button
            onClick={handleLogout}
            title="Logout"
            className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow-md transition"
          >
            <LogOut size={20} />
          </button>
        </div>

        {children}
      </main>
    </div>
  );
}
