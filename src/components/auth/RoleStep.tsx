"use client";

import { Store, ShoppingBag } from "lucide-react";
import { UserRole } from "@/lib/types";

interface Props {
    role: UserRole | null;
    setRole: (role: UserRole) => void;
    onProceed: () => void;
}

export default function RoleStep({ role, setRole, onProceed }: Props) {
    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-900">Create your account</h2>
            <p className="mt-1 text-sm text-slate-500">Tell us how you'll use Exbhex.</p>

            <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-6 text-center transition-colors ${
                        role === "buyer"
                            ? "border-[#0057D9] bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            role === "buyer" ? "bg-[#0057D9] text-white" : "bg-slate-100 text-slate-500"
                        }`}
                    >
                        <ShoppingBag className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">I'm a Buyer</p>
                    <p className="text-xs text-slate-500">Sourcing products from suppliers</p>
                </button>

                <button
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`flex flex-col items-center gap-2 rounded-2xl border px-4 py-6 text-center transition-colors ${
                        role === "seller"
                            ? "border-[#0057D9] bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                    }`}
                >
                    <div
                        className={`flex h-11 w-11 items-center justify-center rounded-full ${
                            role === "seller" ? "bg-[#0057D9] text-white" : "bg-slate-100 text-slate-500"
                        }`}
                    >
                        <Store className="h-5 w-5" />
                    </div>
                    <p className="text-sm font-medium text-slate-900">I'm a Seller</p>
                    <p className="text-xs text-slate-500">Listing products for buyers</p>
                </button>
            </div>

            <button
                type="button"
                disabled={!role}
                onClick={onProceed}
                className="mt-6 w-full rounded-xl bg-[#0057D9] py-3 text-sm font-medium text-white transition-opacity disabled:opacity-40"
            >
                Continue
            </button>
        </div>
    );
}