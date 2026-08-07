"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw } from "lucide-react";

import FilterSection from "@/components/category/sidebar/FilterSection";

interface Props {
    query: string;
    location: string;
    minPrice: string;
    maxPrice: string;
}

const PRICE_PRESETS: { label: string; min: string; max: string }[] = [
    { label: "Below ₹250", min: "", max: "250" },
    { label: "₹251 - ₹500", min: "251", max: "500" },
    { label: "₹501 - ₹1,500", min: "501", max: "1500" },
    { label: "Above ₹1,501", min: "1501", max: "" },
];

export default function SearchFilters({
    query,
    location,
    minPrice,
    maxPrice,
}: Props) {
    const router = useRouter();

    const [min, setMin] = useState(minPrice);
    const [max, setMax] = useState(maxPrice);

    // Keep local state in sync if the URL changes elsewhere (e.g. back button).
    useEffect(() => {
        setMin(minPrice);
        setMax(maxPrice);
    }, [minPrice, maxPrice]);

    const navigate = (overrides?: { minPrice?: string; maxPrice?: string }) => {
        const params = new URLSearchParams();
        if (query.trim()) params.set("q", query.trim());
        if (location.trim()) params.set("location", location.trim());

        const nextMin = overrides?.minPrice ?? min;
        const nextMax = overrides?.maxPrice ?? max;

        if (nextMin) params.set("min_price", nextMin);
        if (nextMax) params.set("max_price", nextMax);

        const qs = params.toString();
        router.push(qs ? `/search?${qs}` : "/search");
    };

    const applyPreset = (preset: { min: string; max: string }) => {
        setMin(preset.min);
        setMax(preset.max);
        navigate({ minPrice: preset.min, maxPrice: preset.max });
    };

    const applyCustomRange = () => {
        navigate({ minPrice: min, maxPrice: max });
    };

    const hasActiveFilters = Boolean(min || max);

    const clearFilters = () => {
        setMin("");
        setMax("");
        navigate({ minPrice: "", maxPrice: "" });
    };

    return (
        <aside className="w-full shrink-0 space-y-4 lg:w-[280px]">
            <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-800">Filters</h2>

                <button
                    onClick={clearFilters}
                    disabled={!hasActiveFilters}
                    className="flex items-center gap-1 rounded-lg border border-gray-200 px-2.5 py-1 text-xs font-medium text-gray-600 transition hover:border-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-gray-200 disabled:hover:bg-transparent"
                >
                    <RotateCcw size={12} />
                    Reset
                </button>
            </div>

            <FilterSection title="Price">
                <div className="space-y-3">
                    {PRICE_PRESETS.map((preset) => {
                        const active = min === preset.min && max === preset.max;

                        return (
                            <label
                                key={preset.label}
                                className="flex items-center gap-2 text-sm text-gray-600"
                            >
                                <input
                                    type="radio"
                                    name="price"
                                    checked={active}
                                    onChange={() => applyPreset(preset)}
                                />
                                {preset.label}
                            </label>
                        );
                    })}
                </div>

                <div className="mt-4 flex items-center gap-1.5 border-t pt-4">
                    <span className="text-sm text-gray-400">₹</span>

                    <input
                        type="number"
                        min={0}
                        placeholder="min"
                        value={min}
                        onChange={(e) => setMin(e.target.value)}
                        className="w-full min-w-0 rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#0D3B7A]"
                    />

                    <span className="text-gray-400">-</span>

                    <input
                        type="number"
                        min={0}
                        placeholder="max"
                        value={max}
                        onChange={(e) => setMax(e.target.value)}
                        className="w-full min-w-0 rounded-lg border border-gray-200 px-2 py-1.5 text-sm text-gray-700 outline-none focus:border-[#0D3B7A]"
                    />

                    <button
                        onClick={applyCustomRange}
                        className="shrink-0 rounded-lg bg-gray-100 px-3 py-1.5 text-sm font-medium text-gray-600 transition hover:bg-gray-200"
                    >
                        Go
                    </button>
                </div>
            </FilterSection>
        </aside>
    );
}