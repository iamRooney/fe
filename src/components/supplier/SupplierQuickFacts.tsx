import {
    CalendarDays,
    Users,
    BadgeCheck,
    Activity,
    Clock3,
    MapPin,
} from "lucide-react";

interface Fact {
    label: string;
    value: string;
}

interface SupplierQuickFactsProps {
    facts: Fact[];
}

const iconMap: Record<string, React.ElementType> = {
    Established: CalendarDays,
    Employees: Users,
    GST: BadgeCheck,
    "Response Rate": Activity,
    "Reply Time": Clock3,
    Location: MapPin,
};

export default function SupplierQuickFacts({
    facts,
}: SupplierQuickFactsProps) {
    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Company Snapshot
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Key business information at a glance.
                </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 text-[#0D3B7A]">
                {facts.map((fact) => {
                    const Icon = iconMap[fact.label] ?? BadgeCheck;

                    return (
                        <div
                            key={fact.label}
                            className="group rounded-2xl border border-gray-200 bg-gray-50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:bg-white hover:shadow-lg"
                        >
                            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition group-hover:bg-primary group-hover:text-white text-shadow-gray-900">
                                <Icon size={22} />
                            </div>

                            <p className="text-sm text-gray-500">
                                {fact.label}
                            </p>

                            <h3 className="mt-2 text-xl font-bold text-gray-900">
                                {fact.value}
                            </h3>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}