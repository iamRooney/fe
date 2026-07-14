import Image from "next/image";
import { BadgeCheck, FileText } from "lucide-react";

interface Props {
    name: string;
    image: string;
    supplier: string;
    price: string;
    moq: string;
    verified: boolean;
    badge?: string;
}

export default function ProductCard({
    name,
    image,
    supplier,
    price,
    moq,
    verified,
    badge,
}: Props) {
    return (
        <div className="group w-[285px] overflow-hidden rounded-2xl border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">

            {/* IMAGE */}
            <div className="relative h-[190px] overflow-hidden">

                <Image
                    src={image}
                    alt={name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                />

                {badge && (
                    <span
                        className={`absolute left-3 top-3 rounded px-2 py-1 text-[10px] font-semibold text-white ${badge === "HOT DEAL"
                                ? "bg-sky-500"
                                : "bg-green-500"
                            }`}
                    >
                        {badge}
                    </span>
                )}
            </div>

            {/* CONTENT */}
            <div className="flex h-[205px] flex-col p-4">

                <h3 className="min-h-[52px] text-[20px] leading-7 font-medium text-[#333]">
                    {name}
                </h3>

                <p className="mt-2 text-[28px] font-bold text-[#F89A1C]">
                    {price}
                </p>

                <p className="mt-1 text-[15px] text-gray-500">
                    {moq}
                </p>

                <button
                    className="
          mt-auto
          flex
          items-center
          justify-center
          gap-2
          rounded-lg
          border
          border-green-500
          py-2.5
          text-green-600
          transition
          hover:bg-green-500
          hover:text-white
          "
                >
                    <FileText size={16} />
                    Get Quote
                </button>

            </div>
        </div>
    );
}