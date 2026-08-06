import { apiFetch } from "./client";
import { ApiCategory } from "@/lib/home";

/** GET /api/categories — public, read-only, no auth required. */
export function getCategories() {
    return apiFetch<ApiCategory[]>("/categories", { auth: false });
}
