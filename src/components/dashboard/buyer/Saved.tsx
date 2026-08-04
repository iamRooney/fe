"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Store, Bookmark, Building2 } from "lucide-react";
import { fetchSavedCompanies, unsaveCompany, ApiCompany } from "@/lib/home";
import { ApiError } from "@/lib/api";

export default function SavedSuppliers() {
    const [companies, setCompanies] = useState<ApiCompany[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const [removingId, setRemovingId] = useState<number | null>(null);

    useEffect(() => {
        let cancelled = false;

        fetchSavedCompanies()
            .then((res) => {
                if (!cancelled) setCompanies(res.data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load your saved suppliers."
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    async function remove(companyId: number) {
        setRemovingId(companyId);
        try {
            await unsaveCompany(companyId);
            setCompanies((prev) => prev.filter((c) => c.id !== companyId));
        } catch {
            // Leave it in the list — the button just stops spinning below.
        } finally {
            setRemovingId(null);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Liked Suppliers</h1>
            <p className="mt-1 text-sm text-slate-500">
                Suppliers you&apos;ve liked from the homepage.
            </p>

            {loading && (
                <p className="mt-5 text-sm text-slate-400">Loading...</p>
            )}

            {error && (
                <p className="mt-5 text-sm font-medium text-red-500">{error}</p>
            )}

            {!loading && !error && companies.length === 0 && (
                <div className="mt-10 flex flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Bookmark className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">
                        Nothing saved yet. Tap the heart on a supplier from the homepage.
                    </p>
                </div>
            )}

            {!loading && !error && companies.length > 0 && (
                <div className="mt-5 grid grid-cols-3 gap-4">
                    {companies.map((company) => (
                        <div key={company.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex items-start justify-between">
                                <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-[#0057D9] text-white">
                                    {company.logo_url ? (
                                        <Image
                                            src={company.logo_url}
                                            alt={company.name}
                                            fill
                                            unoptimized
                                            className="object-contain bg-white p-1"
                                        />
                                    ) : (
                                        <Store className="h-5 w-5" />
                                    )}
                                </div>
                                <button
                                    onClick={() => remove(company.id)}
                                    disabled={removingId === company.id}
                                    className="text-xs font-medium text-slate-400 hover:text-red-500 disabled:opacity-50"
                                >
                                    {removingId === company.id ? "Removing..." : "Remove"}
                                </button>
                            </div>
                            <p className="mt-3 truncate text-sm font-medium text-slate-900">
                                {company.name}
                            </p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs capitalize text-slate-400">
                                <Building2 className="h-3 w-3" />
                                Supplier
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}