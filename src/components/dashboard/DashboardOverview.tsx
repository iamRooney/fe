import { Eye, Package, MessageSquare, TrendingUp, FileText, Bookmark, History, Send } from "lucide-react";
import { UserRole } from "@/lib/types";
import { mockProducts, mockRFQs, mockSavedItems, mockRecentlyViewed } from "@/lib/mock";
import BuyerDiscovery from "./buyer/BuyerDiscovery";

interface DashboardOverviewProps {
    role: UserRole;
}

function StatCard({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Icon className="h-4.5 w-4.5 text-[#0057D9]" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    );
}

function SellerOverview() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={Eye} label="Profile views" value="1,204" />
                <StatCard icon={MessageSquare} label="New enquiries" value="18" />
                <StatCard icon={Package} label="Active products" value={String(mockProducts.filter((p) => p.status === "active").length)} />
                <StatCard icon={TrendingUp} label="Response rate" value="96%" />
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

function BuyerOverview() {
    return (
        <>
            <div className="grid grid-cols-4 gap-4">
                <StatCard icon={FileText} label="Active enquiries" value={String(mockRFQs.filter((r) => r.status === "open").length)} />
                <StatCard icon={Send} label="RFQs posted" value={String(mockRFQs.length)} />
                <StatCard icon={Bookmark} label="Saved items" value={String(mockSavedItems.length)} />
                <StatCard icon={History} label="Recently viewed" value={String(mockRecentlyViewed.length)} />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-4">
                        <h3 className="text-sm font-semibold text-slate-900">My RFQs</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {mockRFQs.map((r) => (
                            <div key={r.id} className="px-5 py-3">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium text-slate-900">{r.title}</p>
                                    <span
                                        className={`rounded-full px-2.5 py-1 text-xs font-medium ${r.status === "open" ? "bg-green-50 text-green-700" : "bg-slate-100 text-slate-500"
                                            }`}
                                    >
                                        {r.status}
                                    </span>
                                </div>
                                <p className="mt-1 text-xs text-slate-400">
                                    {r.quantity} · {r.quotesReceived} quotes received
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white">
                    <div className="border-b border-slate-200 px-5 py-4">
                        <h3 className="text-sm font-semibold text-slate-900">Recently viewed</h3>
                    </div>
                    <div className="divide-y divide-slate-100">
                        {mockRecentlyViewed.map((v) => (
                            <div key={v.id} className="px-5 py-3">
                                <p className="text-sm font-medium text-slate-900">{v.name}</p>
                                <p className="text-xs text-slate-400">{v.supplierName}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

export default function DashboardOverview({ role }: DashboardOverviewProps) {
    return (
        <div className="p-6">
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