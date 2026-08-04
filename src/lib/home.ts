import { apiRequest } from "./api";

export interface ApiCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    icon_url: string | null;
}

export interface ApiLocationRef {
    id: number;
    name: string;
}

export interface ApiCompany {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    logo_url: string | null;
    verified: boolean;

    // Only present on the single-company (show) response, not the list.
    email?: string;
    phone?: string;
    website?: string | null;
    gst_number?: string | null;
    address?: string | null;
    years_in_business?: number;
    annual_turnover?: string | null;
    staff_count?: number;
    response_rate?: number;
    approved_products_count?: number;
    created_at?: string;
    country?: ApiLocationRef | null;
    state?: ApiLocationRef | null;
    city?: ApiLocationRef | null;
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

// Extra fields only present on the single-product (show) response, not the
// list — description/gallery/views aren't needed for cards, just detail pages.
export interface ApiProductDetail extends ApiProduct {
    description: string | null;
    gallery_urls: string[];
    views: number;
}

export function fetchCategories() {
    return apiRequest<ApiCategory[]>("/categories");
}

export function fetchProducts(
    params: { featured?: boolean; limit?: number; category?: string } = {}
) {
    const query = new URLSearchParams();
    if (params.featured) query.set("featured", "1");
    if (params.limit) query.set("limit", String(params.limit));
    if (params.category) query.set("category", params.category);

    const qs = query.toString();
    return apiRequest<ApiProduct[]>(`/products${qs ? `?${qs}` : ""}`);
}

export function fetchProductBySlug(slug: string) {
    return apiRequest<ApiProductDetail>(`/products/${slug}`);
}

export function fetchCompanies() {
    return apiRequest<ApiCompany[]>("/companies");
}

export function fetchCompanyBySlug(slug: string) {
    return apiRequest<ApiCompany>(`/companies/${slug}`);
}

// Buyer-only "like a supplier" feature on the homepage.
export function fetchSavedCompanies() {
    return apiRequest<{ success: boolean; data: ApiCompany[] }>(
        "/saved-companies",
        { auth: true }
    );
}

export function saveCompany(companyId: number) {
    return apiRequest<{ success: boolean; message: string }>(
        "/saved-companies",
        { method: "POST", body: { company_id: companyId }, auth: true }
    );
}

export function unsaveCompany(companyId: number) {
    return apiRequest<{ success: boolean; message: string }>(
        `/saved-companies/${companyId}`,
        { method: "DELETE", auth: true }
    );
}

// --- Enquiries (buyer dashboard) -----------------------------------------

export type EnquiryStatus = "open" | "closed";
export type EnquiryPriority = "low" | "medium" | "high";

export interface ApiEnquiryRef {
    id: number;
    name: string;
    slug: string;
    logo_url?: string | null;
    image_url?: string | null;
}

export interface ApiEnquiry {
    id: number;
    enquiry_number: string;
    message: string;
    status: EnquiryStatus;
    priority: EnquiryPriority;
    created_at: string;
    company: ApiEnquiryRef | null;
    product: ApiEnquiryRef | null;
    service: ApiEnquiryRef | null;
}

export function fetchMyEnquiries() {
    return apiRequest<{ success: boolean; data: ApiEnquiry[] }>(
        "/enquiries",
        { auth: true }
    );
}

export interface CreateEnquiryPayload {
    company_id: number;
    product_id?: number;
    service_id?: number;
    message: string;
    priority?: EnquiryPriority;
}

export function createEnquiry(payload: CreateEnquiryPayload) {
    return apiRequest<{ success: boolean; message: string; data: ApiEnquiry }>(
        "/enquiries",
        { method: "POST", body: payload, auth: true }
    );
}

// --- Recently viewed (buyer dashboard) ------------------------------------

export interface ApiRecentlyViewedItem {
    id: number;
    viewed_at: string;
    product: ApiProduct | null;
}

export function fetchRecentlyViewed() {
    return apiRequest<{ success: boolean; data: ApiRecentlyViewedItem[] }>(
        "/recently-viewed",
        { auth: true }
    );
}

/** Fire-and-forget: called from the product detail page for buyers only. */
export function recordProductView(productId: number) {
    return apiRequest<{ success: boolean }>(
        "/recently-viewed",
        { method: "POST", body: { product_id: productId }, auth: true }
    );
}