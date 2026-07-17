"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/trustseal";

export default function FAQ() {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <>
            <div className="text-center">
                <h2 className="text-4xl font-bold text-[#163B82]">
                    Frequently Asked Questions
                </h2>
            </div>

            <div className="mx-auto mt-16 max-w-4xl space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={faq.question}
                        className="rounded-xl border text-gray-500"
                    >
                        <button
                            onClick={() =>
                                setOpen(open === index ? null : index)
                            }
                            className="flex w-full items-center justify-between p-6 text-left"
                        >
                            <span className="font-semibold">
                                {faq.question}
                            </span>

                            <ChevronDown
                                className={`transition ${open === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>

                        {open === index && (
                            <div className="border-t px-6 py-5 text-gray-600 leading-7">
                                {faq.answer}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </>
    );
}