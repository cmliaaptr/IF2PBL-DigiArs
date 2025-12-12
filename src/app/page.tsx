import HeroLP from "./Costumer/components/HeroLP"; 
import AboutLP from "./Costumer/components/AboutLP";
import LayananLP from "./Costumer/components/LayananLP";
import WhyLP from "./Costumer/components/WhyLP";
import PortfolioLP from "./Costumer/components/PortfolioLP";
import Navbar from "./Costumer/components/global/Navbar";
import Footer from "./Costumer/components/global/Footer";

export default function Page() {
  return (
    <main className="bg-black text-white">
      <Navbar />
      <HeroLP />
      <AboutLP />
      <LayananLP />
      <WhyLP />
      <PortfolioLP />
      <Footer />
    </main>
  );
}
