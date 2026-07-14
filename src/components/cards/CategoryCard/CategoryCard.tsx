import { LucideIcon } from "lucide-react";

interface Props {
    title: string;
    icon: LucideIcon;
}

export default function CategoryCard({
    title,
    icon: Icon,
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
        h-12
        w-12
        rounded-full
        bg-gray-100
        flex
        items-center
        justify-center
        transition
        group-hover:bg-[#0B2C6B]
        "
            >
                <Icon
                    size={24}
                    className="text-[#0B2C6B] group-hover:text-white"
                />
            </div>

            <p className="mt-4 text-sm font-medium text-[#222]">
                {title}
            </p>
        </div>
    );
}