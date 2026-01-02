"use client";

import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp, FaInstagram } from "react-icons/fa";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

type SettingPayload = {
  wa?: string;
  link_ig?: string;
};

function normalizeWa(raw: string) {
  // buang spasi, tanda +, dan karakter aneh
  let x = (raw || "").trim().replace(/[^\d]/g, "");
  // kalau dia mulai 0, ubah ke 62
  if (x.startsWith("0")) x = "62" + x.slice(1);
  return x;
}

export default function ContactPage() {
  const [wa, setWa] = useState("");
  const [ig, setIg] = useState("");
  const [loading, setLoading] = useState(true);

  const waNumber = useMemo(() => normalizeWa(wa), [wa]);
  const waHref = waNumber ? `https://wa.me/${waNumber}` : "";
  const igHref = ig?.trim() || "";

  const fetchSetting = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${BACKEND}/api/setting/public`, { cache: "no-store" });

      const payload: SettingPayload = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error((payload as any)?.message || "Gagal mengambil setting");

      setWa(payload?.wa || "");
      setIg(payload?.link_ig || "");
    } catch (e) {
      setWa("");
      setIg("");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetting();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between">
      <div className="flex flex-col md:flex-row items-center justify-between px-8 md:px-24 py-16">
        <div className="max-w-lg">
          <h1 className="text-6xl font-bold mb-4 leading-tight">
            Hubungi Kami Langsung
          </h1>
          <p className="text-gray-300 mb-8 font-sans">
            Kami siap membantu ide kreatifmu dengan percakapan cepat!
          </p>

          <div className="flex flex-col gap-4 w-60">
            <a
              href={waHref || "#"}
              onClick={(e) => {
                if (!waHref) e.preventDefault();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 transition py-3 rounded-lg text-lg font-elegante ${
                waHref
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-green-600/40 cursor-not-allowed"
              }`}
              aria-disabled={!waHref}
            >
              <FaWhatsapp size={24} />
              {loading ? "Memuat..." : "Whatsapp"}
            </a>

            <a
              href={igHref || "#"}
              onClick={(e) => {
                if (!igHref) e.preventDefault();
              }}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 transition py-3 rounded-lg text-lg font-elegante ${
                igHref
                  ? "bg-gradient-to-r from-purple-600 to-pink-500 hover:opacity-90"
                  : "bg-white/10 cursor-not-allowed"
              }`}
              aria-disabled={!igHref}
            >
              <FaInstagram size={24} />
              {loading ? "Memuat..." : "Instagram"}
            </a>
          </div>

          {!loading && (!waHref || !igHref) && (
            <p className="text-xs text-gray-400 mt-3">
              Kontak belum di-setting oleh admin.
            </p>
          )}
        </div>

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
