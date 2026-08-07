"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/api";
import { updateStoredUser, clearPendingRole, StoredUser } from "@/lib/auth";
import { uploadCompanyDocument } from "@/lib/api/documents";
import { BusinessTypeValue } from "./BusinessType";
import { IdentityDocsValue } from "./IdentityDocuments";

interface Props {
    name: string;
    email: string;
    role: "buyer" | "seller";
    business: BusinessTypeValue;
    profileImage: File | null;
    identityDocs?: IdentityDocsValue;
}

export default function ContinueButton({ name, email, role, business, profileImage, identityDocs }: Props) {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        if (role === "seller") {
            if (!business.companyName.trim()) {
                setError("Please enter your company name.");
                return;
            }
            if (!business.countryId || !business.stateId || !business.cityId) {
                setError("Please select your country, state, and city.");
                return;
            }
        }

        setError("");
        setLoading(true);

        try {
            const fields: Record<string, string> =
                role === "seller"
                    ? {
                        name,
                        email: email || "",
                        role,
                        company_name: business.companyName,
                        country_id: String(business.countryId),
                        state_id: String(business.stateId),
                        city_id: String(business.cityId),
                        website: business.website,
                        gst_number: business.gstNumber,
                        address: business.address,
                        years_in_business: business.yearsInBusiness,
                        description: business.description,
                    }
                    : {
                        name,
                        email: email || "",
                        role,
                    };

            let body: FormData | typeof fields = fields;

            if (profileImage) {
                const formData = new FormData();
                Object.entries(fields).forEach(([key, value]) => {
                    // Skip empty optional fields rather than sending "null" as a string
                    if (value !== "") formData.append(key, value);
                });
                formData.append("profile_image", profileImage);
                body = formData;
            }

            const res = await apiRequest<{ success: boolean; data: StoredUser }>(
                "/profile/complete",
                {
                    method: "POST",
                    body,
                    auth: true,
                }
            );

            updateStoredUser(res.data);
            clearPendingRole();

            // Identity docs can only be attached once the seller's company
            // exists, which /profile/complete just created above — so this
            // has to happen as a second step, not in the same request.
            // Best-effort: a failed doc upload shouldn't strand the user on
            // this screen after their profile was already created.
            if (role === "seller" && identityDocs) {
                const uploads: Promise<unknown>[] = [];
                if (identityDocs.aadhar) {
                    uploads.push(uploadCompanyDocument("aadhar_card", identityDocs.aadhar));
                }
                if (identityDocs.pan) {
                    uploads.push(uploadCompanyDocument("pan_card", identityDocs.pan));
                }
                if (uploads.length) {
                    const results = await Promise.allSettled(uploads);
                    const failed = results.some((r) => r.status === "rejected");
                    if (failed) {
                        console.error("One or more identity documents failed to upload", results);
                    }
                }
            }

            router.push(role === "seller" ? "/dashboard" : "/");
        } catch (err) {
            setError(
                err instanceof ApiError
                    ? err.message
                    : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-t border-slate-200 pt-8">

            {error && (
                <p className="mb-4 text-center text-sm font-medium text-red-500">{error}</p>
            )}

            <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 py-4 text-lg font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
            >
                {loading ? (
                    <>
                        <Loader2
                            size={22}
                            className="animate-spin"
                        />
                        Completing Registration...
                    </>
                ) : (
                    <>
                        Complete Registration
                        <ArrowRight size={22} />
                    </>
                )}
            </button>

            <p className="mt-4 text-center text-sm text-slate-500">
                Your business profile can be updated anytime
                from the dashboard settings.
            </p>

        </div>
    );
}