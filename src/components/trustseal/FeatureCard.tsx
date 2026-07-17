import { LucideIcon } from "lucide-react";

interface Props {
    icon: LucideIcon;
    title: string;
    description: string;
    highlight: string;
}

export default function FeatureCard({
    icon: Icon,
    title,
    description,
    highlight,
}: Props) {
    return (
        <div
            className="
        bg-white
        rounded-2xl
        border
        p-8
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
        >
            <div
                className="
          w-14
          h-14
          rounded-xl
          bg-blue-50
          flex
          items-center
          justify-center
        "
            >
                <Icon className="text-[#163B82]" size={24} />
            </div>

            <h3 className="mt-6 text-xl font-semibold text-[#163B82]">
                {title}
            </h3>

            <p className="mt-4 text-gray-600 leading-7 text-sm">
                {description}
            </p>

            <p className="mt-6 text-[#163B82] font-medium text-sm">
                {highlight}
            </p>
        </div>
    );
}