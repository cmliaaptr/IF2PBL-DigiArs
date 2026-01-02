"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

const FILE_DETAIL = `${BACKEND}/storage/detail_layanan/`;
const FILE_LAYANANC = `${BACKEND}/storage/layananc/`;

type Layananc = {
  id: number;
  judul: string;
  foto?: string | null;
  deskripsi?: string | null;
};

type HeroData = {
  judul: string;
  deskripsi: string;
  foto?: string | null;
};

type BenefitRow = {
  pilihan: "Card 1" | "Card 2" | "Card 3" | "Card 4";
  judul: string;
  deskripsi: string;
  icon?: string | null;
};

/** Modal untuk deskripsi panjang */
function DescModal({
  open,
  title,
  desc,
  onClose,
}: {
  open: boolean;
  title: string;
  desc: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#121212] shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h3 className="text-white font-semibold text-base md:text-lg">
            {title || "Detail"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white text-sm px-3 py-1 rounded-lg bg-white/10 hover:bg-white/15 transition"
          >
            Tutup
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto px-5 py-4">
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
            {desc || "-"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DetailLayanancUserPage() {
  const params = useParams();
  const layanan1Id = String((params as any)?.id || "");

  const [service, setService] = useState<Layananc | null>(null);
  const [hero, setHero] = useState<HeroData | null>(null);
  const [benefits, setBenefits] = useState<BenefitRow[]>([]);
  const [loading, setLoading] = useState(true);

  /** state untuk modal "Lainnya" */
  const [selectedDesc, setSelectedDesc] = useState<{
    judul: string;
    deskripsi: string;
  } | null>(null);

  const fetchAll = async () => {
    try {
      setLoading(true);

      const serviceReq = fetch(`${BACKEND}/api/layananc/${layanan1Id}`, {
        cache: "no-store",
      });

      const heroReq = fetch(`${BACKEND}/api/detail-layanan/${layanan1Id}/hero`, {
        cache: "no-store",
      });

      const benReq = fetch(
        `${BACKEND}/api/detail-layanan/${layanan1Id}/benefits`,
        { cache: "no-store" }
      );

      const [serviceRes, heroRes, benRes] = await Promise.all([
        serviceReq,
        heroReq,
        benReq,
      ]);

      const serviceJson = await serviceRes.json().catch(() => null);
      const heroJson = await heroRes.json().catch(() => null);
      const benJson = await benRes.json().catch(() => []);

      setService(serviceRes.ok ? serviceJson : null);
      setHero(heroRes.ok ? heroJson : null);
      setBenefits(benRes.ok && Array.isArray(benJson) ? benJson : []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!layanan1Id) return;
    fetchAll();
  }, [layanan1Id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white p-10">
        Loading...
      </div>
    );
  }

  const heroBg = hero?.foto
    ? `${FILE_DETAIL}${hero.foto}`
    : service?.foto
    ? `${FILE_LAYANANC}${service.foto}`
    : "/fallback-hero.png";

  const heroTitle = hero?.judul || service?.judul || "Judul belum diisi";
  const heroDesc =
    hero?.deskripsi || service?.deskripsi || "Deskripsi belum diisi";

  const LONG_DESC_THRESHOLD = 120;

  return (
    <div className="bg-neutral-950 text-white min-h-screen">
      {/* HERO */}
      <section
        className="px-12 py-16 bg-cover bg-center h-[520px]"
        style={{ backgroundImage: `url('${heroBg}')` }}
      >
        <div className="max-w-xl space-y-4">
          <h1 className="text-5xl font-bold font-serif">{heroTitle}</h1>
          <p className="text-neutral-200">{heroDesc}</p>

          <Link href="/Costumer/contact">
            <button className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-medium transition">
              Hubungi Kami
            </button>
          </Link>
        </div>
      </section>

      {/* BENEFIT */}
      <section className="text-center py-16">
        <h2 className="text-2xl mb-10 font-semibold">
          Apa saja yang bisa didapatkan?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 px-6 max-w-5xl mx-auto place-items-center">
          {benefits.map((b, i) => {
            const descTrim = (b.deskripsi || "").trim();
            const isLong = descTrim.length > LONG_DESC_THRESHOLD;

            return (
              <div
                key={i}
                className="bg-teal-600 rounded-xl text-white w-full max-w-[420px] min-h-[260px]
                flex flex-col items-center justify-center text-center p-6"
              >
                {/* ICON */}
                <div className="mb-4 flex items-center justify-center">
                  <img
                    src={b.icon ? FILE_DETAIL + b.icon : "/default-icon.png"}
                    alt={b.judul}
                    className="h-14 w-14 object-contain"
                  />
                </div>

                {/* TITLE */}
                <h3 className="font-bold text-xl mb-2">{b.judul}</h3>

                {/* DESC (dipotong) */}
                <p className="text-sm text-neutral-200 leading-relaxed line-clamp-3">
                  {descTrim || "-"}
                </p>

                {/* tombol "Lainnya" */}
                {isLong && (
                  <button
                    className="mt-3 text-xs text-yellow-200 hover:text-white underline underline-offset-4"
                    onClick={() =>
                      setSelectedDesc({ judul: b.judul, deskripsi: b.deskripsi })
                    }
                  >
                    Lainnya
                  </button>
                )}
              </div>
            );
          })}

          {benefits.length === 0 && (
            <div className="text-white/70 col-span-full">
              Benefit belum diisi oleh admin.
            </div>
          )}
        </div>
      </section>

      {/* Modal deskripsi panjang */}
      <DescModal
        open={!!selectedDesc}
        title={selectedDesc?.judul || ""}
        desc={selectedDesc?.deskripsi || ""}
        onClose={() => setSelectedDesc(null)}
      />
    </div>
  );
}
