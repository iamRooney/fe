"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/api";
import { updateStoredUser, clearPendingRole, StoredUser } from "@/lib/auth";
import { BusinessTypeValue } from "./BusinessType";

interface Props {
    name: string;
    email: string;
    role: "buyer" | "seller";
    business: BusinessTypeValue;
    profileImage: File | null;
}

export default function ContinueButton({ name, email, role, business, profileImage }: Props) {
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

            router.push("/dashboard");
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