import { mockRecentlyViewed } from "@/lib/mock";

function timeAgo(iso: string) {
    const hrs = Math.floor((Date.now() - new Date(iso).getTime()) / 3600000);
    if (hrs < 1) return "Just now";
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
}

export default function RecentlyViewed() {
    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Recently Viewed</h1>
            <p className="mt-1 text-sm text-slate-500">Products you've looked at recently.</p>

            <div className="mt-5 rounded-xl border border-slate-200 bg-white">
                {mockRecentlyViewed.length === 0 ? (
                    <div className="px-5 py-10 text-center text-sm text-slate-400">
                        Nothing viewed yet — browse products to see them here.
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100">
                        {mockRecentlyViewed.map((v) => (
                            <div key={v.id} className="flex items-center gap-4 px-5 py-4">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-xs font-medium text-slate-500">
                                    {v.supplierName.slice(0, 2).toUpperCase()}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-900">{v.name}</p>
                                    <p className="text-xs text-slate-400">{v.supplierName}</p>
                                </div>
                                <span className="text-xs text-slate-400">{timeAgo(v.viewedAt)}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}