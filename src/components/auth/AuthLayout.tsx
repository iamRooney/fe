"use client";

import LeftPanel from "./LeftPannel";
import RegisterCard from "./RegisterCard";

interface Props {
    mode: "login" | "register";
}

export default function AuthLayout({
    mode,
}: Props) {
    return (
        <main className="relative min-h-screen overflow-hidden bg-slate-50">

            {/* Background */}
            <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-blue-500/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-yellow-400/20 blur-[120px]" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "linear-gradient(#0F172A 1px, transparent 1px), linear-gradient(90deg,#0F172A 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4 py-8 sm:px-6 sm:py-10 lg:justify-between">

                <LeftPanel />

                <RegisterCard mode={mode} />

            </div>

        </main>
    );
}