"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { MapPin, X } from "lucide-react";

import { fetchCities, ApiCity } from "@/lib/search";
import { ApiError } from "@/lib/api";

interface Props {
    value: string;
    onChange: (location: string) => void;
}

export default function LocationPicker({ value, onChange }: Props) {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [cities, setCities] = useState<ApiCity[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filter, setFilter] = useState("");
    const [panelPos, setPanelPos] = useState({ top: 0, left: 0, width: 280 });

    const wrapperRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);
    const hasLoadedRef = useRef(false);

    // Portals need the DOM, so only render one after mount (avoids SSR mismatch)
    useEffect(() => {
        setMounted(true);
    }, []);

    // Position the portal panel against the button's actual screen location,
    // so it isn't clipped by the search bar's `overflow-hidden`.
    useEffect(() => {
        if (!open) return;

        function updatePosition() {
            const rect = buttonRef.current?.getBoundingClientRect();
            if (!rect) return;
            setPanelPos({
                top: rect.bottom + 8,
                left: rect.left,
                width: Math.max(rect.width, 280),
            });
        }

        updatePosition();
        window.addEventListener("scroll", updatePosition, true);
        window.addEventListener("resize", updatePosition);
        return () => {
            window.removeEventListener("scroll", updatePosition, true);
            window.removeEventListener("resize", updatePosition);
        };
    }, [open]);

    // Close on outside click (checks both the button and the portaled panel)
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            const target = e.target as Node;
            if (
                wrapperRef.current?.contains(target) ||
                panelRef.current?.contains(target)
            ) {
                return;
            }
            setOpen(false);
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

    const filteredCities = useMemo(() => {
        const term = filter.trim().toLowerCase();
        if (!term) return cities;
        return cities.filter(
            (city) =>
                city.name.toLowerCase().includes(term) ||
                city.state?.name.toLowerCase().includes(term)
        );
    }, [cities, filter]);

    function selectCity(name: string) {
        onChange(name);
        setOpen(false);
        setFilter("");
    }

    function clearLocation(e: React.MouseEvent) {
        e.stopPropagation();
        onChange("");
    }

    return (
        <div ref={wrapperRef} className="relative hidden md:block">
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="flex h-full w-[170px] items-center justify-center gap-2 border-r border-gray-300 px-3 text-[15px] font-medium text-gray-700 hover:bg-gray-50"
            >
                <MapPin size={17} className="shrink-0" />

                <span className="truncate">{value || "Location"}</span>

                {value && (
                    <span
                        onClick={clearLocation}
                        className="ml-auto shrink-0 rounded-full p-0.5 text-gray-400 hover:bg-gray-200 hover:text-gray-600"
                    >
                        <X size={14} />
                    </span>
                )}
            </button>

            {mounted &&
                open &&
                createPortal(
                    <div
                        ref={panelRef}
                        style={{
                            position: "fixed",
                            top: panelPos.top,
                            left: panelPos.left,
                            width: panelPos.width,
                        }}
                        className="z-50 rounded-xl border border-gray-200 bg-white p-3 shadow-lg"
                    >
                        <input
                            autoFocus
                            type="text"
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            placeholder="Filter cities..."
                            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0D3B7A]/40"
                        />

                        <div className="mt-2 max-h-64 overflow-y-auto">
                            {loading && (
                                <p className="px-1 py-2 text-xs text-gray-400">
                                    Loading cities...
                                </p>
                            )}

                            {error && (
                                <p className="px-1 py-2 text-xs font-medium text-red-500">
                                    {error}
                                </p>
                            )}

                            {!loading && !error && filteredCities.length === 0 && (
                                <p className="px-1 py-2 text-xs text-gray-400">
                                    No matching cities.
                                </p>
                            )}

                            {!loading &&
                                !error &&
                                filteredCities.map((city) => (
                                    <button
                                        key={city.id}
                                        type="button"
                                        onClick={() => selectCity(city.name)}
                                        className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
                                    >
                                        <MapPin
                                            size={14}
                                            className="shrink-0 text-[#0D3B7A]"
                                        />

                                        <span className="truncate">{city.name}</span>

                                        {city.state?.name && (
                                            <span className="ml-auto shrink-0 text-xs text-gray-400">
                                                {city.state.name}
                                            </span>
                                        )}
                                    </button>
                                ))}
                        </div>
                    </div>,
                    document.body
                )}
        </div>
    );
}