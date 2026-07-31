"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle2, ImagePlus, X } from "lucide-react";

import { fetchCategories, ApiCategory } from "@/lib/home";
import { createSellerProduct } from "@/lib/SellerProducts";
import { ApiError } from "@/lib/api";

const UNIT_OPTIONS = [
    "Piece",
    "Kg",
    "Ton",
    "Box",
    "Set",
    "Meter",
    "Liter",
    "Dozen",
];

export default function AddProduct() {
    const [categories, setCategories] = useState<ApiCategory[]>([]);
    const [categoriesError, setCategoriesError] = useState("");

    const [categoryId, setCategoryId] = useState("");
    const [name, setName] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [unit, setUnit] = useState("");
    const [image, setImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchCategories()
            .then(setCategories)
            .catch((err) => {
                setCategoriesError(
                    err instanceof ApiError ? err.message : "Couldn't load categories."
                );
            });
    }, []);

    const valid = name.trim().length > 0 && categoryId.trim().length > 0;

    function handleImageChange(file: File | null) {
        setImage(file);
        setImagePreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return file ? URL.createObjectURL(file) : null;
        });
    }

    async function handleSubmit() {
        if (!valid || submitting) return;

        setSubmitting(true);
        setError("");

        try {
            await createSellerProduct({
                category_id: categoryId,
                name: name.trim(),
                short_description: shortDescription.trim() || undefined,
                description: description.trim() || undefined,
                price: price.trim() || undefined,
                unit: unit.trim() || undefined,
                image,
            });

            setSubmitted(true);
        } catch (err) {
            setError(
                err instanceof ApiError
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setSubmitting(false);
        }
    }

    function resetForm() {
        setCategoryId("");
        setName("");
        setShortDescription("");
        setDescription("");
        setPrice("");
        setUnit("");
        handleImageChange(null);
        setSubmitted(false);
        setError("");
    }

    if (submitted) {
        return (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 className="h-7 w-7 text-green-600" />
                </div>
                <h2 className="mt-4 text-lg font-semibold text-slate-900">
                    Product submitted for approval
                </h2>
                <p className="mt-1 max-w-sm text-sm text-slate-500">
                    &quot;{name}&quot; is now pending review. It&apos;ll appear in your
                    marketplace listings once an admin approves it.
                </p>
                <button
                    onClick={resetForm}
                    className="mt-6 rounded-lg bg-[#0057D9] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#003B95]"
                >
                    Add another product
                </button>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-2xl p-6">
            <h1 className="text-xl font-semibold text-slate-900">Add Product</h1>
            <p className="mt-1 text-sm text-slate-500">
                New products are reviewed by our team before they go live.
            </p>

            <div className="mt-6 space-y-6 rounded-xl border border-slate-200 bg-white p-6">

                {/* Image */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Product Image
                    </label>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpeg,image/jpg,image/webp"
                        className="hidden"
                        onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
                    />

                    {imagePreview ? (
                        <div className="relative inline-block">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={imagePreview}
                                alt="Product preview"
                                className="h-32 w-32 rounded-xl border border-slate-200 object-cover"
                            />
                            <button
                                type="button"
                                onClick={() => handleImageChange(null)}
                                className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-slate-800 text-white hover:bg-slate-900"
                            >
                                <X size={14} />
                            </button>
                        </div>
                    ) : (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="flex h-32 w-32 flex-col items-center justify-center gap-1.5 rounded-xl border-2 border-dashed border-slate-300 text-slate-400 hover:border-[#0057D9] hover:text-[#0057D9]"
                        >
                            <ImagePlus size={22} />
                            <span className="text-xs font-medium">Upload</span>
                        </button>
                    )}

                    <p className="mt-2 text-xs text-slate-400">
                        JPG, PNG, or WEBP. Max 2MB.
                    </p>
                </div>

                {/* Category */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Category
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    >
                        <option value="">Select a category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                    {categoriesError && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                            {categoriesError}
                        </p>
                    )}
                </div>

                {/* Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Product Name
                    </label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Industrial Ball Bearing 6205"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Short description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Short Description
                    </label>
                    <input
                        value={shortDescription}
                        onChange={(e) => setShortDescription(e.target.value.slice(0, 500))}
                        placeholder="One line that sums up the product"
                        className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    />
                    <p className="mt-1 text-right text-xs text-slate-400">
                        {shortDescription.length}/500
                    </p>
                </div>

                {/* Full description */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Description
                    </label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Specs, materials, certifications, packaging — anything a buyer would ask about."
                        className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-gray-500 outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                {/* Price + Unit */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Price
                        </label>
                        <div className="flex items-center rounded-xl border border-slate-300 focus-within:border-[#0057D9] focus-within:ring-4 focus-within:ring-blue-100">
                            <span className="pl-4 text-sm text-slate-400">₹</span>
                            <input
                                value={price}
                                onChange={(e) =>
                                    setPrice(e.target.value.replace(/[^0-9.]/g, ""))
                                }
                                placeholder="0.00"
                                inputMode="decimal"
                                className="w-full rounded-xl px-2 py-3 text-sm text-gray-500 outline-none"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">
                            Unit
                        </label>
                        <select
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-700 outline-none focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                        >
                            <option value="">Select unit</option>
                            {UNIT_OPTIONS.map((u) => (
                                <option key={u} value={u}>
                                    {u}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error && (
                    <p className="text-sm font-medium text-red-500">{error}</p>
                )}

                <button
                    disabled={!valid || submitting}
                    onClick={handleSubmit}
                    className={`w-full rounded-xl py-3.5 text-sm font-semibold transition-colors ${valid && !submitting
                        ? "bg-[#0057D9] text-white hover:bg-[#003B95]"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                        }`}
                >
                    {submitting ? "Submitting..." : "Submit for Approval"}
                </button>
            </div>
        </div>
    );
}