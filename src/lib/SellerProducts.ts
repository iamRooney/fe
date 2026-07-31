import { apiRequest } from "./api";
import { ApiCategory } from "./home";

export interface ApiSellerProduct {
    id: number;
    name: string;
    slug: string;
    short_description: string | null;
    description: string | null;
    image_url: string | null;
    price: string | null;
    unit: string | null;
    status: "pending" | "approved" | "rejected";
    featured: boolean;
    category: ApiCategory | null;
}

export interface CreateProductInput {
    category_id: string | number;
    name: string;
    short_description?: string;
    description?: string;
    price?: string;
    unit?: string;
    image?: File | null;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    total: number;
}

export function fetchSellerProducts(page = 1) {
    return apiRequest<{ success: boolean; data: PaginatedResponse<ApiSellerProduct> }>(
        `/seller/products?page=${page}`,
        { auth: true }
    );
}

export function deleteSellerProduct(id: number) {
    return apiRequest<{ success: boolean; message: string }>(`/seller/products/${id}`, {
        method: "DELETE",
        auth: true,
    });
}

export function createSellerProduct(input: CreateProductInput) {
    const formData = new FormData();
    formData.append("category_id", String(input.category_id));
    formData.append("name", input.name);
    if (input.short_description) formData.append("short_description", input.short_description);
    if (input.description) formData.append("description", input.description);
    if (input.price) formData.append("price", input.price);
    if (input.unit) formData.append("unit", input.unit);
    if (input.image) formData.append("image", input.image);

    return apiRequest<{ success: boolean; message: string; data: ApiSellerProduct }>(
        "/seller/products",
        { method: "POST", body: formData, auth: true }
    );
}