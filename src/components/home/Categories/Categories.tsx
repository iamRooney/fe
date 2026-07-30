"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
        <section className="bg-white py-16">

            <Container>

                <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">

                    <div>

                        <p className="mt-4 text-3xl font-bold text-[#1F2937]">
                            Explore Popular Categories
                        </p>

                        <p className="mt-2 text-gray-500">
                            Sourcing made easy across diverse industrial sectors.
                        </p>

                    </div>



                </div>

                {error && (
                    <p className="mt-4 text-sm font-medium text-red-500">{error}</p>
                )}

                {!loading && !error && categories.length === 0 && (
                    <p className="mt-4 text-sm text-gray-400">No categories yet.</p>
                )}

                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">

                    {categories.map((category, index) => (
                        <CategoryCard
                            key={category.id}
                            title={category.name}
                            iconUrl={category.icon_url}
                            accent={index % 2 === 0 ? "navy" : "orange"}
                        />
                    ))}


                    {/* <span
                                className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                border
                border-[#0D3B7A]/25
                text-[#0D3B7A]
                transition
                group-hover:bg-[#0D3B7A]
                group-hover:text-white
                "
                            >
                                <ArrowRight size={18} />
                            </span> */}

                    {/* <span className="text-sm font-semibold text-[#0D3B7A]">
                                View all categories
                            </span> */}
                    {/* </Link>
                    )} */}

                </div>

            </Container>

        </section>
    );
}