"use client";

import { useEffect, useState } from "react";
import SupplierCard from "./SupplierCard";
import { Supplier } from "./types";
import { fetchCompanies, ApiCompany } from "@/lib/home";
import { ApiError } from "@/lib/api";

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
    const [suppliers, setSuppliers] = useState<Supplier[]>([]);
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

    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-10 flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Trusted Global Industrial Suppliers
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-500">
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
                        />
                    ))}

                </div>
            </div>
        </section>
    );
}