import PricingCard from "./PricingCard";
// import PricingToggle from "./PricingToggle";
import { pricingPlans } from "@/data/trustseal";

export default function Pricing() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-4xl font-bold text-[#163B82]">
                    Simple, Transparent Pricing
                </h2>

                <p className="mt-4 text-gray-600">
                    Choose the plan that suits your business.
                </p>
            </div>

            {/* <PricingToggle /> */}

            <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-2 text-gray-500">
                {pricingPlans.map((plan) => (
                    <PricingCard
                        key={plan.id}
                        {...plan}
                    />
                ))}
            </div>
        </>
    );
}