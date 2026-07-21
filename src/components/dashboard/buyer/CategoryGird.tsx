import { Monitor, Zap, Briefcase, BarChart3, Truck, FlaskConical, Armchair, Car, LucideIcon } from "lucide-react";
import { CategorySuggestion } from "@/lib/types";

const iconMap: Record<string, LucideIcon> = {
    monitor: Monitor,
    zap: Zap,
    briefcase: Briefcase,
    "bar-chart": BarChart3,
    truck: Truck,
    flask: FlaskConical,
    armchair: Armchair,
    car: Car,
};

export default function CategoryGrid({ categories }: { categories: CategorySuggestion[] }) {
    return (
        <div className="flex items-start justify-between gap-2 overflow-x-auto rounded-xl border border-slate-200 bg-white px-4 py-6">
            {categories.map((c) => {
                const Icon = iconMap[c.icon] ?? Monitor;
                return (
                    <button
                        key={c.id}
                        type="button"
                        className="flex min-w-[80px] flex-col items-center gap-2 text-center transition-opacity hover:opacity-70"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100">
                            <Icon className="h-5 w-5 text-[#0057D9]" />
                        </div>
                        <p className="text-xs font-medium text-slate-700">{c.name}</p>
                    </button>
                );
            })}
        </div>
    );
}