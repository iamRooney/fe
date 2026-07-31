"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Boxes, BadgeCheck, MapPin } from "lucide-react";

import { fetchSearch, SearchResults as SearchResultsData } from "@/lib/search";
import { ApiError, resolveStorageUrl } from "@/lib/api";

function ResultThumb({
    src,
    alt,
    accent = "navy",
}: {
    src?: string | null;
    alt: string;
    accent?: "navy" | "orange";
}) {
    const wash =
        accent === "navy"
            ? "bg-gradient-to-br from-[#0D3B7A]/12 to-[#0D3B7A]/4"
            : "bg-gradient-to-br from-[#F7941E]/18 to-[#F7941E]/6";

    const iconColor = accent === "navy" ? "text-[#0D3B7A]" : "text-[#F7941E]";

    return (
        <div
            className={`relative flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl ${wash}`}
        >
            {src ? (
                <Image
                    src={src}
                    alt={alt}
                    fill
                    unoptimized
                    sizes="64px"
                    className="object-contain p-1"
                />
            ) : (
                <Boxes size={28} className={iconColor} />
            )}
        </div>
    );
}

function SectionHeading({ title, count }: { title: string; count: number }) {
    return (
        <div className="mb-4 flex items-baseline gap-2">
            <h2 className="text-xl font-bold text-[#1F2937]">{title}</h2>
            <span className="text-sm text-gray-400">({count})</span>
        </div>
    );
}

export default function SearchResults({
    query,
    location,
}: {
    query: string;
    location?: string;
}) {
    const [data, setData] = useState<SearchResultsData | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;
        setLoading(true);
        setError("");

        fetchSearch({ q: query, location })
            .then((result) => {
                if (!cancelled) setData(result);
            })
            .catch((err) => {
                if (!cancelled) {
                    setError(
                        err instanceof ApiError
                            ? err.message
                            : "Couldn't load search results."
                    );
                }
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, [query, location]);

    if (loading) {
        return <p className="text-sm text-gray-400">Searching...</p>;
    }

    if (error) {
        return <p className="text-sm font-medium text-red-500">{error}</p>;
    }

    const totalResults =
        (data?.companies.length ?? 0) +
        (data?.products.length ?? 0) +
        (data?.services.length ?? 0);

    if (!data || totalResults === 0) {
        return (
            <p className="text-sm text-gray-400">
                No results found
                {query ? ` for "${query}"` : ""}
                {location ? ` near ${location}` : ""}. Try a different search
                term{location ? " or area" : ""}.
            </p>
        );
    }

    return (
        <div className="space-y-12">

            {data.companies.length > 0 && (
                <section>
                    <SectionHeading title="Companies" count={data.companies.length} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.companies.map((company) => (
                            <Link
                                key={company.id}
                                href={`/suppliers/${company.slug}`}
                                className="group flex items-center gap-4 rounded-2xl border border-[#E7EAF0] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D3B7A]/30 hover:shadow-[0_12px_28px_rgba(13,59,122,0.10)]"
                            >
                                <ResultThumb
                                    src={company.logo_url}
                                    alt={company.name}
                                    accent="navy"
                                />

                                <div className="min-w-0">
                                    <div className="flex items-center gap-1.5">
                                        <h3 className="truncate text-[15px] font-semibold text-[#1F2937]">
                                            {company.name}
                                        </h3>
                                        {company.verified && (
                                            <BadgeCheck
                                                size={16}
                                                className="shrink-0 text-[#0D3B7A]"
                                            />
                                        )}
                                    </div>

                                    {company.description && (
                                        <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                                            {company.description}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {data.products.length > 0 && (
                <section>
                    <SectionHeading title="Products" count={data.products.length} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        {data.products.map((product) => (
                            <Link
                                key={product.id}
                                href={`/products/${product.slug}`}
                                className="group flex flex-col gap-3 rounded-2xl border border-[#E7EAF0] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D3B7A]/30 hover:shadow-[0_12px_28px_rgba(13,59,122,0.10)]"
                            >
                                <ResultThumb
                                    src={product.image_url}
                                    alt={product.name}
                                    accent="orange"
                                />

                                <div className="min-w-0">
                                    <h3 className="truncate text-[15px] font-semibold text-[#1F2937]">
                                        {product.name}
                                    </h3>

                                    <p className="mt-1 text-sm text-gray-500">
                                        {product.company?.name ?? "Unknown Supplier"}
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-[#0D3B7A]">
                                        {product.price
                                            ? `$${Number(product.price).toLocaleString()}`
                                            : "Contact for price"}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {data.services.length > 0 && (
                <section>
                    <SectionHeading title="Services" count={data.services.length} />

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {data.services.map((service) => (
                            <Link
                                key={service.id}
                                href={`/services/${service.slug}`}
                                className="group flex items-center gap-4 rounded-2xl border border-[#E7EAF0] bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-[#0D3B7A]/30 hover:shadow-[0_12px_28px_rgba(13,59,122,0.10)]"
                            >
                                <ResultThumb
                                    src={resolveStorageUrl(service.image)}
                                    alt={service.name}
                                    accent="navy"
                                />

                                <div className="min-w-0">
                                    <h3 className="truncate text-[15px] font-semibold text-[#1F2937]">
                                        {service.name}
                                    </h3>

                                    <p className="mt-1 line-clamp-1 text-sm text-gray-500">
                                        {service.company?.name ?? "Unknown Provider"}
                                    </p>

                                    {service.service_area && (
                                        <p className="mt-1 flex items-center gap-1 text-xs text-gray-400">
                                            <MapPin size={12} />
                                            {service.service_area}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

        </div>
    );
}