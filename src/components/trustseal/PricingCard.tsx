import { Check } from "lucide-react";

interface PricingCardProps {
    name: string;
    price: string;
    duration?: string;
    description: string;
    button: string;
    highlighted: boolean;
    features: string[];
}

export default function PricingCard({
    name,
    price,
    duration,
    description,
    button,
    highlighted,
    features,
}: PricingCardProps) {
    return (
        <div
            className={`
        relative rounded-2xl border bg-white p-8 transition
        ${highlighted
                    ? "border-[#163B82] shadow-xl scale-105"
                    : "border-gray-200 shadow-sm"
                }
      `}
        >
            {highlighted && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-[#F7941D] px-4 py-1 text-sm font-semibold text-white">
                    Recommended
                </span>
            )}

            <h3 className="text-2xl font-bold text-[#163B82]">{name}</h3>

            <p className="mt-2 text-gray-500">{description}</p>

            <div className="mt-8">
                <span className="text-5xl font-bold">{price}</span>

                {duration && (
                    <span className="text-gray-500 ml-2">
                        {duration}
                    </span>
                )}
            </div>

            <button
                className={`mt-8 w-full rounded-lg py-3 font-semibold transition
        ${highlighted
                        ? "bg-[#F7941D] text-white hover:bg-orange-600"
                        : "border border-[#163B82] text-[#163B82] hover:bg-blue-50"
                    }`}
            >
                {button}
            </button>

            <div className="mt-10 space-y-4">
                {features.map((feature) => (
                    <div
                        key={feature}
                        className="flex items-center gap-3"
                    >
                        <Check
                            size={18}
                            className="text-green-600"
                        />

                        <span className="text-gray-700">
                            {feature}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}