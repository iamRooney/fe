"use client";

import { useEffect, useState, useCallback, Fragment } from "react";
import { FileText, CheckCircle2, XCircle, Eye, Loader2, RefreshCw } from "lucide-react";
import { adminApiRequest, openAdminFile } from "@/lib/api/admin";
import { ApiError } from "@/lib/api";

type DocStatus = "pending" | "approved" | "rejected";

interface AdminDocument {
    id: number;
    company_id: number;
    type: string;
    original_name: string;
    mime_type: string;
    size: number;
    status: DocStatus;
    notes: string | null;
    created_at: string;
    company: { id: number; name: string; slug: string } | null;
    reviewer: { id: number; name: string } | null;
}

interface PaginatedDocuments {
    data: AdminDocument[];
    current_page: number;
    last_page: number;
    total: number;
}

const TYPE_LABELS: Record<string, string> = {
    gst_certificate: "GST Certificate",
    pan_card: "PAN Card",
    aadhar_card: "Aadhar Card",
    business_license: "Business License",
    tax_record: "Tax Record",
    identity_proof: "Identity Proof",
    other: "Other",
};

const TABS: { id: "all" | DocStatus; label: string }[] = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
];

function StatusBadge({ status }: { status: DocStatus }) {
    const styles: Record<DocStatus, string> = {
        pending: "bg-amber-50 text-amber-700 border-amber-200",
        approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
        rejected: "bg-red-50 text-red-700 border-red-200",
    };
    return (
        <span className={`rounded-full border px-2.5 py-1 text-xs font-medium capitalize ${styles[status]}`}>
            {status}
        </span>
    );
}

export default function DocumentsReview() {
    const [tab, setTab] = useState<"all" | DocStatus>("pending");
    const [documents, setDocuments] = useState<AdminDocument[] | null>(null);
    const [error, setError] = useState("");
    const [busyId, setBusyId] = useState<number | null>(null);
    const [rejectingId, setRejectingId] = useState<number | null>(null);
    const [rejectNotes, setRejectNotes] = useState("");

    const load = useCallback(async () => {
        setError("");
        try {
            const query = tab === "all" ? "" : `?status=${tab}`;
            const res = await adminApiRequest<{ success: boolean; data: PaginatedDocuments }>(
                `/documents${query}`
            );
            setDocuments(res.data.data);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Failed to load documents.");
            setDocuments([]);
        }
    }, [tab]);

    useEffect(() => {
        setDocuments(null);
        load();
    }, [load]);

    async function handleApprove(doc: AdminDocument) {
        setBusyId(doc.id);
        try {
            await adminApiRequest(`/documents/${doc.id}/approve`, { method: "PATCH" });
            await load();
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Failed to approve document.");
        } finally {
            setBusyId(null);
        }
    }

    async function handleReject(doc: AdminDocument) {
        setBusyId(doc.id);
        try {
            await adminApiRequest(`/documents/${doc.id}/reject`, {
                method: "PATCH",
                body: { notes: rejectNotes || undefined },
            });
            setRejectingId(null);
            setRejectNotes("");
            await load();
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Failed to reject document.");
        } finally {
            setBusyId(null);
        }
    }

    async function handleView(doc: AdminDocument) {
        try {
            await openAdminFile(`/documents/${doc.id}`);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Failed to open document.");
        }
    }

    return (
        <div className="p-6 sm:p-10">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Identity & Legal Documents</h1>
                    <p className="mt-1 text-sm text-slate-500">
                        Review Aadhar, PAN, and other documents sellers submit for verification.
                    </p>
                </div>
                <button
                    onClick={load}
                    className="flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100"
                >
                    <RefreshCw size={16} />
                    Refresh
                </button>
            </div>

            <div className="mt-6 flex gap-2 border-b border-slate-200">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        onClick={() => setTab(t.id)}
                        className={`-mb-px border-b-2 px-4 py-2.5 text-sm font-medium transition-colors ${
                            tab === t.id
                                ? "border-[#0057D9] text-[#0057D9]"
                                : "border-transparent text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {error && (
                <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
                    {error}
                </p>
            )}

            <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200">
                {documents === null ? (
                    <div className="flex items-center justify-center gap-2 py-16 text-slate-400">
                        <Loader2 size={20} className="animate-spin" />
                        Loading documents...
                    </div>
                ) : documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-slate-400">
                        <FileText size={28} />
                        <p className="text-sm">No documents in this view.</p>
                    </div>
                ) : (
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                            <tr>
                                <th className="px-5 py-3">Company</th>
                                <th className="px-5 py-3">Document</th>
                                <th className="px-5 py-3">Uploaded</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {documents.map((doc) => (
                                <Fragment key={doc.id}>
                                    <tr key={doc.id} className="text-slate-700">
                                        <td className="px-5 py-4 font-medium text-slate-900">
                                            {doc.company?.name ?? `Company #${doc.company_id}`}
                                        </td>
                                        <td className="px-5 py-4">
                                            <p>{TYPE_LABELS[doc.type] ?? doc.type}</p>
                                            <p className="text-xs text-slate-400">{doc.original_name}</p>
                                        </td>
                                        <td className="px-5 py-4 text-slate-500">
                                            {new Date(doc.created_at).toLocaleDateString()}
                                        </td>
                                        <td className="px-5 py-4">
                                            <StatusBadge status={doc.status} />
                                            {doc.status === "rejected" && doc.notes && (
                                                <p className="mt-1 max-w-[200px] text-xs text-slate-400">{doc.notes}</p>
                                            )}
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleView(doc)}
                                                    className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                                                >
                                                    <Eye size={14} />
                                                    View
                                                </button>

                                                {doc.status === "pending" && (
                                                    <>
                                                        <button
                                                            onClick={() => handleApprove(doc)}
                                                            disabled={busyId === doc.id}
                                                            className="flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 disabled:opacity-60"
                                                        >
                                                            <CheckCircle2 size={14} />
                                                            Approve
                                                        </button>
                                                        <button
                                                            onClick={() =>
                                                                setRejectingId(rejectingId === doc.id ? null : doc.id)
                                                            }
                                                            disabled={busyId === doc.id}
                                                            className="flex items-center gap-1.5 rounded-lg bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100 disabled:opacity-60"
                                                        >
                                                            <XCircle size={14} />
                                                            Reject
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </td>
                                    </tr>

                                    {rejectingId === doc.id && (
                                        <tr key={`${doc.id}-reject`} className="bg-red-50/40">
                                            <td colSpan={5} className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <input
                                                        type="text"
                                                        value={rejectNotes}
                                                        onChange={(e) => setRejectNotes(e.target.value)}
                                                        placeholder="Reason for rejection (optional)"
                                                        className="w-full max-w-md rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-4 focus:ring-red-100"
                                                    />
                                                    <button
                                                        onClick={() => handleReject(doc)}
                                                        disabled={busyId === doc.id}
                                                        className="rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700 disabled:opacity-60"
                                                    >
                                                        Confirm Reject
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setRejectingId(null);
                                                            setRejectNotes("");
                                                        }}
                                                        className="text-xs font-medium text-slate-500 hover:text-slate-700"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </Fragment>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}
