"use client";

import { useState } from "react";
import { MapPin, Search, ChevronDown } from "lucide-react";

const locations = ["Thrissur", "Kochi", "Kozhikode", "Kollam", "Thiruvananthapuram"];

export default function ProductSearchBar() {
    const [location, setLocation] = useState("Thrissur");
    const [locationOpen, setLocationOpen] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <div className="flex overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div className="relative">
                <button
                    type="button"
                    onClick={() => setLocationOpen((prev) => !prev)}
                    className="flex h-full items-center gap-2 border-r border-slate-200 bg-slate-50 px-4 py-3.5 text-sm text-slate-700 hover:bg-slate-100"
                >
                    <MapPin className="h-4 w-4 text-slate-400" />
                    {location}
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform ${locationOpen ? "rotate-180" : ""}`} />
                </button>

                {locationOpen && (
                    <div className="absolute z-10 mt-1 w-48 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
                        {locations.map((loc) => (
                            <button
                                key={loc}
                                type="button"
                                onClick={() => {
                                    setLocation(loc);
                                    setLocationOpen(false);
                                }}
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm ${loc === location ? "bg-blue-50 text-[#0057D9] font-medium" : "text-slate-600 hover:bg-slate-50"
                                    }`}
                            >
                                {loc}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter product / service"
                className="min-w-0 flex-1 px-4 py-3.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button
                type="button"
                className="flex items-center gap-2 bg-[#0057D9] px-8 text-sm font-medium text-white transition-colors hover:bg-[#003B95]"
            >
                <Search className="h-4 w-4" />
                Search
            </button>
        </div>
    );
}