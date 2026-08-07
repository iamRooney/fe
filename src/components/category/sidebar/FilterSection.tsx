"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface FilterSectionProps {
    title: string;
    children: ReactNode;
    defaultOpen?: boolean;
}

export default function FilterSection({
    title,
    children,
    defaultOpen = true,
}: FilterSectionProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="flex h-12 w-full items-center justify-between border-b px-4"
            >
                <h3 className="text-[15px] font-semibold text-gray-800">
                    {title}
                </h3>

                <ChevronDown
                    size={18}
                    className={`text-gray-400 transition-transform ${open ? "" : "-rotate-90"
                        }`}
                />
            </button>

            {open && <div className="p-4">{children}</div>}
        </div>
    );
}