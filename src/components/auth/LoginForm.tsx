"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
} from "lucide-react";

export default function LoginForm({ onSwitch }: { onSwitch?: () => void }) {

    const [showPassword, setShowPassword] = useState(false);

    const field = (i: number) => ({
        opacity: 0,
        animation: "riseIn 500ms ease forwards",
        animationDelay: `${i * 60}ms`,
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

                <div className="mt-10" style={field(1)}>

                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Welcome back
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Sign in to access your Exbhex account.
                    </p>

                </div>

                <form className="mt-8 space-y-4">

                    <div style={field(2)}>

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

                    </div>

                    <div style={field(3)}>

                        <label className="text-sm font-medium text-slate-700">
                            Password
                        </label>

                        <div className="relative mt-1.5">

                            <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-slate-400">
                                <Lock size={18} />
                            </div>

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
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

                    <div className="flex items-center justify-between text-sm" style={field(4)}>

                        <label className="flex items-center gap-2 text-slate-600">

                            <input
                                type="checkbox"
                                className="h-4 w-4 rounded border-slate-300 text-[#0057D9] focus:ring-[#0057D9]"
                            />

                            Remember me

                        </label>

                        <Link
                            href="#"
                            className="font-medium text-[#0057D9] transition hover:text-[#0046b0]"
                        >
                            Forgot password?
                        </Link>

                    </div>

                    <button
                        className="h-11 w-full rounded-xl bg-[#0057D9] text-sm font-semibold text-white transition hover:bg-[#0046b0]"
                        style={field(5)}
                    >
                        Login to Exbhex →
                    </button>

                    <div className="flex items-center gap-4" style={field(6)}>

                        <div className="h-px flex-1 bg-slate-200" />

                        <span className="text-xs text-slate-400">
                            or continue with
                        </span>

                        <div className="h-px flex-1 bg-slate-200" />

                    </div>

                    <div className="grid grid-cols-2 gap-3" style={field(7)}>

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

                    <p className="text-center text-sm text-slate-500" style={field(8)}>
                        New to Exbhex?{" "}
                        <button
                            type="button"
                            onClick={onSwitch}
                            className="font-semibold text-[#0057D9] transition hover:text-[#0046b0]"
                        >
                            Create an account
                        </button>
                    </p>

                </form>

            </div>

            <div className="mt-10 flex justify-between text-xs text-slate-400">

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
