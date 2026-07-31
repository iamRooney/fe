"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, X, ChevronDown } from "lucide-react";

import { fetchCities, ApiCity } from "@/lib/search";
import { ApiError } from "@/lib/api";

interface Props {
    value: string;
    onChange: (location: string) => void;
}

export default function LocationPicker({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const [cities, setCities] = useState<ApiCity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const containerRef = useRef<HTMLDivElement>(null);
    const hasLoadedRef = useRef(false);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    // Load the full city list once, the first time the dropdown is opened
    useEffect(() => {
        if (!open || hasLoadedRef.current) return;
        hasLoadedRef.current = true;
        setLoading(true);

        fetchCities()
            .then((data) => {
                const sorted = [...data].sort((a, b) =>
                    a.name.localeCompare(b.name)
                );
                setCities(sorted);
            })
            .catch((err) => {
                hasLoadedRef.current = false;
                setError(
                    err instanceof ApiError ? err.message : "Couldn't load cities."
                );
            })
            .finally(() => setLoading(false));
    }, [open]);

    function selectCity(name: string) {
        onChange(name);
        setOpen(false);
    }

    function clearLocation(e: React.MouseEvent) {
        e.stopPropagation();
        onChange("");
    }

    return (
        <div ref={containerRef} className="relative hidden md:block">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex h-full w-[170px] items-center justify-center gap-2 border-r border-gray-300 px-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50"
            >
                <MapPin size={17} className="shrink-0" />

                <span className="truncate">{value || "Location"}</span>

                {value ? (
                    <span
                        onClick={clearLocation}
                        className="ml-auto shrink-0 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                    >
                        <X size={14} />
                    </span>
                ) : (
                    <ChevronDown
                        size={15}
                        className={`ml-auto shrink-0 text-gray-400 transition-transform ${open ? "rotate-180" : ""
                            }`}
                    />
                )}
            </button>

            {open && (
                <div className="absolute left-0 top-[calc(100%+8px)] z-20 w-[240px] rounded-xl border border-gray-200 bg-white p-2 shadow-lg">
                    <div className="max-h-64 overflow-y-auto">
                        {loading && (
                            <p className="px-2 py-2 text-xs text-gray-400">
                                Loading cities...
                            </p>
                        )}

                        {error && (
                            <p className="px-2 py-2 text-xs font-medium text-red-500">
                                {error}
                            </p>
                        )}

                        {!loading && !error && cities.length === 0 && (
                            <p className="px-2 py-2 text-xs text-gray-400">
                                No cities available.
                            </p>
                        )}

                        {!loading &&
                            !error &&
                            cities.map((city) => (
                                <button
                                    key={city.id}
                                    type="button"
                                    onClick={() => selectCity(city.name)}
                                    className={`flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm hover:bg-gray-50 ${value === city.name
                                            ? "bg-gray-50 font-medium text-[#0D3B7A]"
                                            : "text-gray-700"
                                        }`}
                                >
                                    <MapPin size={14} className="shrink-0 text-[#0D3B7A]" />

                                    <span className="truncate">{city.name}</span>

                                    {city.state?.name && (
                                        <span className="ml-auto shrink-0 text-xs text-gray-400">
                                            {city.state.name}
                                        </span>
                                    )}
                                </button>
                            ))}
                    </div>
                </div>
            )}
        </div>
    );
}