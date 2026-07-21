import Link from "next/link";

export default function CTA() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">
                <div className="rounded-[40px] bg-gradient-to-r from-blue-700 to-blue-900 text-white p-16 text-center">
                    <h2 className="text-5xl font-bold">
                        Ready to Grow Your Business?
                    </h2>

                    <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto">
                        Join Exbhex today and connect with manufacturers,
                        suppliers, buyers, and service providers through one
                        trusted marketplace.
                    </p>

                    <div className="mt-10 flex flex-wrap justify-center gap-5">
                        <Link
                            href="/register"
                            className="rounded-xl bg-[#F7941E] px-8 py-4 font-semibold text-slate-900 transition hover:scale-105"
                        >
                            Register Your Company
                        </Link>

                        <Link
                            href="/products"
                            className="rounded-xl border border-white/30 px-8 py-4 hover:bg-white/10 transition"
                        >
                            Explore Products
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}