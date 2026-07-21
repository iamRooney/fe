"use client";

import { ArrowLeft, ArrowRight, Smartphone } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface Props {
    mode: "login" | "register";
    phone: string;
    setPhone: (phone: string) => void;
    onProceed: () => void;
    onBack?: () => void;
}

export default function PhoneStep({
    mode,
    phone,
    setPhone,
    onProceed,
    onBack,
}: Props) {
    const valid = phone.length === 10;

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleProceed = async () => {
        if (!valid) return;

        setLoading(true);
        setError("");

        await new Promise((resolve) => setTimeout(resolve, 800));

        const existingUsers = ["7012991430", "9876543210"];
        const isExistingUser = existingUsers.includes(phone);

        if (mode === "login") {
            if (!isExistingUser) {
                setError("No account found with this mobile number.");
                setLoading(false);
                return;
            }
        }

        if (mode === "register") {
            if (isExistingUser) {
                setError("This mobile number is already registered. Please login.");
                setLoading(false);
                return;
            }
        }

        onProceed();
        setLoading(false);
    };

    return (
        <>
            {onBack && (
                <button
                    onClick={onBack}
                    className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
                >
                    <ArrowLeft size={16} />
                    Back
                </button>
            )}

            <div className="mb-8 flex justify-center">
                <div
                    className={`flex h-16 w-16 items-center justify-center rounded-2xl ${mode === "register" ? "bg-blue-100" : "bg-green-100"
                        }`}
                >
                    <Smartphone
                        className={mode === "register" ? "text-blue-600" : "text-green-600"}
                        size={32}
                    />
                </div>
            </div>

            <h2 className="text-center text-3xl font-bold text-slate-900">
                {mode === "register" ? "Create Account" : "Welcome Back"}
            </h2>

            <p className="mt-3 text-center leading-7 text-slate-500">
                {mode === "register"
                    ? "Join thousands of businesses on Exbhex."
                    : "Sign in to continue to your account."}
            </p>

            <div className="mt-10">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                    Mobile Number
                </label>

                <div className="flex overflow-hidden rounded-2xl border border-slate-300 transition focus-within:border-blue-600 focus-within:ring-2 focus-within:ring-blue-100">
                    <div className="flex items-center bg-slate-100 px-5 font-semibold text-slate-600">
                        +91
                    </div>

                    <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="9876543210"
                        className="flex-1 px-5 py-4 text-slate-700 outline-none"
                    />
                </div>

                {error && <p className="mt-3 text-sm font-medium text-red-500">{error}</p>}
            </div>

            <button
                disabled={!valid || loading}
                onClick={handleProceed}
                className={`mt-8 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition-all duration-300 ${valid && !loading
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
            >
                {loading ? "Checking..." : mode === "register" ? "Proceed" : "Continue"}
                <ArrowRight size={18} />
            </button>

            <p className="mt-8 text-center text-sm text-slate-500">
                {mode === "register" ? "Already have an account?" : "Don't have an account?"}{" "}
                <Link
                    href={mode === "register" ? "/auth/login" : "/auth/register"}
                    className="font-semibold text-blue-600 hover:underline"
                >
                    {mode === "register" ? "Login" : "Create Account"}
                </Link>
            </p>

            <p className="mt-6 text-center text-xs leading-6 text-slate-400">
                By continuing, you agree to Exbhex's Terms & Conditions and Privacy Policy.
            </p>
        </>
    );
}