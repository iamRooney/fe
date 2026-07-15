export default function FooterTop() {
    return (
        <section className="relative overflow-hidden bg-[#0F3777] py-20">
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-10 px-6 text-center lg:flex-row lg:text-left">
                <div className="max-w-2xl">
                    <span className="inline-block rounded-full bg-orange-100 px-4 py-2 text-sm font-semibold text-orange-600">
                        Join Exbhex Today
                    </span>

                    <h2 className="mt-6 text-4xl font-bold leading-tight text-white">
                        Connect with Trusted Global Suppliers
                    </h2>

                    <p className="mt-4 text-lg text-blue-100">
                        Discover verified manufacturers, compare products,
                        and grow your business through Exbhex's global B2B
                        marketplace.
                    </p>

                    <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
                        <button className="rounded-lg bg-orange-500 px-8 py-3 font-semibold text-white hover:bg-orange-600">
                            Start Sourcing
                        </button>

                        <button className="rounded-lg border border-white px-8 py-3 font-semibold text-white hover:bg-white hover:text-[#0F3777]">
                            Become a Supplier
                        </button>
                    </div>
                </div>

                <div className="hidden lg:block">
                    {/* Marketplace illustration */}
                </div>
            </div>
        </section>
    );
}