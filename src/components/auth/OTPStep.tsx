"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import OTPInput from "./OTPInput";
import { UserRole } from "@/lib/types";
import { apiRequest, ApiError } from "@/lib/api";
import { setAuthSession, setPendingRole, StoredUser } from "@/lib/auth";

interface Props {
    mode: "login" | "register";
    phone: string;
    role?: UserRole | null;
    onBack: () => void;
}

const OTP_LENGTH = 4;

export default function OTPStep({ mode, phone, role, onBack }: Props) {
    const router = useRouter();

    const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
    const [resending, setResending] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (timer === 0) return;
        const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const verify = otp.every((digit) => digit !== "");

    const handleVerify = async () => {
        if (!verify) return;

        setLoading(true);
        setError("");

        try {
            const res = await apiRequest<{
                success: boolean;
                data: { user: StoredUser; token: string };
            }>("/auth/verify-otp", {
                method: "POST",
                body: { phone, otp: otp.join("") },
            });

            const { user, token } = res.data;

            setAuthSession(token, user);

            if (mode === "register" && role) {
                setPendingRole(role);
            }

            if (!user.is_profile_completed) {
                router.push("/auth/complete-profile");
            } else if (user.role === "seller") {
                router.push("/dashboard");
            } else {
                router.push("/");
            }
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

    const handleResend = async () => {
        setError("");
        setResending(true);

        try {
            await apiRequest("/auth/send-otp", {
                method: "POST",
                body: { phone, mode },
            });
            setTimer(30);
            setOtp(Array(OTP_LENGTH).fill(""));
        } catch (err) {
            setError(
                err instanceof ApiError ? err.message : "Couldn't resend OTP."
            );
        } finally {
            setResending(false);
        }
    };

    return (
        <>
            <button
                onClick={onBack}
                className="mb-6 flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700"
            >
                <ArrowLeft size={16} />
                Back
            </button>

            <h2 className="text-center text-3xl font-bold text-slate-900">Verify OTP</h2>

            <p className="mt-3 text-center text-slate-500">
                Enter the verification code sent to
            </p>

            <p className="mt-1 text-center font-semibold text-slate-700">+91 {phone}</p>

            <p className="mb-8 mt-2 text-center text-sm text-blue-600">
                {mode === "register"
                    ? `Creating your Exbhex ${role ?? ""} account`
                    : "Signing you into Exbhex"}
            </p>

            <OTPInput value={otp} setValue={setOtp} />

            {error && (
                <p className="mt-4 text-center text-sm font-medium text-red-500">{error}</p>
            )}

            <button
                disabled={!verify || loading}
                onClick={handleVerify}
                className={`mt-8 w-full rounded-2xl py-4 font-semibold transition-all duration-300 ${verify && !loading
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "cursor-not-allowed bg-slate-200 text-slate-400"
                    }`}
            >
                {loading ? "Verifying..." : mode === "register" ? "Create Account" : "Login"}
            </button>

            <div className="mt-6 text-center">
                {timer === 0 ? (
                    <button
                        onClick={handleResend}
                        disabled={resending}
                        className="font-semibold text-blue-600 hover:underline disabled:opacity-50"
                    >
                        {resending ? "Resending..." : "Resend OTP"}
                    </button>
                ) : (
                    <p className="text-slate-500">
                        Resend OTP in{" "}
                        <span className="font-semibold">00:{timer.toString().padStart(2, "0")}</span>
                    </p>
                )}
            </div>
        </>
    );
}