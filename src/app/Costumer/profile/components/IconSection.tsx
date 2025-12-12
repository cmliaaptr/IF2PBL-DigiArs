export default function IconSection() {
  const items = [
    { icon: "/lampu.png", label: "Creativity" },
    { icon: "/roket.png", label: "Innovation" },
    { icon: "/hand.png", label: "Collaboration" },
  ];

  return (
    <section className="w-full bg-[#1a1a1a] text-white py-14">
      <div className="max-w-4xl mx-auto flex justify-between items-center text-center">

        {items.map((item, i) => (
          <div key={i} className="group cursor-pointer transition">
            <img
              src={item.icon}
              alt={item.label}
              className="mx-auto w-16 mb-3 group-hover:scale-110 transition-transform"
            />
            <p className="font-semibold text-lg">{item.label}</p>
          </div>
        ))}

      </div>
    </section>
  );
}