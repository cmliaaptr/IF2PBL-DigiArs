import HeroP from "./components/HeroP";
import AboutP from "./components/AboutP";
import IconSection from "./components/IconSection";
import GambarSection from "./components/GambarSection";

export default function Home() {
  return (
    <div className="text-white bg-[#0f0f0f]">
      <HeroP />
      <AboutP />
      <IconSection />
      <GambarSection />
    </div>
  );
}
