import FiturCard from "./components/fiturcard";
import Hero from "./components/hero";
import WhyChoose from "./components/whychoose";

export default function Home() {
    return (
        <div>
            <Hero></Hero>
            <FiturCard></FiturCard>
            <WhyChoose></WhyChoose>
        </div>
    );
}