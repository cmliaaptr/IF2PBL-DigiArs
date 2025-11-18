import FiturCard from "./components/fiturcard";
import Hero from "./components/hero";
import Portfolio from "./components/portfolioanimasi";
import WhyChoose from "./components/whychoose";

export default function Home() {
    return (
        <div>
            <Hero></Hero>
            <FiturCard></FiturCard>
            <WhyChoose></WhyChoose>
            <Portfolio></Portfolio>
        </div>
    );
}