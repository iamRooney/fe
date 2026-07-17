import FeatureCard from "./FeatureCard";
import { trustSealFeatures } from "@/data/trustseal";

export default function FeatureGrid() {
    return (
        <>
            <div className="text-center">

                <h2 className="text-4xl font-bold text-[#163B82]">
                    What's included in TrustSEAL Buyer?
                </h2>

            </div>

            <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8 mt-16">

                {trustSealFeatures.map((feature) => (
                    <FeatureCard
                        key={feature.title}
                        {...feature}
                    />
                ))}

            </div>
        </>
    );
}