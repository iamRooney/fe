"use client";

import { useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import CategorySelect from "@/components/profile/CategorySelect";

export default function PostRFQ() {
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState<string[]>([]);
    const [quantity, setQuantity] = useState("");
    const [description, setDescription] = useState("");
    const [targetPrice, setTargetPrice] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const valid = title.trim() && category.length > 0 && quantity.trim();

    async function handleSubmit() {
        if (!valid) return;
        setSubmitting(true);

        // Fake delay — replace with a real POST once the backend exists
        await new Promise((resolve) => setTimeout(resolve, 900));

        setSubmitting(false);
        setSubmitted(true);
    }

    function resetForm() {
        setTitle("");
        setCategory([]);
        setQuantity("");
        setDescription("");
        setTargetPrice("");
        setSubmitted(false);
    }

    if (submitted) {
        return (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">RFQ posted</h2>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                    Suppliers matching "{category[0]}" will be able to respond with quotes.
                </p>
                <button
                    onClick={resetForm}
                    className="mt-6 rounded-lg bg-[#0057D9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#003B95]"
                >
                    Post another RFQ
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl p-4 sm:p-6">
            <h1 className="text-xl font-semibold text-slate-900">Post an RFQ</h1>
            <p className="mt-1 text-sm text-slate-500">
                Broadcast a sourcing request — matching suppliers can respond with quotes.
            </p>

            <div className="mt-6 space-y-6 rounded-xl border border-slate-200 bg-white p-6">
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">What do you need?</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="e.g. Need 1000 cotton blend fabric rolls"
                        className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Category</label>
                    <CategorySelect selected={category} onChange={setCategory} multiple={false} />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Quantity</label>
                        <input
                            value={quantity}
                            onChange={(e) => setQuantity(e.target.value)}
                            placeholder="e.g. 1000 rolls"
                            className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Target price (optional)</label>
                        <input
                            value={targetPrice}
                            onChange={(e) => setTargetPrice(e.target.value)}
                            placeholder="e.g. $1.50/unit"
                            className="text-gray-500 w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                        />
                    </div>
                </div>

                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">Additional details (optional)</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Specs, delivery timeline, certifications required, etc."
                        className="text-gray-500 w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <button
                    disabled={!valid || submitting}
                    onClick={handleSubmit}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0057D9] py-3.5 text-sm font-semibold text-white transition-opacity hover:bg-[#003B95] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    {submitting ? (
                        "Posting..."
                    ) : (
                        <>
                            <Send className="h-4 w-4" />
                            Post RFQ
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}