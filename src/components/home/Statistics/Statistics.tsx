import StatisticCard from "./StatisticCard";
import { stats } from "./stats";

export default function Statistics() {
    return (
        <section className="bg-[#0F3777] py-12">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4">
                {stats.map((item) => (
                    <StatisticCard
                        key={item.id}
                        value={item.value}
                        label={item.label}
                        icon={item.icon}
                    />
                ))}
            </div>
        </section>
    );
}