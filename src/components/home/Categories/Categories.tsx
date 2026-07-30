"use client";

import { useEffect, useState } from "react";
import Container from "@/components/ui/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import { fetchCategories, ApiCategory } from "@/lib/home";
import { ApiError } from "@/lib/api";

export default function Categories() {
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        fetchCategories()
            .then((data) => {
                if (!cancelled) setCategories(data);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load categories."
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
        <section className="bg-white py-14">

            <Container>

                <div className="flex items-start justify-between">

                    <div>

                        <p className="mt-2 text-gray-500">
                            Sourcing made easy across diverse industrial sectors.
                        </p>

                        <p className="text-3xl font-bold text-gray-500">
                            Explore Popular Categories
                        </p>



                    </div>

                    {/* <button className="rounded-full border px-5 py-2 hover:bg-gray-100 text-gray-500">
                        View All →
                    </button> */}

                </div>

                {error && (
                    <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
                )}

                {!loading && !error && categories.length === 0 && (
                    <p className="mt-4 text-sm text-gray-400">No categories yet.</p>
                )}

                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.name}
                            iconUrl={category.icon_url}
                        />
                    ))}
                </div>

            </Container>

        </section>
    );
}