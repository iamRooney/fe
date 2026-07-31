"use client";

import { useEffect, useState } from "react";
import { Package, Star, Trash2 } from "lucide-react";

import {
    fetchSellerProducts,
    deleteSellerProduct,
    ApiSellerProduct,
} from "@/lib/SellerProducts";
import { ApiError } from "@/lib/api";

const STATUS_STYLES: Record<ApiSellerProduct["status"], string> = {
    approved: "bg-green-50 text-green-700 border-green-200",
    pending: "bg-amber-50 text-amber-700 border-amber-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
};

const STATUS_LABEL: Record<ApiSellerProduct["status"], string> = {
    approved: "Approved",
    pending: "Pending Review",
    rejected: "Rejected",
};

export default function MyProducts() {
    const [products, setProducts] = useState<ApiSellerProduct[]>([]);
    const [page, setPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [deletingId, setDeletingId] = useState<number | null>(null);

    function load(pageToLoad: number) {
        setLoading(true);
        setError("");

        fetchSellerProducts(pageToLoad)
            .then((res) => {
                setProducts(res.data.data);
                setPage(res.data.current_page);
                setLastPage(res.data.last_page);
                setTotal(res.data.total);
            })
            .catch((err) => {
                setError(
                    err instanceof ApiError
                        ? err.message
                        : "Couldn't load your products."
                );
            })
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        load(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleDelete(product: ApiSellerProduct) {
        if (!confirm(`Delete "${product.name}"? This can't be undone.`)) return;

        setDeletingId(product.id);
        try {
            await deleteSellerProduct(product.id);
            setProducts((prev) => prev.filter((p) => p.id !== product.id));
            setTotal((prev) => prev - 1);
        } catch (err) {
            alert(
                err instanceof ApiError
                    ? err.message
                    : "Couldn't delete this product."
            );
        } finally {
            setDeletingId(null);
        }
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-xl font-semibold text-slate-900">My Products</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        {total > 0
                            ? `${total} product${total === 1 ? "" : "s"} listed`
                            : "Products you've submitted for approval"}
                    </p>
                </div>
            </div>

            {loading && (
                <div className="mt-6 rounded-xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-400">
                    Loading your products...
                </div>
            )}

            {!loading && error && (
                <div className="mt-6 rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm font-medium text-red-600">
                    {error}
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="mt-6 flex flex-col items-center rounded-xl border border-dashed border-slate-300 bg-white p-12 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
                        <Package className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="mt-3 text-sm font-medium text-slate-700">
                        No products yet
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-slate-400">
                        Products you add will show up here while they're pending
                        approval and once they're live.
                    </p>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="mt-6 space-y-3">
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4"
                        >
                            {product.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={product.image_url}
                                    alt={product.name}
                                    className="h-16 w-16 shrink-0 rounded-lg border border-slate-200 object-cover"
                                />
                            ) : (
                                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                                    <Package className="h-6 w-6 text-slate-300" />
                                </div>
                            )}

                            <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                    <p className="truncate text-sm font-semibold text-slate-900">
                                        {product.name}
                                    </p>
                                    {product.featured && (
                                        <Star
                                            size={14}
                                            className="shrink-0 fill-amber-400 text-amber-400"
                                        />
                                    )}
                                </div>

                                <p className="mt-0.5 truncate text-xs text-slate-400">
                                    {product.category?.name ?? "Uncategorized"}
                                </p>

                                <p className="mt-1 text-sm font-medium text-slate-700">
                                    {product.price
                                        ? `₹${Number(product.price).toLocaleString()}`
                                        : "Price on request"}
                                    {product.unit && (
                                        <span className="font-normal text-slate-400">
                                            {" "}
                                            / {product.unit}
                                        </span>
                                    )}
                                </p>
                            </div>

                            <span
                                className={`shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${STATUS_STYLES[product.status]}`}
                            >
                                {STATUS_LABEL[product.status]}
                            </span>

                            <button
                                onClick={() => handleDelete(product)}
                                disabled={deletingId === product.id}
                                className="shrink-0 rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                aria-label={`Delete ${product.name}`}
                            >
                                <Trash2 size={16} />
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {!loading && !error && lastPage > 1 && (
                <div className="mt-6 flex items-center justify-center gap-3">
                    <button
                        onClick={() => load(page - 1)}
                        disabled={page <= 1}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-slate-500">
                        Page {page} of {lastPage}
                    </span>
                    <button
                        onClick={() => load(page + 1)}
                        disabled={page >= lastPage}
                        className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}