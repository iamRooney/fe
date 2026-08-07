import { apiRequest, ApiError, API_BASE_URL } from "./api";

export type DocumentStatus = "pending" | "approved" | "rejected";

export type DocumentType =
    | "gst_certificate"
    | "pan_card"
    | "business_license"
    | "tax_record"
    | "identity_proof"
    | "other";

export const DOCUMENT_TYPE_LABELS: Record<DocumentType, string> = {
    gst_certificate: "GST Certificate",
    pan_card: "PAN Card",
    business_license: "Business License",
    tax_record: "Tax Record",
    identity_proof: "Identity Proof",
    other: "Other",
};

export interface ApiCompanyDocument {
    id: number;
    company_id: number;
    type: DocumentType;
    original_name: string;
    mime_type: string;
    size: number;
    status: DocumentStatus;
    notes: string | null;
    created_at: string;
}

// Accepted client-side, purely to give people instant feedback before
// the file goes anywhere — the backend independently re-checks the
// real file content and is the actual source of truth.
export const ACCEPTED_DOCUMENT_TYPES = ["application/pdf", "image/jpeg", "image/png"];
export const MAX_DOCUMENT_SIZE_BYTES = 5 * 1024 * 1024; // 5MB, matches the backend limit

export function fetchMyDocuments() {
    return apiRequest<{ success: boolean; data: ApiCompanyDocument[] }>(
        "/seller/company/documents",
        { auth: true }
    );
}

export function uploadCompanyDocument(type: DocumentType, file: File) {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    return apiRequest<{ success: boolean; message: string; data: ApiCompanyDocument }>(
        "/seller/company/documents",
        { method: "POST", body: formData, auth: true }
    );
}

export function deleteCompanyDocument(id: number) {
    return apiRequest<{ success: boolean; message: string }>(
        `/seller/company/documents/${id}`,
        { method: "DELETE", auth: true }
    );
}

/**
 * View/download a document. Auth here is a Bearer token (not a cookie),
 * so a plain <a href> to the API can't authenticate — fetch it as a
 * blob with the token attached, then hand the browser an object URL.
 */
export async function openCompanyDocument(id: number, filename: string) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const res = await fetch(`${API_BASE_URL}/seller/company/documents/${id}`, {
        headers: {
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
    });

    if (!res.ok) {
        throw new ApiError("Couldn't load that document.", res.status, null);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank", "noopener,noreferrer");

    // If a popup blocker ate it, fall back to a same-tab download instead
    // of silently doing nothing.
    if (!win) {
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
    }

    // Give the new tab a moment to actually load the blob before revoking it.
    setTimeout(() => URL.revokeObjectURL(url), 30000);
}