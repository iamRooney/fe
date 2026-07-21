import Link from "next/link";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function PolicyHero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#072B66] via-[#0B4A96] to-[#0D7ED8] text-white">

            {/* Background Decorations */}
            <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[#FFD54A]/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="relative mx-auto max-w-7xl px-6 py-20">

                {/* Back Button */}
                <Link
                    href="/"
                    className="mb-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur transition hover:bg-white/20"
                >
                    <ArrowLeft size={16} />
                    Back to Home
                </Link>

                {/* Badge
                <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur">
                    <ShieldCheck size={16} />
                    Legal Center
                </div> */}

                {/* Heading */}
                <h1 className="mt-6 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
                    Policies & Legal
                </h1>

                {/* Description */}
                <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
                    Welcome to Exbhex. These policies explain how our marketplace
                    operates, how we protect your information, and the responsibilities
                    of buyers and sellers using our B2B platform.
                </p>

                {/* Footer */}
                <div className="mt-10 flex flex-wrap items-center gap-3 text-sm text-blue-200">
                    <span>Last Updated: July 2026</span>
                    <span>•</span>
                    <span>Applies to all Exbhex users</span>
                </div>
            </div>
        </section>
    );
}