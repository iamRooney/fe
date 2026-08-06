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

export interface ApiProductDetail extends ApiProduct {
    description: string | null;
    gallery_urls: string[];
    views: number;
}

export interface ApiEnquiry {
    id: number;
    enquiry_number: string;
    user_id: number;
    company_id: number;
    product_id: number | null;
    service_id: number | null;
    message: string;
    status: "open" | "closed";
    priority: "low" | "medium" | "high";
    created_at: string;
    updated_at: string;
    company: ApiCompany | null;
    product: { id: number; name: string; slug: string } | null;
    service: { id: number; name: string; slug: string } | null;
}

/* -------------------------------------------------------------------------- */
/*                              REQUIREMENTS API                              */
/* -------------------------------------------------------------------------- */

export interface RequirementPayload {
    category_id: number;
    title: string;
    quantity: number;
    unit: string;
    alternate_phone?: string;
}

export interface ApiRequirementResponse {
    success: boolean;
    message: string;
    data?: unknown;
}

export function postRequirement(data: RequirementPayload) {
    return apiRequest<ApiRequirementResponse>("/requirements", {
        method: "POST",
        body: data,
        auth: true,
    });
}

/* -------------------------------------------------------------------------- */
/*                                 Categories                                 */
/* -------------------------------------------------------------------------- */

export function fetchCategories() {
    return apiRequest<ApiCategory[]>("/categories");
}

/* -------------------------------------------------------------------------- */
/*                                  Products                                  */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/*                                  Companies                                 */
/* -------------------------------------------------------------------------- */

export function fetchCompanies() {
    return apiRequest<ApiCompany[]>("/companies");
}

export function fetchCompanyBySlug(slug: string) {
    return apiRequest<ApiCompany>(`/companies/${slug}`);
}

/* -------------------------------------------------------------------------- */
/*                              Saved Companies                               */
/* -------------------------------------------------------------------------- */

export function fetchSavedCompanies() {
    return apiRequest<{ success: boolean; data: ApiCompany[] }>(
        "/saved-companies",
        { auth: true }
    );
}

export function saveCompany(companyId: number) {
    return apiRequest<{ success: boolean; message: string }>(
        "/saved-companies",
        {
            method: "POST",
            body: {
                company_id: companyId,
            },
            auth: true,
        }
    );
}

export function unsaveCompany(companyId: number) {
    return apiRequest<{ success: boolean; message: string }>(
        `/saved-companies/${companyId}`,
        {
            method: "DELETE",
            auth: true,
        }
    );
}

/* -------------------------------------------------------------------------- */
/*                                My Enquiries                                */
/* -------------------------------------------------------------------------- */

export function fetchMyEnquiries(params: { limit?: number } = {}) {
    const query = new URLSearchParams();

    if (params.limit) {
        query.set("limit", String(params.limit));
    }

    const qs = query.toString();

    return apiRequest<{ success: boolean; data: ApiEnquiry[] }>(
        `/enquiries${qs ? `?${qs}` : ""}`,
        {
            auth: true,
        }
    );
}