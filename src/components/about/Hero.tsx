import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#072B66] via-[#0B4A96] to-[#0D7ED8] text-white">


            <div className="absolute left-6 top-6 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm font-medium text-white backdrop-blur-md transition-all duration-300 hover:bg-white/20"
                >
                    <ArrowLeft size={18} />
                    Back to Home
                </Link>
            </div>

            {/* Background Decorations */}
            <div className="absolute -top-40 -right-32 h-96 w-96 rounded-full bg-[#FFD54A]/20 blur-3xl" />
            <div className="absolute -bottom-40 -left-32 h-96 w-96 rounded-full bg-blue-400/10 blur-3xl" />

            <div className="mx-auto flex max-w-7xl flex-col items-center px-6 py-28 text-center lg:px-8">
                {/* <span className="rounded-full bg-white/10 px-5 py-2 text-sm font-medium backdrop-blur">
                    About Exbhex
                </span> */}

                <h1 className="mt-8 max-w-4xl text-5xl font-bold leading-tight md:text-6xl">
                    Connecting Businesses.
                    <br />
                    Creating Opportunities.
                </h1>

                <p className="mt-8 max-w-3xl text-lg leading-8 text-blue-100">
                    Exbhex is a modern B2B marketplace that helps manufacturers,
                    suppliers, exporters, service providers and buyers connect,
                    collaborate and grow together.
                </p>

                <div className="mt-10 flex flex-wrap justify-center gap-4">
                    <Link
                        href="/products"
                        className="rounded-xl bg-[#F7941E] px-8 py-4 font-semibold text-[#0B1F52] transition hover:scale-105"
                    >
                        Explore Products
                    </Link>

                    <Link
                        href="/register"
                        className="flex items-center gap-2 rounded-xl border border-white/30 px-8 py-4 transition hover:bg-white/10"
                    >
                        Register Company
                        <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
}