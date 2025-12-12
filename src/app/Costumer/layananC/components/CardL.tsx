"use client";

import { useRouter } from "next/navigation";

interface ServiceCardProps {
  title: string;
  desc: string;
  icon: string;
  href: string;
}

export default function CardL({ title, desc, icon, href }: ServiceCardProps) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      className="bg-[#00B9B9] text-black p-6 rounded-2xl w-[220px] h-[230px] flex flex-col items-center justify-between cursor-pointer transition-transform transform hover:scale-105 hover:shadow-xl"
    >
      <img src={icon} alt={title} className="w-14 h-14 mb-3" />
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-center text-black/80">{desc}</p>
      <button className="bg-white text-black font-medium px-4 py-2 rounded-lg mt-3 transition hover:bg-gray-200">
        Lihat Detail
      </button>
    </div>
  );
}
