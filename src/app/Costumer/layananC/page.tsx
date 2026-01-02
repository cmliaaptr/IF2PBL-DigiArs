"use client";

import { useEffect, useState } from "react";
import HeroL from "./components/HeroL";
import CardL from "./components/CardL";

interface LayananCard {
  id: number;
  judul: string;
  foto: string;
  deskripsi: string;
}

const BACKEND =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ||
  "http://localhost:8001";

function pickArray(payload: any): LayananCard[] {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.layananc)) return payload.layananc;
  return [];
}

export default function LayananPage() {
  const [services, setServices] = useState<LayananCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${BACKEND}/api/layananc/public`, {
          cache: "no-store",
        });

        const payload = await res.json().catch(() => null);

        if (!res.ok) {
          console.error("Fetch layananC public gagal:", payload);
          setServices([]);
          return;
        }

        const arr = pickArray(payload);
        setServices(arr);
      } catch (err) {
        console.error("Fetch error:", err);
        setServices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="bg-[#0D0D0D] text-white min-h-screen">
      <HeroL />

      <section className="py-16 px-6 md:px-20">
        <h2 className="text-center text-4xl font-semibold text-orange-500 mb-10">
          Layanan
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 justify-items-center">
          {services.map((service) => (
            <CardL
              key={service.id}
              title={service.judul}
              desc={service.deskripsi}
              icon={`${BACKEND}/storage/layananc/${service.foto}`}
              href={`/Costumer/layananC/${service.id}`}
            />
          ))}

          {!loading && services.length === 0 && (
            <div className="text-white/70 text-center col-span-full">
              Belum ada layanan
            </div>
          )}

          {loading && (
            <div className="text-white/70 text-center col-span-full">
              Memuat layanan...
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
