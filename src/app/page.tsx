import HeroLP from "./components/HeroLP"; 
import AboutLP from "./components/AboutLP";
import LayananLP from "./components/LayananLP";
import WhyLP from "./components/WhyLP";
import PortfolioLP from "./components/PortfolioLP";

export default function Page() {
  return (
    <main className="bg-black text-white">
      <HeroLP />
      <AboutLP />
      <LayananLP />
      <WhyLP />
      <PortfolioLP />
    </main>
  );
}
