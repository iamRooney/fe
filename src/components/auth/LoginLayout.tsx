"use client";

import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import LoginHero from "./LoginHero";

export type AuthMode = "signin" | "signup";

export default function LoginLayout() {

    const [mode, setMode] = useState<AuthMode>("signin");

    return (
        <main className="min-h-screen bg-[#eef2ff] flex items-center justify-center p-5">

            <style>{`
                @keyframes riseIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes heroIn {
                    from { opacity: 0; transform: translateY(6px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>

            <div className="w-full max-w-5xl rounded-[24px] bg-white shadow-[0_20px_60px_rgba(0,0,0,.12)] overflow-hidden border border-slate-200 relative">

                {/* Mobile-only mode switcher, a small-scale echo of the sliding gate below */}
                <div className="lg:hidden flex justify-center pt-6">

                    <div className="relative flex w-64 rounded-full bg-slate-100 p-1">

                        <span
                            className="absolute inset-y-1 w-[calc(50%-4px)] rounded-full bg-white shadow-sm transition-transform duration-500 ease-[cubic-bezier(.65,0,.35,1)]"
                            style={{ transform: mode === "signin" ? "translateX(0%)" : "translateX(calc(100% + 8px))" }}
                        />

                        <button
                            type="button"
                            onClick={() => setMode("signin")}
                            className={`relative z-10 flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${mode === "signin" ? "text-slate-900" : "text-slate-400"}`}
                        >
                            Sign in
                        </button>

                        <button
                            type="button"
                            onClick={() => setMode("signup")}
                            className={`relative z-10 flex-1 rounded-full py-2 text-sm font-semibold transition-colors ${mode === "signup" ? "text-slate-900" : "text-slate-400"}`}
                        >
                            Sign up
                        </button>

                    </div>

                </div>

                <div className="relative lg:grid lg:grid-cols-2">

                    {/* Form pane: sits left by default, slides one column-width right for sign up */}
                    <div
                        className="w-full transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
                        style={{ transform: mode === "signin" ? "translateX(0%)" : "translateX(100%)" }}
                    >
                        {mode === "signin" ? (
                            <LoginForm key="signin" onSwitch={() => setMode("signup")} />
                        ) : (
                            <SignupForm key="signup" onSwitch={() => setMode("signin")} />
                        )}
                    </div>

                    {/* Hero pane: the sliding gate. Sits right by default, slides one column-width left for sign up. Desktop only. */}
                    <div
                        className="hidden lg:block transition-transform duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
                        style={{ transform: mode === "signin" ? "translateX(0%)" : "translateX(-100%)" }}
                    >
                        <LoginHero mode={mode} />
                    </div>

                </div>

            </div>

        </main>
    );
}
