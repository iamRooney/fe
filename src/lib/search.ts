import { apiRequest } from "./api";
import { ApiCompany, ApiProduct } from "./home";

export interface ApiService {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    image: string | null;
    starting_price: string | null;
    service_area: string | null;
    company: ApiCompany | null;
    category: { id: number; name: string; slug: string } | null;
}

export interface ApiLocationItem {
    id: number;
    name: string;
}

export interface SearchResults {
    success: boolean;
    query: string;
    products: ApiProduct[];
    services: ApiService[];
    companies: ApiCompany[];
    locations: {
        countries: ApiLocationItem[];
        states: ApiLocationItem[];
        cities: ApiLocationItem[];
    };
}

export interface ApiCity {
    id: number;
    name: string;
    state?: {
        id: number;
        name: string;
        country?: {
            id: number;
            name: string;
        } | null;
    } | null;
}

export function fetchCities() {
    return apiRequest<ApiCity[]>("/cities");
}

export function fetchSearch(params: {
    q?: string;
    location?: string;
    category?: string;
    minPrice?: string;
    maxPrice?: string;
}) {
    const query = new URLSearchParams();
    if (params.q) query.set("q", params.q);
    if (params.location) query.set("location", params.location);
    if (params.category) query.set("category", params.category);
    if (params.minPrice) query.set("min_price", params.minPrice);
    if (params.maxPrice) query.set("max_price", params.maxPrice);

    const qs = query.toString();
    return apiRequest<SearchResults>(`/search${qs ? `?${qs}` : ""}`);
}