import { Eye, Package, MessageSquare, TrendingUp } from "lucide-react";
import { UserRole } from "@/lib/types";
import { mockProducts } from "@/lib/mock";
import StatCard from "./Statcard";
import BuyerDiscovery from "./buyer/BuyerDiscovery";
import TrustSealBanner from "./TrustSealBanner";

interface DashboardOverviewProps {
    role: UserRole;
}

function SellerOverview() {
    return (
        <>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                <StatCard icon={Eye} label="Profile views" value="1,204" />
                <StatCard icon={MessageSquare} label="New enquiries" value="18" />
                <StatCard
                    icon={Package}
                    label="Active products"
                    value={String(mockProducts.filter((p) => p.status === "active").length)}
                />
                <StatCard icon={TrendingUp} label="Response rate" value="96%" />
            </div>

            <div className="mt-6">
                <TrustSealBanner role="seller" />
            </div>

            <div className="mt-6 rounded-xl border border-slate-200 bg-white">
                <div className="border-b border-slate-200 px-5 py-4">
                    <h3 className="text-sm font-semibold text-slate-900">Recent products</h3>
                </div>
                <div className="divide-y divide-slate-100">
                    {mockProducts.map((p) => (
                        <div key={p.id} className="flex items-center gap-4 px-5 py-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0057D9] text-xs font-medium text-white">
                                {p.image}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-slate-900">{p.name}</p>
                                <p className="text-xs text-slate-400">{p.priceRange} · MOQ {p.moq}</p>
                            </div>
                            <span
                                className={`rounded-full px-2.5 py-1 text-xs font-medium ${p.status === "active" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                                    }`}
                            >
                                {p.status}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default function DashboardOverview({ role }: DashboardOverviewProps) {
    return (
        <div className="p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-slate-900">Welcome back</h1>
            <p className="mt-1 text-sm text-slate-500">
                {role === "seller"
                    ? "Here's how your storefront is performing."
                    : "Here's what's sourcing near you."}
            </p>

            <div className="mt-6">
                {role === "seller" ? <SellerOverview /> : <BuyerDiscovery />}
            </div>
        </div>
    );
}