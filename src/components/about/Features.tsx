import {
    Boxes,
    Building2,
    FileText,
    TrendingUp,
} from "lucide-react";

const features = [
    {
        icon: Boxes,
        title: "Product Marketplace",
        desc: "Explore products across hundreds of business categories."
    },
    {
        icon: Building2,
        title: "Business Directory",
        desc: "Discover trusted manufacturers, suppliers and exporters."
    },
    {
        icon: FileText,
        title: "RFQ System",
        desc: "Receive multiple quotations through one inquiry."
    },
    {
        icon: TrendingUp,
        title: "Business Growth",
        desc: "Generate leads and expand your digital presence."
    }
];

export default function Features() {
    return (
        <section className="py-24">
            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-16">
                    <p className="text-blue-600 font-semibold uppercase">
                        What We Do
                    </p>

                    <h2 className="text-4xl font-bold mt-4 text-gray-500">
                        Everything Businesses Need
                    </h2>
                </div>

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {features.map((feature) => (

                        <div
                            key={feature.title}
                            className="rounded-3xl border bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition text-gray-500"
                        >
                            <feature.icon
                                className="text-blue-600 mb-6"
                                size={36}
                            />

                            <h3 className="font-bold text-xl mb-3">
                                {feature.title}
                            </h3>

                            <p className="text-slate-600 leading-7">
                                {feature.desc}
                            </p>

                        </div>

                    ))}

                </div>

            </div>
        </section>
    );
}