"use client";

import { Check } from "lucide-react";

const defaultCategories = [
    "Industrial Machinery",
    "Construction",
    "Electrical",
    "Electronics",
    "Automobile",
    "Packaging",
    "Agriculture",
    "Healthcare",
    "Food Processing",
    "Chemicals",
    "Textiles",
    "Other",
];

interface CategorySelectProps {
    options?: string[];
    selected: string[];
    onChange: (selected: string[]) => void;
    multiple?: boolean;
}

export default function CategorySelect({
    options = defaultCategories,
    selected,
    onChange,
    multiple = true,
}: CategorySelectProps) {
    function toggle(option: string) {
        if (!multiple) {
            onChange([option]);
            return;
        }
        if (selected.includes(option)) {
            onChange(selected.filter((o) => o !== option));
        } else {
            onChange([...selected, option]);
        }
    }

    return (
        <div className="flex flex-wrap gap-2">
            {options.map((option) => {
                const active = selected.includes(option);
                return (
                    <button
                        key={option}
                        type="button"
                        onClick={() => toggle(option)}
                        className={`flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-medium transition ${active
                                ? "border-blue-600 bg-blue-50 text-blue-600"
                                : "border-slate-300 text-slate-600 hover:border-blue-300"
                            }`}
                    >
                        {active && <Check size={14} />}
                        {option}
                    </button>
                );
            })}
        </div>
    );
}