"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import SupplierCard from "./SupplierCard";
import { Supplier } from "./types";
import {
    fetchCompanies,
    fetchSavedCompanies,
    saveCompany,
    unsaveCompany,
    ApiCompany,
} from "@/lib/home";
import { ApiError } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";

function toSupplier(c: ApiCompany): Supplier {
    return {
        id: c.id,
        slug: c.slug,
        company: c.name,
        logo: c.logo_url,
        description: c.description ?? "No description provided yet.",
        verified: c.verified,
    };
}

export default function TrustedSuppliers() {
    const auth = useAuth();
    const isBuyer = auth?.isAuthenticated && auth.role === "buyer";

    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
    const [likedIds, setLikedIds] = useState<Set<number>>(new Set());
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchCompanies()
            .then((data) => {
                if (!cancelled) {
                    setSuppliers(
                        data
                            .filter((c) => c.verified)
                            .slice(0, 6)
                            .map(toSupplier)
                    );
                }
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load suppliers."
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

    // Only buyers can save suppliers, so only fetch their saved state once
    // we know that's who's looking (guests/sellers never make this call).
    useEffect(() => {
        if (!isBuyer) return;

        let cancelled = false;

        fetchSavedCompanies()
            .then((res) => {
                if (!cancelled) {
                    setLikedIds(new Set(res.data.map((c) => c.id)));
                }
            })
            .catch(() => {
                // Non-critical — hearts just stay unfilled if this fails.
            });

        return () => {
            cancelled = true;
        };
    }, [isBuyer]);

    async function toggleLike(companyId: number) {
        const alreadyLiked = likedIds.has(companyId);

        // Optimistic update, rolled back if the request fails.
        setLikedIds((prev) => {
            const next = new Set(prev);
            if (alreadyLiked) next.delete(companyId);
            else next.add(companyId);
            return next;
        });

        try {
            if (alreadyLiked) {
                await unsaveCompany(companyId);
            } else {
                await saveCompany(companyId);
            }
        } catch {
            setLikedIds((prev) => {
                const next = new Set(prev);
                if (alreadyLiked) next.add(companyId);
                else next.delete(companyId);
                return next;
            });
        }
    }

    return (
        <section className="bg-white py-20">
            <Container>

                <div className="mb-10 flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Trusted Global Industrial Suppliers
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-[#1F2937]">
                            Trusted Verified Suppliers
                        </h2>
                    </div>

                    {/* <button className="rounded-full border px-5 py-2 hover:bg-gray-100 text-gray-500">
                        View All →
                    </button> */}

                </div>

                {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                )}

                {!loading && !error && suppliers.length === 0 && (
                    <p className="text-sm text-gray-400">No verified suppliers yet.</p>
                )}

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {suppliers.map((supplier) => (
                        <SupplierCard
                            key={supplier.id}
                            supplier={supplier}
                            showLike={Boolean(isBuyer)}
                            liked={likedIds.has(supplier.id)}
                            onToggleLike={() => toggleLike(supplier.id)}
                        />
                    ))}

                </div>
            </Container>
        </section>
    );
}