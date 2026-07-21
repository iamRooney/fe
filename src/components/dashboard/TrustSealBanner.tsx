import Link from "next/link";
import { Check } from "lucide-react";
import { UserRole } from "@/lib/types";

const buyerPerks = [
    "₹10L Payment Protection",
    "Unlimited RFQs",
    "AI-Powered Sourcing Tools",
    "TrustSEAL Buyer Badge",
    "Dedicated Procurement Manager",
    "Shipment Tracking",
    "Priority 24×7 Support",
];

const sellerPerks = [
    "Verified Seller Badge",
    "Priority in Search Results",
    "Higher Enquiry Volume",
    "AI-Powered Lead Insights",
    "Dedicated Account Manager",
    "Featured Storefront Placement",
    "Priority 24×7 Support",
];

const copy = {
    buyer: {
        heading: "Buy Smarter. Buy Protected.",
        subheading: "Source Smarter as an Exbhex TrustSeal Buyer",
    },
    seller: {
        heading: "Sell Smarter. Get Verified.",
        subheading: "Grow Faster as an Exbhex TrustSeal Seller",
    },
};

export default function TrustSealBanner({ role }: { role: UserRole }) {
    const perks = role === "seller" ? sellerPerks : buyerPerks;
    const { heading, subheading } = copy[role];

    return (
        <div className="overflow-hidden rounded-2xl bg-[#0B3D3A] p-8">
            <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
                <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white">{heading}</h3>
                    <p className="mt-1 text-sm text-teal-300">{subheading}</p>

                    <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-2.5 sm:grid-cols-4">
                        {perks.map((perk) => (
                            <div key={perk} className="flex items-start gap-2">
                                <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-400" />
                                <span className="text-xs text-teal-50">{perk}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                    <div>
                        <p className="text-xs text-teal-300">Starting at</p>
                        <p className="text-xl font-bold text-white">
                            ₹999<span className="text-sm font-normal text-teal-300">/month</span>
                        </p>
                    </div>
                    <Link
                        href="/trustseal"
                        className="whitespace-nowrap rounded-lg bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-400"
                    >
                        Upgrade to Premium
                    </Link>
                </div>
            </div>
        </div>
    );
}