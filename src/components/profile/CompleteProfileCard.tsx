"use client";

import { motion } from "framer-motion";
import LogoUploader from "./LogoUploader";
import BusinessTypeSelector from "./BusinessType";
import BuyerDetails from "./BuyerDetails";
import ContinueButton from "./ContinueButton";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

export default function CompleteProfileCard() {
    const auth = useAuth();

    // Still checking localStorage — avoid a flash of the wrong form
    if (auth === null) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    const role = auth.role ?? "buyer"; // fallback shouldn't normally hit if signup flow is intact
    const isSeller = role === "seller";

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4">
            <div className="flex items-center justify-center">
                <Link href="/" className="shrink-0">
                    <Image src="/logos/Logo.png" alt="Exbhex" width={200} height={42} priority />
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
                <div className="p-10">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold text-slate-900">
                            {isSeller ? "Complete Your Business Profile" : "Complete Your Buyer Profile"}
                        </h1>
                        <p className="mt-3 text-slate-500">
                            {isSeller
                                ? "Tell us about your business to unlock the full Exbhex marketplace."
                                : "Tell us what you're sourcing to get matched with the right suppliers."}
                        </p>
                    </div>

                    <div className="mt-10">
                        <LogoUploader />
                    </div>

                    <div className="mt-10">
                        {isSeller ? <BusinessTypeSelector /> : <BuyerDetails />}
                    </div>

                    <div className="mt-10">
                        <ContinueButton />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}