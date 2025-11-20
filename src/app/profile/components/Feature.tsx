"use client";

import { useState } from "react";
import Image from "next/image";

export default function Feature() {
  // ini deklarasi state hover
  const [hover, setHover] = useState<number | null>(null);

  const features = [
    { title: "Creativity", img: "/lampu.png" },
    { title: "Innovation", img: "/roket.png" },
    { title: "Collaboration", img: "/hand.png" },
  ];

  return (
    <section className="flex flex-wrap justify-center gap-16 bg-[#141414] py-16 text-center">
      {features.map((item, i) => (
        <div
          key={i}
          className="flex flex-col items-center transition-transform duration-300"
          onMouseEnter={() => setHover(i)}
          onMouseLeave={() => setHover(null)}
          style={{
            transform: hover === i ? "scale(1.1)" : "scale(1)",
          }}
        >
          <Image
            src={item.img}
            alt={item.title}
            width={100}
            height={100}
            className={`mb-4 ${
              hover === i ? "brightness-125" : "brightness-100"
            }`}
          />
          <h3 className="text-xl font-semibold">{item.title}</h3>
        </div>
      ))}
    </section>
  );
}
