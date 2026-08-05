"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useAuth } from "@/hooks/useAuth";
import { fetchCategories, postRequirement, ApiCategory } from "@/lib/home";
import { ApiError } from "@/lib/api";

export default function RequirementForm() {
    const auth = useAuth();

    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [categoryId, setCategoryId] = useState("");
    const [title, setTitle] = useState("");
    const [quantity, setQuantity] = useState("");
    const [unit, setUnit] = useState("Pieces");
    const [phone, setPhone] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch(() => {
                // Category list failing to load shouldn't block the rest of the page.
            });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!auth?.user) {
            setError("Please log in as a buyer to post a requirement.");
            return;
        }

        if (auth.role !== "buyer") {
            setError("Only buyer accounts can post a requirement.");
            return;
        }

        if (!categoryId) {
            setError("Please select a category so we can match the right suppliers.");
            return;
        }

        const qty = Number(quantity);
        if (!qty || qty < 1) {
            setError("Please enter a valid quantity.");
            return;
        }

        if (!phone.trim()) {
            setError("Please enter a mobile number suppliers can reach you on.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            await postRequirement({
                category_id: Number(categoryId),
                title: title || categories.find((c) => String(c.id) === categoryId)?.name || "Requirement",
                quantity: qty,
                unit,
                phone,
            });
            setSent(true);
        } catch (err) {
            setError(
                err instanceof ApiError ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <div className="relative z-20 w-full max-w-[430px] rounded-3xl bg-white p-8 text-center shadow-[0_25px_60px_rgba(0,0,0,0.15)]">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
                <h2 className="mt-4 text-2xl font-bold text-[#072B66]">Requirement Posted</h2>
                <p className="mt-2 text-sm leading-6 text-gray-500">
                    We&apos;ve sent it to matching suppliers. Whoever accepts first will reach out to you.
                </p>
                <button
                    type="button"
                    onClick={() => {
                        setSent(false);
                        setTitle("");
                        setQuantity("");
                        setCategoryId("");
                    }}
                    className="mt-6 text-sm font-semibold text-[#F89A1C] hover:underline"
                >
                    Post another requirement
                </button>
            </div>
        );
    }

    return (
        <div className="relative z-20 w-full max-w-[430px] rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)]">

            <h2 className="mt-4 text-2xl font-bold text-[#072B66]">
                Post Your Requirement
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                Receive multiple quotations from trusted suppliers within hours.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5 text-gray-500">

                <Select
                    label="Category"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                            {c.name}
                        </option>
                    ))}
                </Select>

                <Input
                    label="Product / Service"
                    placeholder="Eg. LED Television"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        type="number"
                        min={1}
                        label="Quantity"
                        placeholder="100"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />

                    <Select label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                        <option>Pieces</option>
                        <option>Kg</option>
                        <option>Boxes</option>
                        <option>Litres</option>
                    </Select>

                </div>

                <Input
                    type="tel"
                    label="Mobile Number"
                    placeholder="+91 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                {error && (
                    <p className="text-sm font-medium text-red-500">
                        {error}
                        {!auth?.user && (
                            <>
                                {" "}
                                <Link href="/auth/login" className="underline">
                                    Log in
                                </Link>
                            </>
                        )}
                    </p>
                )}

                <Button type="submit" className="w-full py-4 text-base" disabled={loading}>
                    {loading ? (
                        <span className="flex items-center gap-2">
                            <Loader2 size={18} className="animate-spin" />
                            Posting...
                        </span>
                    ) : (
                        "Post Requirement"
                    )}
                </Button>

            </form>

            <div className="mt-8 flex justify-between border-t pt-5 text-xs text-gray-500">

                <span>✔ Verified Suppliers</span>

                <span>✔ Secure Enquiry</span>

                <span>✔ Secure Communication</span>

            </div>

        </div>
    );
}
