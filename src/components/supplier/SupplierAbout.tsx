"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface SupplierAboutProps {
    about: string;
}

export default function SupplierAbout({
    about,
}: SupplierAboutProps) {
    const [expanded, setExpanded] = useState(false);

    const shouldCollapse = about.length > 250;

    const content =
        expanded || !shouldCollapse
            ? about
            : `${about.slice(0, 250)}...`;

    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Heading */}
            <div className="mb-5 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        About Company
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        A quick overview of the supplier and their business.
                    </p>
                </div>
            </div>

            {/* Description */}
            <div className="space-y-4">
                <p className="text-[15px] leading-8 text-gray-600">
                    {content}
                </p>

                {shouldCollapse && (
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-primary transition hover:opacity-80"
                    >
                        {expanded ? (
                            <>
                                Show Less
                                <ChevronUp size={16} />
                            </>
                        ) : (
                            <>
                                Read More
                                <ChevronDown size={16} />
                            </>
                        )}
                    </button>
                )}
            </div>
        </section>
    );
}