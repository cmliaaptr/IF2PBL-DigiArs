"use client";

import { useEffect, useState } from "react";
import HeroL from "./components/HeroL";
import CardL from "./components/CardL";

interface LayananCard {
  id: number;
  judul: string;
  foto: string;
}

export default function LayananPage() {
  const [services, setServices] = useState<LayananCard[]>([]);

  useEffect(() => {
    fetch("http://localhost:8001/api/layananc")
      .then((res) => res.json())
      .then((data) => setServices(data))
      .catch(console.error);
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
              desc="Layanan profesional DigiArs"
              icon={`http://localhost:8001/storage/layananc/${service.foto}`}
              href={`/Costumer/layanan/${service.id}`}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

      