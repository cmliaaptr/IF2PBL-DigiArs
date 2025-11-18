import FiturCard from "./components/fiturcard";
import Hero from "./components/hero";
import Portfolio from "./components/portfolio";
import WhyChoose from "./components/whychoose";

export default function Home() {
    return (
        <div>
            <Hero />
            <FiturCard />
            <WhyChoose />
            <Portfolio />
        </div>
    );
}