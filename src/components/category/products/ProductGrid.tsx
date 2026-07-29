import ProductCard from "./ProductCard";
import { products } from "@/data/products";
import { ChevronDown } from "lucide-react";

export default function ProductGrid() {
    return (
        <section className="flex-1">
            <div className="mb-5 rounded-md border border-gray-200 bg-white p-5">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-[38px] font-bold text-[#0D274D]">
                            Arduino Development Boards
                        </h1>

                        <p className="mt-2 text-gray-500">
                            Showing{" "}
                            <span className="font-semibold">
                                {products.length}
                            </span>{" "}
                            Products
                        </p>
                    </div>

                    <button className="flex h-11 items-center gap-2 rounded border px-4 text-gray-500">
                        Sort By
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </section>
    );
}