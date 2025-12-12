import HeroW from "./components/HeroW";
import PortfolioGallery from "./components/PortfolioCardW";

export default function WorksPage() {
  return (
    <main className="bg-black text-white min-h-screen">
      <HeroW />
      <PortfolioGallery />
    </main>
  );
}