import { Cog, Package, Sun, Layers, BadgeCheck } from "lucide-react";
import { RecommendedProduct } from "@/lib/types";

const iconMap = { cog: Cog, package: Package, sun: Sun, layers: Layers };

const badgeStyles = {
    "Hot Deal": "bg-red-500",
    Trending: "bg-green-600",
    New: "bg-[#0057D9]",
};

export default function ProductCard({ product }: { product: RecommendedProduct }) {
    const Icon = iconMap[product.icon as keyof typeof iconMap] ?? Package;

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white transition-shadow hover:shadow-md">
            <div className="relative flex h-36 items-center justify-center bg-slate-50">
                {product.badge && (
                    <span
                        className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white ${badgeStyles[product.badge]}`}
                    >
                        {product.badge}
                    </span>
                )}
                <Icon className="h-12 w-12 text-slate-300" strokeWidth={1.5} />
            </div>

            <div className="p-4">
                <p className="text-sm font-medium text-slate-900">{product.name}</p>
                <p className="mt-0.5 text-xs text-slate-400">{product.supplierName}</p>

                <p className="mt-2 text-base font-bold text-[#F97316]">{product.priceRange}</p>
                <p className="text-xs text-slate-400">Min Order: {product.minOrder}</p>

                {product.verified && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-green-600">
                        <BadgeCheck className="h-3.5 w-3.5" />
                        Verified Supplier
                    </div>
                )}

                <button className="mt-3 w-full rounded-lg border border-[#0057D9] py-2 text-sm font-medium text-[#0057D9] transition-colors hover:bg-blue-50">
                    Get Quotes
                </button>
            </div>
        </div>
    );
}