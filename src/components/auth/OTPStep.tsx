"use client";

import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import OTPInput from "./OTPInput";
import { UserRole } from "@/lib/types";

interface Props {
    mode: "login" | "register";
    phone: string;
    role?: UserRole | null;
    onBack: () => void;
}

export default function OTPStep({ mode, phone, role, onBack }: Props) {
    const router = useRouter();

    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30);
    const [loading, setLoading] = useState(false);
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

        const otpValue = otp.join("");

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (otpValue !== "123456") {
            setError("Invalid OTP. Use 123456 for demo.");
            setLoading(false);
            return;
        }

        localStorage.setItem("token", "demo-token");

        if (mode === "register" && role) {
            localStorage.setItem("userRole", role);
        }

        setLoading(false);

        if (mode === "register") {
            router.push("/auth/complete-profile");
        } else {
            router.push("/dashboard");
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
                        onClick={() => {
                            setTimer(30);
                            setError("");
                            setOtp(["", "", "", "", "", ""]);
                        }}
                        className="font-semibold text-blue-600 hover:underline"
                    >
                        Resend OTP
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