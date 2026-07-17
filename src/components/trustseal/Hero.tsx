import Container from "@/components/ui/Container";
import TrustSealCard from "./TrustSealCard";

export default function Hero() {
    return (
        <section className="py-20">
            <Container>
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Left */}

                    <div>

                        <h1 className="text-5xl font-bold leading-tight text-[#163B82]">
                            Stop chasing
                            <br />
                            suppliers.
                            <br />

                            <span className="text-[#F7941D]">
                                Start sourcing
                                <br />
                                smarter.
                            </span>

                        </h1>

                        <p className="mt-8 text-gray-600 text-lg leading-8 max-w-lg">
                            AI-powered sourcing, ₹10L payment protection,
                            and a personal purchase manager
                            everything to buy with confidence.
                        </p>

                        <button
                            className="
              mt-10
              bg-[#F7941D]
              hover:bg-orange-600
              text-white
              px-8
              py-4
              rounded-lg
              font-semibold
              shadow-lg
              transition
            "
                        >
                            Apply for TrustSEAL
                        </button>

                    </div>

                    {/* Right */}

                    <TrustSealCard />

                </div>
            </Container>
        </section>
    );
}