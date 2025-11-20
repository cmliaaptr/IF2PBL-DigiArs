import HeroP from "./components/HeroP";
import AboutP from "./components/AboutP";
import Feature from "./components/Feature";

export default function Home() {
  return (
    <div className="text-white bg-[#0f0f0f]">
      <HeroP />
      <AboutP />
      <Feature />
    </div>
  );
}
