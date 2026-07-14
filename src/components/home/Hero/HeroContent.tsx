import Button from "@/components/ui/Button/Button";
import HeroStats from "./HeroStats";

export default function HeroContent() {
    return (
        <div className="relative z-10 max-w-2xl">



            <h1 className="mt-8 max-w-[620px] text-6xl font-extrabold leading-[1.08] tracking-tight text-white">

                Your Global Trade Partner,

                <span className="block">
                    Beyond Boundaries.
                </span>

            </h1>

            <p className="mt-8 max-w-[520px] text-base leading-7 text-blue-100">

                Discover verified manufacturers, suppliers and exporters
                from around the globe. Source products with confidence
                and grow your business through Exbhex.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

                <Button>
                    Explore Marketplace
                </Button>

                <Button variant="secondary">
                    Learn More
                </Button>

            </div>

            <HeroStats />

        </div>
    );
}