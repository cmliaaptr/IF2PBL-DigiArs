import CardAudio from "./components/CardAudio";
import HeroAudio from "./components/HeroAudio";
import WhyChoose from "./components/whychoose";

export default function Home() {
    return (
        <div>
            <HeroAudio></HeroAudio>
            <CardAudio></CardAudio>
            <WhyChoose></WhyChoose>
        </div>
    );
}