"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
    UploadCloud,
    FileText,
    Eye,
    Trash2,
    Loader2,
    CheckCircle2,
    XCircle,
    Clock3,
} from "lucide-react";
import {
    fetchMyDocuments,
    uploadCompanyDocument,
    deleteCompanyDocument,
    openCompanyDocument,
    ACCEPTED_DOCUMENT_TYPES,
    MAX_DOCUMENT_SIZE_BYTES,
    DOCUMENT_TYPE_LABELS,
    ApiCompanyDocument,
    DocumentType,
} from "@/lib/CompanyDocuments";
import { ApiError } from "@/lib/api";

function formatSize(bytes: number) {
    if (bytes < 1024) return `${bytes} B`;
    return `${Math.round(bytes / 1024)} KB`;
}

function StatusBadge({ status }: { status: ApiCompanyDocument["status"] }) {
    if (status === "approved") {
        return (
            <span className="flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Approved
            </span>
        );
    }
    if (status === "rejected") {
        return (
            <span className="flex items-center gap-1 rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700">
                <XCircle className="h-3.5 w-3.5" />
                Rejected
            </span>
        );
    }
    return (
        <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <Clock3 className="h-3.5 w-3.5" />
            Pending review
        </span>
    );
}

export default function DocumentDropzone() {
    const [documents, setDocuments] = useState<ApiCompanyDocument[]>([]);
    const [loading, setLoading] = useState(true);
    const [docType, setDocType] = useState<DocumentType>("gst_certificate");
    const [dragActive, setDragActive] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");
    const [removingId, setRemovingId] = useState<number | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const loadDocuments = useCallback(() => {
        fetchMyDocuments()
            .then((res) => setDocuments(res.data))
            .catch(() => setDocuments([]))
            .finally(() => setLoading(false));
    }, []);

    useEffect(() => {
        loadDocuments();
    }, [loadDocuments]);

    async function handleFile(file: File | null) {
        if (!file) return;
        setError("");

        if (!ACCEPTED_DOCUMENT_TYPES.includes(file.type)) {
            setError("Please upload a PDF, JPG, or PNG file.");
            return;
        }
        if (file.size > MAX_DOCUMENT_SIZE_BYTES) {
            setError("That file is too large — the limit is 5MB.");
            return;
        }

        setUploading(true);
        try {
            await uploadCompanyDocument(docType, file);
            loadDocuments();
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Upload failed. Please try again.");
        } finally {
            setUploading(false);
            if (inputRef.current) inputRef.current.value = "";
        }
    }

    async function handleRemove(id: number) {
        setRemovingId(id);
        try {
            await deleteCompanyDocument(id);
            setDocuments((prev) => prev.filter((d) => d.id !== id));
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Couldn't remove that document.");
        } finally {
            setRemovingId(null);
        }
    }

    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-sm font-semibold text-slate-900">Verification documents</h3>
            <p className="mt-0.5 text-xs text-slate-500">
                Upload your GST certificate, PAN card, or other legal/tax documents so our team can
                verify your company. PDF, JPG, or PNG — up to 5MB each.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end">
                <div className="sm:w-64">
                    <label className="mb-1.5 block text-xs font-medium text-slate-600">
                        Document type
                    </label>
                    <select
                        value={docType}
                        onChange={(e) => setDocType(e.target.value as DocumentType)}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/10"
                    >
                        {Object.entries(DOCUMENT_TYPE_LABELS).map(([value, label]) => (
                            <option key={value} value={value}>
                                {label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div
                onDragOver={(e) => {
                    e.preventDefault();
                    setDragActive(true);
                }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => {
                    e.preventDefault();
                    setDragActive(false);
                    handleFile(e.dataTransfer.files?.[0] ?? null);
                }}
                onClick={() => !uploading && inputRef.current?.click()}
                className={`mt-3 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors ${dragActive
                    ? "border-[#0057D9] bg-[#0057D9]/5"
                    : "border-slate-300 hover:border-[#0057D9]/50 hover:bg-slate-50"
                    } ${uploading ? "pointer-events-none opacity-60" : ""}`}
            >
                {uploading ? (
                    <>
                        <Loader2 className="h-7 w-7 animate-spin text-[#0057D9]" />
                        <p className="mt-2 text-sm font-medium text-slate-600">Uploading...</p>
                    </>
                ) : (
                    <>
                        <UploadCloud className="h-7 w-7 text-slate-400" />
                        <p className="mt-2 text-sm font-medium text-slate-600">
                            Drag and drop a file, or click to browse
                        </p>
                        <p className="mt-1 text-xs text-slate-400">PDF, JPG, or PNG · up to 5MB</p>
                    </>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                />
            </div>

            {error && <p className="mt-2 text-sm font-medium text-red-500">{error}</p>}

            <div className="mt-5">
                {loading ? (
                    <p className="text-sm text-slate-400">Loading documents...</p>
                ) : documents.length === 0 ? (
                    <p className="text-sm text-slate-400">No documents uploaded yet.</p>
                ) : (
                    <div className="divide-y divide-slate-100 rounded-lg border border-slate-200">
                        {documents.map((doc) => (
                            <div key={doc.id} className="flex items-center justify-between gap-4 px-4 py-3">
                                <div className="flex min-w-0 items-center gap-3">
                                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                                        <FileText className="h-4 w-4" />
                                    </span>
                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-medium text-slate-900">
                                            {DOCUMENT_TYPE_LABELS[doc.type]}
                                        </p>
                                        <p className="truncate text-xs text-slate-400">
                                            {doc.original_name} · {formatSize(doc.size)}
                                        </p>
                                        {doc.status === "rejected" && doc.notes && (
                                            <p className="mt-0.5 text-xs text-red-500">{doc.notes}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex shrink-0 items-center gap-2">
                                    <StatusBadge status={doc.status} />

                                    <button
                                        onClick={() => openCompanyDocument(doc.id, doc.original_name)}
                                        title="View"
                                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                                    >
                                        <Eye className="h-4 w-4" />
                                    </button>

                                    {doc.status !== "approved" && (
                                        <button
                                            onClick={() => handleRemove(doc.id)}
                                            disabled={removingId === doc.id}
                                            title="Remove"
                                            className="rounded-lg p-2 text-slate-400 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
                                        >
                                            {removingId === doc.id ? (
                                                <Loader2 className="h-4 w-4 animate-spin" />
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
