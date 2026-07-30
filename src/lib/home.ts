import { apiRequest } from "./api";

export interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    icon_url: string | null;
}

export interface ApiCompany {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo_url: string | null;
    verified: boolean;
}

export interface ApiProduct {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    image_url: string | null;
    price: string | null;
    unit: string | null;
    featured: boolean;
    company: ApiCompany | null;
    category: { id: number; name: string; slug: string } | null;
}

export function fetchCategories() {
    return apiRequest<ApiCategory[]>("/categories");
}

export function fetchProducts(params: { featured?: boolean; limit?: number } = {}) {
    const query = new URLSearchParams();
    if (params.featured) query.set("featured", "1");
    if (params.limit) query.set("limit", String(params.limit));

    const qs = query.toString();
    return apiRequest<ApiProduct[]>(`/products${qs ? `?${qs}` : ""}`);
}

export function fetchCompanies() {
    return apiRequest<ApiCompany[]>("/companies");
}
