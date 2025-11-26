import CardV from "./components/CardV";
import HeroV from "./components/HeroV";
import PortoVg from "./components/PortoVg";
import WhyV from "./components/WhyV";

export default function Home() {
    return (
        <div>
            <HeroV></HeroV>
            <CardV></CardV>
            <WhyV></WhyV>
            <PortoVg></PortoVg>
        </div>
    );
}