import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star, BadgeCheck } from "lucide-react";

interface Supplier {
    id: number;
    name: string;
    slug: string;
    logo: string;
    location: string;
    rating: number;
    businessType: string;
    verified: boolean;
}

interface SimilarSuppliersProps {
    suppliers: Supplier[];
}

export default function SimilarSuppliers({
    suppliers,
}: SimilarSuppliersProps) {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                        Similar Suppliers
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Discover other trusted suppliers in this category.
                    </p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {suppliers.map((supplier) => (
                    <div
                        key={supplier.id}
                        className="group rounded-2xl border border-gray-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                    >
                        <div className="flex items-start gap-4">
                            <div className="relative h-16 w-16 overflow-hidden rounded-xl border bg-white">
                                <Image
                                    src={supplier.logo}
                                    alt={supplier.name}
                                    fill
                                    className="object-contain p-2"
                                />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="truncate font-semibold text-gray-900">
                                    {supplier.name}
                                </h3>

                                <div className="mt-2 flex flex-wrap gap-2">
                                    {supplier.verified && (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                                            <BadgeCheck size={12} />
                                            Verified
                                        </span>
                                    )}

                                    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                                        {supplier.businessType}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-5 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <Star
                                    size={16}
                                    className="fill-yellow-400 text-yellow-400"
                                />
                                <span>{supplier.rating}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <MapPin size={16} />
                                <span>{supplier.location}</span>
                            </div>
                        </div>

                        <Link
                            href={`/suppliers/${supplier.slug}`}
                            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary px-4 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white"
                        >
                            View Profile
                            <ArrowRight size={16} />
                        </Link>
                    </div>
                ))}
            </div>
        </section>
    );
}