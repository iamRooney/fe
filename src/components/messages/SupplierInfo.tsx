import { BadgeCheck, Clock, MapPin, Zap } from "lucide-react";
import { mockConversations, mockSuppliers } from "./mock-data";
import Link from "next/link";

interface SupplierInfoProps {
    conversationId: string | null;
}

export default function SupplierInfo({ conversationId }: SupplierInfoProps) {
    const conversation = mockConversations.find((c) => c.id === conversationId);
    const supplier = conversation ? mockSuppliers[conversation.supplierId] : null;

    return (
        <aside className="hidden w-[320px] flex-col border-l border-slate-200 bg-white lg:flex">
            <div className="border-b border-slate-200 p-5">
                <h2 className="text-lg font-semibold text-slate-900">Supplier Information</h2>
            </div>

            {!supplier ? (
                <div className="flex flex-1 items-center justify-center px-6 text-center">
                    <p className="text-sm text-slate-400">
                        Supplier details will appear here after selecting a conversation.
                    </p>
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto p-5">
                    <div className="flex flex-col items-center text-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0057D9] text-lg font-medium text-white">
                            {supplier.logo}
                        </div>
                        <p className="mt-3 text-sm font-semibold text-slate-900">{supplier.name}</p>
                        {supplier.verified && (
                            <span className="mt-1 inline-flex items-center gap-1 text-xs font-medium text-[#0057D9]">
                                <BadgeCheck className="h-3.5 w-3.5" />
                                Verified Supplier
                            </span>
                        )}
                    </div>

                    <div className="mt-6 space-y-3 text-sm">
                        <div className="flex items-center gap-2 text-slate-600">
                            <MapPin className="h-4 w-4 text-slate-400" />
                            {supplier.location}
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Zap className="h-4 w-4 text-slate-400" />
                            Response rate: <span className="font-medium text-slate-900">{supplier.responseRate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-600">
                            <Clock className="h-4 w-4 text-slate-400" />
                            Response time: <span className="font-medium text-slate-900">{supplier.responseTime}</span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Main Products
                        </p>
                        <div className="mt-2 flex flex-wrap gap-2">
                            {supplier.mainProducts.map((p) => (
                                <span
                                    key={p}
                                    className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700"
                                >
                                    {p}
                                </span>
                            ))}
                        </div>
                    </div>

                    <Link
                        href="/suppliers/1"
                        className="mt-6 block w-full rounded-lg border border-[#F97316] px-4 py-2 text-center text-sm font-medium text-[#F97316] transition-colors hover:bg-orange-50"
                    >
                        View Storefront
                    </Link>
                </div>
            )}
        </aside>
    );
}