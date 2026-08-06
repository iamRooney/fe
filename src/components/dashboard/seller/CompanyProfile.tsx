"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/api";
import DocumentDropzone from "./DocumentDropzone";

interface MeWithCompany {
    id: number;
    name: string;
    company: {
        id: number;
        name: string;
        verified: boolean;
        gst_number: string | null;
    } | null;
}

export default function CompanyProfile() {
    const [me, setMe] = useState<MeWithCompany | null>(null);
    const [error, setError] = useState("");

    useEffect(() => {
        apiRequest<{ success: boolean; data: MeWithCompany }>("/me", { auth: true })
            .then((res) => setMe(res.data))
            .catch((err) => {
                setError(err instanceof ApiError ? err.message : "Couldn't load your company.");
            });
    }, []);

    const company = me?.company ?? null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Company Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
                Your company details and verification status.
            </p>

            {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

            {company && (
                <div
                    className={`mt-5 flex items-center gap-3 rounded-xl border px-5 py-4 ${company.verified
                        ? "border-green-200 bg-green-50"
                        : "border-amber-200 bg-amber-50"
                        }`}
                >
                    {company.verified ? (
                        <ShieldCheck className="h-5 w-5 shrink-0 text-green-600" />
                    ) : (
                        <ShieldAlert className="h-5 w-5 shrink-0 text-amber-600" />
                    )}
                    <div>
                        <p className="text-sm font-semibold text-slate-900">
                            {company.name} — {company.verified ? "Verified" : "Verification pending"}
                        </p>
                        <p className="mt-0.5 text-xs text-slate-500">
                            {company.verified
                                ? "Buyers can see your verified badge across the marketplace."
                                : "Upload your legal and tax documents below — our team reviews them and verifies your company."}
                        </p>
                    </div>
                </div>
            )}

            <div className="mt-6">
                <DocumentDropzone />
            </div>
        </div>
    );
}
