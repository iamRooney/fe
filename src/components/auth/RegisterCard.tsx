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

    return (
        <section className="mx-auto w-full max-w-md">
            <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-white p-10 shadow-2xl">
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