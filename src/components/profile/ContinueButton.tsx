"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Loader2 } from "lucide-react";

export default function ContinueButton() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            // Fake API delay
            await new Promise((resolve) =>
                setTimeout(resolve, 1500)
            );

            // TODO:
            // Replace with Laravel API
            //
            // await axios.post("/api/profile", profile);

            router.push("/dashboard");
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="border-t border-slate-200 pt-8">

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