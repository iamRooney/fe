"use client";

import { ChevronDown } from "lucide-react";
import { ReactNode } from "react";

interface FilterSectionProps {
    title: string;
    children: ReactNode;
}

export default function FilterSection({
    title,
    children,
}: FilterSectionProps) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <div className="flex h-12 items-center justify-between border-b px-4">
                <h3 className="text-[15px] font-semibold text-gray-800">
                    {title}
                </h3>

                <ChevronDown
                    size={18}
                    className="text-gray-400"
                />
            </div>

            <div className="p-4">
                {children}
            </div>
        </div>
    );
}