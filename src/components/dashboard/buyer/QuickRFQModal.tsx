"use client";

import { useState } from "react";
import { X, Send, CheckCircle2, ChevronLeft } from "lucide-react";
import CategorySelect from "@/components/profile/CategorySelect";

interface QuickRFQModalProps {
    open: boolean;
    onClose: () => void;
}

type Step = 1 | 2 | 3;

const steps: { id: Step; label: string }[] = [
    { id: 1, label: "Product" },
    { id: 2, label: "Quantity" },
    { id: 3, label: "Contact" },
];

export default function QuickRFQModal({ open, onClose }: QuickRFQModalProps) {
    const [step, setStep] = useState<Step>(1);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [quantity, setQuantity] = useState("");
    const [targetPrice, setTargetPrice] = useState("");
    const [mobile, setMobile] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    if (!open) return null;

    const step1Valid = title.trim() && category.length > 0;
    const step2Valid = quantity.trim();
    const step3Valid = mobile.length === 10;

    function reset() {
        setStep(1);
        setTitle("");
        setCategory([]);
        setQuantity("");
        setTargetPrice("");
        setMobile("");
        setSubmitted(false);
    }

    function handleClose() {
        reset();
        onClose();
    }

    async function handleSubmit() {
        if (!step3Valid) return;
        setSubmitting(true);
        await new Promise((resolve) => setTimeout(resolve, 900));
        setSubmitting(false);
        setSubmitted(true);
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">Post Your Requirement</p>
                    <button onClick={handleClose} className="text-slate-400 hover:text-slate-600">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {submitted ? (
                    <div className="flex flex-col items-center px-6 py-10 text-center">
                        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                            <CheckCircle2 className="h-7 w-7 text-green-600" />
                        </div>
                        <h3 className="mt-4 text-base font-semibold text-slate-900">Requirement posted</h3>
                        <p className="mt-1 max-w-xs text-sm text-slate-500">
                            Verified suppliers will start sending quotes shortly.
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-6 rounded-lg bg-[#0057D9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#003B95]"
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <>
                        {/* Step tabs */}
                        <div className="flex border-b border-slate-200 px-6">
                            {steps.map((s) => (
                                <div
                                    key={s.id}
                                    className={`mr-6 border-b-2 py-3 text-sm font-medium ${step === s.id
                                        ? "border-[#0057D9] text-[#0057D9]"
                                        : step > s.id
                                            ? "border-transparent text-slate-500"
                                            : "border-transparent text-slate-300"
                                        }`}
                                >
                                    {s.id}. {s.label}
                                </div>
                            ))}
                        </div>

                        {/* Step content */}
                        <div className="px-6 py-6">
                            {step === 1 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">
                                            What are you sourcing?
                                        </label>
                                        <input
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="e.g. LED Television"
                                            className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                                        />
                                    </div>
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                                        <CategorySelect selected={category} onChange={setCategory} multiple={false} />
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-5">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                                            <input
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                placeholder="100"
                                                className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>
                                        <div>
                                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                                Target price (optional)
                                            </label>
                                            <input
                                                value={targetPrice}
                                                onChange={(e) => setTargetPrice(e.target.value)}
                                                placeholder="$1.50/unit"
                                                className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-700">Mobile Number</label>
                                        <div className="flex overflow-hidden rounded-xl border border-slate-300 focus-within:border-[#0057D9] focus-within:ring-4 focus-within:ring-blue-100">
                                            <div className="flex items-center bg-slate-50 px-4 text-sm font-medium text-slate-600">
                                                +91
                                            </div>
                                            <input
                                                type="tel"
                                                maxLength={10}
                                                value={mobile}
                                                onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                                                placeholder="9876543210"
                                                className="text-gray-500 flex-1 px-4 py-3 text-sm outline-none"
                                            />
                                        </div>
                                        <p className="mt-2 text-xs text-slate-400">
                                            Suppliers will use this to reach you with quotes.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Footer nav */}
                        <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                            {step > 1 ? (
                                <button
                                    onClick={() => setStep((s) => (s - 1) as Step)}
                                    className="flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                    Back
                                </button>
                            ) : (
                                <span />
                            )}

                            {step < 3 ? (
                                <button
                                    disabled={step === 1 ? !step1Valid : !step2Valid}
                                    onClick={() => setStep((s) => (s + 1) as Step)}
                                    className="rounded-lg bg-[#0057D9] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:bg-[#003B95] disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    disabled={!step3Valid || submitting}
                                    onClick={handleSubmit}
                                    className="flex items-center gap-2 rounded-lg bg-[#F97316] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-40"
                                >
                                    {submitting ? (
                                        "Posting..."
                                    ) : (
                                        <>
                                            <Send className="h-4 w-4" />
                                            Post Requirement
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}