"use client";

import { useEffect, useState } from "react";
import { getCategories } from "@/lib/api/categories";
import { mockCategorySuggestions } from "@/lib/mock";
import { CategorySuggestion } from "@/lib/types";

export function useCategories() {
    const [categories, setCategories] = useState<CategorySuggestion[]>(mockCategorySuggestions);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cancelled = false;

        getCategories()
            .then((data) => {
                if (cancelled) return;
                setCategories(
                    data.map((c) => ({
                        id: String(c.id),
                        name: c.name,
                        icon: "monitor", // API only gives an icon_url (image); CategoryGrid renders lucide icon keys, so fall back to a default until that's reconciled
                        productCount: 0, // not tracked by the API yet
                    }))
                );
            })
            .catch(() => {
                // Backend not running / unreachable — keep the mock fallback
                // already in state rather than showing an empty section.
            })
            .finally(() => {
                if (!cancelled) setLoading(false);
            });

        return () => {
            cancelled = true;
        };
    }, []);

    return { categories, loading };
}
