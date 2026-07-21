import {
    BadgeCheck,
    Search,
    ShieldCheck,
    Smartphone,
} from "lucide-react";

const items = [
    "Verified Businesses",
    "Advanced Product Search",
    "Secure Communication",
    "Modern User Experience",
    "Fast RFQ Process",
    "Mobile Friendly",
    "Growing Marketplace",
    "Reliable Business Network",
];

export default function WhyChoose() {
    return (
        <section className="bg-slate-50 py-24">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid lg:grid-cols-2 gap-20 items-center">

                    <div>

                        <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[40px] p-14 text-white">

                            {/* <Building2 size={120} /> */}

                            <h2 className="text-4xl font-bold mt-8">
                                Built for Modern Businesses
                            </h2>

                            <p className="mt-6 text-blue-100 text-lg leading-8">
                                Exbhex helps businesses connect,
                                source products and grow through
                                one intelligent marketplace.
                            </p>

                        </div>

                    </div>

                    <div>

                        <p className="uppercase font-semibold text-blue-600">
                            Why Exbhex
                        </p>

                        <h2 className="text-4xl font-bold mt-3 mb-10 text-gray-500">
                            Why Businesses Choose Us
                        </h2>

                        <div className="grid gap-6">

                            {items.map((item) => (

                                <div
                                    key={item}
                                    className="flex items-center gap-5 p-5 rounded-2xl bg-white shadow-sm text-gray-500"
                                >
                                    <BadgeCheck
                                        className="text-blue-600"
                                        size={28}
                                    />

                                    <span className="font-medium">
                                        {item}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}