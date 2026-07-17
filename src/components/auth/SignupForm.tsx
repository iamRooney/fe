"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Lock,
    User,
    Building2,
    Eye,
    EyeOff,
    ShoppingBag,
    Store,
} from "lucide-react";

export default function SignupForm({ onSwitch }: { onSwitch?: () => void }) {

    const [showPassword, setShowPassword] = useState(false);
    const [role, setRole] = useState<"buyer" | "supplier">("buyer");

    const field = (i: number) => ({
        opacity: 0,
        animation: "riseIn 500ms ease forwards",
        animationDelay: `${i * 55}ms`,
    });

    return (
        <section className="flex h-full flex-col justify-between p-8 lg:p-12">

            <div>

                <Image
                    src="/images/Logo.png"
                    alt="Exbhex"
                    width={140}
                    height={34}
                    style={field(0)}
                />

                <div className="mt-8" style={field(1)}>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create your account
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Join 65,000+ verified businesses on Exbhex.
                    </p>

                </div>

                {/* Role toggle — a smaller-scale version of the same sliding motion as the hero gate */}
                <div className="relative mt-6 flex rounded-xl bg-slate-100 p-1" style={field(2)}>

                    <span
                        className="absolute inset-y-1 w-[calc(50%-4px)] rounded-lg bg-white shadow-sm transition-transform duration-400 ease-[cubic-bezier(.65,0,.35,1)]"
                        style={{ transform: role === "buyer" ? "translateX(0%)" : "translateX(calc(100% + 8px))" }}
                    />

                    <button
                        type="button"
                        onClick={() => setRole("buyer")}
                        className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${role === "buyer" ? "text-slate-900" : "text-slate-400"}`}
                    >
                        <ShoppingBag size={16} />
                        I'm buying
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("supplier")}
                        className={`relative z-10 flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition-colors ${role === "supplier" ? "text-slate-900" : "text-slate-400"}`}
                    >
                        <Store size={16} />
                        I'm supplying
                    </button>

                </div>

                <form className="mt-5 space-y-4">

                    <div className="grid grid-cols-2 gap-3" style={field(3)}>

                        <div>

                            <label className="text-sm font-medium text-slate-700">
                                Full name
                            </label>

                            <div className="relative mt-1.5">

                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    <User size={18} />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Alex Rivera"
                                    className="text-gray-500 h-12 w-full rounded-xl border border-slate-300 pl-12 pr-3 text-sm outline-none transition focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                        <div>

                            <label className="text-sm font-medium text-slate-700">
                                Company
                            </label>

                            <div className="relative mt-1.5">

                                <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                    <Building2 size={18} />
                                </div>

                                <input
                                    type="text"
                                    placeholder="Rivera Traders"
                                    className="text-gray-500 h-12 w-full rounded-xl border border-slate-300 pl-12 pr-3 text-sm outline-none transition focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                                />

                            </div>

                        </div>

                    </div>

                    {/* <div style={field(4)}>

                        <label className="text-sm font-medium text-slate-700">
                            Email address
                        </label>

                        <div className="relative mt-1.5">

                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <Mail size={18} />
                            </div>

                            <input
                                type="email"
                                placeholder="you@company.com"
                                className="text-gray-500 h-12 w-full rounded-xl border border-slate-300 pl-12 pr-4 text-sm outline-none transition focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                            />

                        </div>

                    </div> */}

                    <div style={field(5)}>

                        <label className="text-sm font-medium text-slate-700">
                            Phone Number
                        </label>

                        <div className="relative mt-1.5">

                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <Lock size={18} />
                            </div>

                            <input
                                type={showPassword ? "number" : ""}
                                placeholder="0987654321"
                                className="text-gray-500 h-12 w-full rounded-xl border border-slate-300 pl-12 pr-12 text-sm outline-none transition focus:border-[#0057D9] focus:ring-4 focus:ring-blue-100"
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                className="absolute inset-y-0 right-4 flex items-center text-slate-400 transition hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>

                        </div>

                    </div>

                    <label className="flex items-start gap-2 text-xs text-slate-500" style={field(6)}>

                        <input
                            type="checkbox"
                            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-[#0057D9] focus:ring-[#0057D9]"
                        />

                        <span>
                            I agree to Exbhex's{" "}
                            <Link href="#" className="font-medium text-[#0057D9] hover:text-[#0046b0]">Terms</Link>
                            {" "}and{" "}
                            <Link href="#" className="font-medium text-[#0057D9] hover:text-[#0046b0]">Privacy Policy</Link>
                        </span>

                    </label>

                    <button
                        className="h-11 w-full rounded-xl bg-[#0057D9] text-sm font-semibold text-white transition hover:bg-[#0046b0]"
                        style={field(7)}
                    >
                        Create account →
                    </button>

                    <div className="flex items-center gap-4" style={field(8)}>

                        <div className="h-px flex-1 bg-slate-200" />

                        <span className="text-xs text-slate-400">
                            or continue with
                        </span>

                        <div className="h-px flex-1 bg-slate-200" />

                    </div>

                    <div className="grid grid-cols-2 gap-3" style={field(9)}>

                        <button
                            type="button"
                            className="h-11 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-red-50"
                        >
                            Google
                        </button>

                        <button
                            type="button"
                            className="h-11 rounded-xl border border-slate-300 text-sm font-medium text-slate-700 transition hover:bg-blue-50"
                        >
                            Microsoft
                        </button>

                    </div>

                    <p className="text-center text-sm text-slate-500" style={field(10)}>
                        Already have an account?{" "}
                        <button
                            type="button"
                            onClick={onSwitch}
                            className="font-semibold text-[#0057D9] transition hover:text-[#0046b0]"
                        >
                            Sign in
                        </button>
                    </p>

                </form>

            </div>

            <div className="mt-8 flex justify-between text-xs text-slate-400">

                <span>
                    ©2026 Exbhex
                </span>

                <div className="flex gap-5">

                    <Link href="#" className="transition hover:text-slate-600">
                        Privacy
                    </Link>

                    <Link href="#" className="transition hover:text-slate-600">
                        Terms
                    </Link>

                </div>

            </div>

        </section>
    );
}
