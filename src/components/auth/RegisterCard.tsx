"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import RoleStep from "./RoleStep";
import PhoneStep from "./PhoneStep";
import OTPStep from "./OTPStep";
import { UserRole } from "@/lib/types";

interface Props {
    mode: "login" | "register";
}

type Step = "role" | "phone" | "otp";

export default function RegisterCard({ mode }: Props) {
    const [step, setStep] = useState<Step>(mode === "register" ? "role" : "phone");
    const [role, setRole] = useState<UserRole | null>(null);
    const [phone, setPhone] = useState("");
    // Email OTP login is a login-only alternative to phone (registration
    // still requires a phone number on the backend).
    const [loginMethod, setLoginMethod] = useState<"phone" | "email">("phone");
    const [email, setEmail] = useState("");

    return (
        <section className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-2xl sm:rounded-[32px] sm:p-10">
                <AnimatePresence mode="wait">
                    {step === "role" ? (
                        <motion.div
                            key={`${mode}-role`}
                            initial={{ x: 60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -60, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            <RoleStep
                                role={role}
                                setRole={setRole}
                                onProceed={() => setStep("phone")}
                            />
                        </motion.div>
                    ) : step === "phone" ? (
                        <motion.div
                            key={`${mode}-phone`}
                            initial={{ x: 60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -60, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            <PhoneStep
                                mode={mode}
                                phone={phone}
                                setPhone={setPhone}
                                loginMethod={loginMethod}
                                setLoginMethod={setLoginMethod}
                                email={email}
                                setEmail={setEmail}
                                onProceed={() => setStep("otp")}
                                onBack={mode === "register" ? () => setStep("role") : undefined}
                            />
                        </motion.div>
                    ) : (
                        <motion.div
                            key={`${mode}-otp`}
                            initial={{ x: 60, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -60, opacity: 0 }}
                            transition={{ duration: 0.35 }}
                        >
                            <OTPStep
                                mode={mode}
                                phone={phone}
                                loginMethod={loginMethod}
                                email={email}
                                role={role}
                                onBack={() => setStep("phone")}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}