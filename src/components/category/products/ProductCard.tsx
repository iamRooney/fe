import Image from "next/image";
import { Phone, Mail, MapPin, ShieldCheck, Star } from "lucide-react";
import { Product } from "@/data/products";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <div className="overflow-hidden rounded-md border border-gray-200 bg-white">
            {/* Badge */}
            <div className="relative h-[170px] bg-white">
                {product.badge && (
                    <span className="absolute left-3 top-3 z-10 rounded-full bg-[#15448B] px-3 py-1 text-[10px] font-semibold uppercase text-white">
                        {product.badge}
                    </span>
                )}

                <div className="relative h-full w-full">
                    <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        unoptimized
                    />
                </div>
            </div>

            <div className="space-y-3 px-3 pb-3">
                {/* Product Name */}
                <h3 className="line-clamp-2 text-[15px] font-medium leading-5 text-gray-800">
                    {product.name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-2">
                    <span className="text-3xl font-bold text-[#15448B]">
                        {product.price}
                    </span>

                    <span className="pb-1 text-sm text-gray-500">
                        {product.moq}
                    </span>
                </div>

                {/* Contact Button */}
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded bg-[#15448B] text-sm font-semibold text-white hover:bg-[#10386F]">
                    <Mail size={16} />
                    Contact Supplier
                </button>

                <div className="border-t pt-3">
                    <div className="flex items-center justify-between">
                        <div>
                            <h4 className="font-semibold text-gray-800">
                                {product.supplier}
                            </h4>

                            <div className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                                <MapPin size={12} />
                                {product.location}
                            </div>
                        </div>

                        <ShieldCheck
                            size={18}
                            className="text-green-600"
                        />
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                        <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                    key={star}
                                    size={13}
                                    className="fill-orange-400 text-orange-400"
                                />
                            ))}
                        </div>

                        <span className="text-xs text-gray-500">
                            Verified Supplier
                        </span>
                    </div>
                </div>

                {/* Call Button */}
                <button className="flex h-10 w-full items-center justify-center gap-2 rounded border border-[#15448B] text-[#15448B] transition hover:bg-blue-50">
                    <Phone size={16} />
                    Call Now
                </button>
            </div>
        </div>
    );
}