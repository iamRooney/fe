import {
    Users,
    BadgeCheck,
    Globe2,
    Landmark,
} from "lucide-react";

interface Props {
    value: string;
    label: string;
    icon: string;
}

const icons = {
    users: Users,
    badge: BadgeCheck,
    globe: Globe2,
    dollar: Landmark,
};

export default function StatisticCard({
    value,
    label,
    icon,
}: Props) {
    const Icon = icons[icon as keyof typeof icons];

    return (
        <div className="flex flex-col items-center text-center">
            <div className="mb-3 rounded-full bg-white/10 p-3">
                <Icon className="h-6 w-6 text-[#FFA31A]" />
            </div>

            <h3 className="text-3xl font-bold text-white">
                {value}
            </h3>

            <p className="mt-1 text-sm text-blue-100">
                {label}
            </p>
        </div>
    );
}