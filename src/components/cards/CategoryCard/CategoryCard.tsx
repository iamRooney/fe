import { Boxes } from "lucide-react";
import Image from "next/image";

interface Props {
    title: string;
    iconUrl?: string | null;
    accent?: "navy" | "orange";
}

export default function CategoryCard({
    title,
    iconUrl,
    accent = "navy",
}: Props) {
    const wash =
        accent === "navy"
            ? "bg-gradient-to-br from-[#0D3B7A]/12 to-[#0D3B7A]/4"
            : "bg-gradient-to-br from-[#F7941E]/18 to-[#F7941E]/6";

    const iconColor =
        accent === "navy" ? "text-[#0D3B7A]" : "text-[#F7941E]";

    return (
        <div
            className="
                group
                relative
                flex
                h-[180px]
                cursor-pointer
                flex-col
                items-center
                justify-center
                gap-5
                overflow-hidden
                rounded-2xl
                border
                border-[#E7EAF0]
                bg-white
                px-4
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-[#0D3B7A]/30
                hover:shadow-[0_12px_28px_rgba(13,59,122,0.10)]
            "
        >
            <div
                className={`
                    relative
                    flex
                    h-24
                    w-24
                    shrink-0
                    items-center
                    justify-center
                    overflow-hidden
                    rounded-3xl
                    transition-all
                    duration-300
                    group-hover:scale-110
                    ${wash}
                `}
            >
                {iconUrl ? (
                    <Image
                        src={iconUrl}
                        alt={title}
                        fill
                        unoptimized
                        sizes="96px"
                        className="object-contain p-1"
                    />
                ) : (
                    <Boxes
                        size={40}
                        className={iconColor}
                    />
                )}
            </div>

            <h3 className="text-[17px] font-semibold text-[#1F2937] text-center leading-tight">
                {title}
            </h3>
        </div>
    );
}