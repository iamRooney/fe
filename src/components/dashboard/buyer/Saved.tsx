"use client";

import { useState } from "react";
import { Store, Package, Bookmark } from "lucide-react";
import { mockSavedItems } from "@/lib/mock";
import { SavedItem } from "@/lib/types";

export default function SavedSuppliers() {
    const [items, setItems] = useState<SavedItem[]>(mockSavedItems);

    function remove(id: string) {
        setItems((prev) => prev.filter((i) => i.id !== id));
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Saved Suppliers & Products</h1>
            <p className="mt-1 text-sm text-slate-500">Items you've bookmarked for later.</p>

            {items.length === 0 ? (
                <div className="mt-10 flex flex-col items-center justify-center text-center">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
                        <Bookmark className="h-6 w-6 text-slate-400" />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">Nothing saved yet.</p>
                </div>
            ) : (
                <div className="mt-5 grid grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0057D9] text-white">
                                    {item.type === "supplier" ? (
                                        <Store className="h-5 w-5" />
                                    ) : (
                                        <Package className="h-5 w-5" />
                                    )}
                                </div>
                                <button
                                    onClick={() => remove(item.id)}
                                    className="text-xs font-medium text-slate-400 hover:text-red-500"
                                >
                                    Remove
                                </button>
                            </div>
                            <p className="mt-3 text-sm font-medium text-slate-900">{item.name}</p>
                            <p className="mt-0.5 text-xs capitalize text-slate-400">{item.type}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}