import { apiRequest } from "@/lib/api";

export type CompanyDocumentType =
    | "gst_certificate"
    | "pan_card"
    | "aadhar_card"
    | "business_license"
    | "tax_record"
    | "identity_proof"
    | "other";

export type CompanyDocumentStatus = "pending" | "approved" | "rejected";

export interface CompanyDocument {
    id: number;
    company_id: number;
    type: CompanyDocumentType;
    original_name: string;
    mime_type: string;
    size: number;
    status: CompanyDocumentStatus;
    notes: string | null;
    created_at: string;
}

interface UploadDocumentResponse {
    success: boolean;
    message: string;
    data: CompanyDocument;
}

/**
 * Upload one identity/legal document for the current seller's company.
 * Requires the seller's company to already exist, so this can only be
 * called after /profile/complete has succeeded.
 */
export function uploadCompanyDocument(type: CompanyDocumentType, file: File) {
    const formData = new FormData();
    formData.append("type", type);
    formData.append("file", file);

    return apiRequest<UploadDocumentResponse>("/company/documents", {
        method: "POST",
        body: formData,
        auth: true,
    });
}

export function listCompanyDocuments() {
    return apiRequest<{ success: boolean; data: CompanyDocument[] }>(
        "/company/documents",
        { auth: true }
    );
}
