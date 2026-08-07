import ProductSlider from "./ProductSlider";

export default function TrendingProducts() {
    return (
        <section className="bg-gray-50 py-20">
            <div className="mx-auto max-w-7xl px-6">
                <div className="mb-8 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-500">
                            Discover our latest industrial products
                        </p>

                        <h2 className="text-3xl font-bold text-[#1F2937]">
                            Trending Products
                        </h2>
                    </div>

                    {/* <button className="rounded-full border px-5 py-2 text-gray-500 hover:bg-gray-100">
                        View All →
                    </button> */}
                </div>

                <ProductSlider />
            </div>
        </section>
    );
}