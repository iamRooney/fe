import { LucideIcon } from "lucide-react";

interface StatCardProps {
    icon: LucideIcon;
    label: string;
    value: string;
}

export default function StatCard({ icon: Icon, label, value }: StatCardProps) {
    return (
        <div className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Icon className="h-4.5 w-4.5 text-[#0057D9]" />
            </div>
            <p className="mt-3 text-2xl font-semibold text-slate-900">{value}</p>
            <p className="text-sm text-slate-500">{label}</p>
        </div>
    );
}