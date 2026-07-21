import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Reuse your existing ProductCard
import ProductCard from "../category/products/ProductCard";
import { Product } from "@/data/products";

interface SupplierProductsProps {
    products: Product[];
    supplierSlug: string;
}

export default function SupplierProducts({
    products,
    supplierSlug,
}: SupplierProductsProps) {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Featured Products
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Explore products offered by this supplier.
                    </p>
                </div>

                <Link
                    href={`/suppliers/${supplierSlug}/products`}
                    className="hidden items-center gap-2 font-medium text-primary hover:gap-3 md:flex"
                >
                    View All
                    <ArrowRight size={18} />
                </Link>
            </div>

            {products.length > 0 ? (
                <>
                    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.slice(0, 6).map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}
                    </div>

                    <div className="mt-8 flex justify-center md:hidden">
                        <Link
                            href={`/suppliers/${supplierSlug}/products`}
                            className="inline-flex items-center gap-2 rounded-xl border border-primary px-5 py-3 font-medium text-primary transition hover:bg-primary hover:text-white"
                        >
                            View All Products
                        </Link>
                    </div>
                </>
            ) : (
                <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gray-300">
                    <div className="text-center">
                        <h3 className="font-semibold text-gray-900">
                            No Products Available
                        </h3>

                        <p className="mt-2 text-sm text-gray-500">
                            This supplier hasn't added any products yet.
                        </p>
                    </div>
                </div>
            )}
        </section>
    );
}