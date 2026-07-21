import ProductSearchBar from "./ProductSearchbar";
import { mockRecentlyViewed, mockRecommendedProducts, mockCategorySuggestions } from "@/lib/mock";

export default function BuyerDiscovery() {
    return (
        <div className="space-y-10">
            <ProductSearchBar />

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Last viewed products</h3>
                <div className="mt-3 grid grid-cols-4 gap-4">
                    {mockRecentlyViewed.map((v) => (
                        <div key={v.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-medium text-slate-500">
                                {v.supplierName.slice(0, 2).toUpperCase()}
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-900">{v.name}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{v.supplierName}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Products you may like</h3>
                <div className="mt-3 grid grid-cols-4 gap-4">
                    {mockRecommendedProducts.map((p) => (
                        <div key={p.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0057D9] text-xs font-medium text-white">
                                {p.image}
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-900">{p.name}</p>
                            <p className="mt-0.5 text-xs text-slate-400">{p.supplierName}</p>
                            <p className="mt-1.5 text-sm font-semibold text-[#0057D9]">{p.priceRange}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
                <h3 className="text-sm font-semibold text-slate-900">Categories you may like</h3>
                <div className="mt-3 grid grid-cols-3 gap-4">
                    {mockCategorySuggestions.map((c) => (
                        <button
                            key={c.id}
                            type="button"
                            className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-4 text-left transition-colors hover:border-blue-300 hover:bg-blue-50"
                        >
                            <span className="text-2xl">{c.icon}</span>
                            <div>
                                <p className="text-sm font-medium text-slate-900">{c.name}</p>
                                <p className="text-xs text-slate-400">{c.productCount.toLocaleString()} products</p>
                            </div>
                        </button>
                    ))}
                </div>
            </section>
        </div>
    );
}