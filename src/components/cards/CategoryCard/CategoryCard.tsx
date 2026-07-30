import { Boxes } from "lucide-react";
import Image from "next/image";

interface Props {
    title: string;
    iconUrl?: string | null;
}

export default function CategoryCard({
    title,
    iconUrl,
}: Props) {
    return (
        <div
            className="
      group
      bg-white
      border
      border-gray-200
      rounded-xl
      h-[130px]
      flex
      flex-col
      items-center
      justify-center
      cursor-pointer
      transition-all
      duration-300
      hover:-translate-y-1
      hover:shadow-lg
      "
        >
            <div
                className="
        relative
        h-12
        w-12
        overflow-hidden
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        transition
        group-hover:bg-[#0B2C6B]
        "
            >
                {iconUrl ? (
                    <Image
                        src={iconUrl}
                        alt={title}
                        fill
                        className="object-contain p-2"
                    />
                ) : (
                    <Boxes
                        size={24}
                        className="text-[#0B2C6B] group-hover:text-white"
                    />
                )}
            </div>

            <p className="mt-4 text-sm font-medium text-[#222]">
                {title}
            </p>
        </div>
    );
}