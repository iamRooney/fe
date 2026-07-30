"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import LogoUploader from "./LogoUploader";
import BusinessType, { BusinessTypeValue } from "./BusinessType";
import BuyerDetails from "./BuyerDetails";
import ContinueButton from "./ContinueButton";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { getPendingRole } from "@/lib/auth";

export default function CompleteProfileCard() {
    const auth = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [business, setBusiness] = useState<BusinessTypeValue>({
        name: "",
        companyName: "",
        businessEmail: "",
        countryId: null,
        stateId: null,
        cityId: null,
    });
    const [interests, setInterests] = useState<string[]>([]);
    const [profileImage, setProfileImage] = useState<File | null>(null);

    // Still checking localStorage — avoid a flash of the wrong form
    if (auth === null) {
        return <div className="min-h-screen bg-slate-50" />;
    }

    // auth.role only gets set by the backend once profile-complete has
    // already succeeded once, so on first visit we fall back to the role
    // picked on the register screen (stored as "pendingRole").
    const role = auth.role ?? getPendingRole() ?? "buyer";
    const isSeller = role === "seller";

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-8 sm:py-12">
            <div className="flex items-center justify-center">
                <Link href="/" className="shrink-0">
                    <Image src="/logos/Logo.png" alt="Exbhex" width={200} height={42} priority className="h-auto w-[150px] sm:w-[200px]" />
                </Link>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mx-auto max-w-3xl rounded-3xl border border-slate-200 bg-white shadow-2xl"
            >
                <div className="p-6 sm:p-10">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-slate-900 sm:text-4xl">
                            {isSeller ? "Complete Your Business Profile" : "Complete Your Buyer Profile"}
                        </h1>
                        <p className="mt-3 text-sm text-slate-500 sm:text-base">
                            {isSeller
                                ? "Tell us about your business to unlock the full Exbhex marketplace."
                                : "Tell us what you're sourcing to get matched with the right suppliers."}
                        </p>
                    </div>

                    <div className="mt-8 sm:mt-10">
                        <LogoUploader file={profileImage} onChange={setProfileImage} />
                    </div>

                    {!isSeller && (
                        <div className="mt-8 sm:mt-10">
                            <h3 className="text-xl font-semibold text-slate-900">Your Details</h3>
                            <p className="mt-1 text-sm text-slate-500">
                                What should we call you?
                            </p>

                            <div className="mt-6 grid gap-6 md:grid-cols-2">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="e.g. Arjun Menon"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>

                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-700">
                                        Email <span className="font-normal text-slate-400">(optional)</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="mt-8 sm:mt-10">
                        {isSeller ? (
                            <BusinessType value={business} onChange={setBusiness} />
                        ) : (
                            <BuyerDetails value={interests} onChange={setInterests} />
                        )}
                    </div>

                    <div className="mt-8 sm:mt-10">
                        <ContinueButton
                            name={isSeller ? business.name : name}
                            email={isSeller ? business.businessEmail : email}
                            role={role}
                            business={business}
                            profileImage={profileImage}
                        />
                    </div>
                </div>
            </motion.div>
        </div>
    );
}