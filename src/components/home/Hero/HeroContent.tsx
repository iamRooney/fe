import Button from "@/components/ui/Button/Button";
import HeroStats from "./HeroStats";
import Link from "next/link";

export default function HeroContent() {
    return (
        <div className="relative z-10 max-w-2xl">



            <h1 className="mt-8 max-w-[620px] text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl lg:leading-[1.08]">

                Your Global Trade Partner,

                <span className="block">
                    Beyond Boundaries.
                </span>

            </h1>

            <p className="mt-6 max-w-[520px] text-base leading-7 text-blue-100 sm:mt-8">

                Discover verified manufacturers, suppliers and exporters
                from around the globe. Source products with confidence
                and grow your business through Exbhex.

            </p>

            <div className="mt-8 flex flex-wrap gap-4 sm:mt-10 sm:gap-5">

                <Link href="/categories">
                    <Button variant="primary">
                        Explore Marketplace
                    </Button>
                </Link>

                <Link href="/aboutus">
                    <Button variant="secondary">
                        Learn More
                    </Button>
                </Link>

            </div>

            <HeroStats />

        </div>
    );
}