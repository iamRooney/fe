import {
    Building2,
    Globe2,
    Handshake,
    ShieldCheck,
} from "lucide-react";

const highlights = [
    {
        icon: Building2,
        title: "Business Marketplace",
        description:
            "Connect manufacturers, suppliers, distributors and buyers on one trusted platform.",
    },
    {
        icon: Globe2,
        title: "Global Reach",
        description:
            "Expand your business network beyond geographical boundaries.",
    },
    {
        icon: Handshake,
        title: "Reliable Connections",
        description:
            "Build meaningful relationships with verified businesses and partners.",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Platform",
        description:
            "Designed to encourage transparency, trust and business growth.",
    },
];

export default function AboutSection() {
    return (
        <section className="bg-white py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                    <div>
                        <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                            Who We Are
                        </span>

                        <h2 className="mt-4 text-4xl font-bold text-slate-900">
                            Building the Future of B2B Commerce
                        </h2>

                        <p className="mt-8 text-lg leading-8 text-slate-600">
                            Exbhex brings businesses together through a modern digital
                            marketplace where products, services, and opportunities are
                            discovered effortlessly.
                        </p>

                        <p className="mt-6 text-lg leading-8 text-slate-600">
                            Whether you're looking to source products, promote your
                            business, or generate quality leads, Exbhex provides the
                            technology and tools to make it simple.
                        </p>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                        {highlights.map((item) => (
                            <div
                                key={item.title}
                                className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition hover:-translate-y-2 hover:shadow-xl"
                            >
                                <div className="mb-5 inline-flex rounded-2xl bg-blue-50 p-4">
                                    <item.icon className="text-[#1D4ED8]" size={30} />
                                </div>

                                <h3 className="mb-3 text-xl font-semibold text-slate-900">
                                    {item.title}
                                </h3>

                                <p className="leading-7 text-slate-600">
                                    {item.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}