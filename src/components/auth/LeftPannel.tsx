import {
    Building2,
    Boxes,
    Globe,
    ShieldCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
    {
        icon: Building2,
        title: "Verified Businesses",
    },
    {
        icon: Boxes,
        title: "15,000+ Products",
    },
    {
        icon: Globe,
        title: "Global Marketplace",
    },
    {
        icon: ShieldCheck,
        title: "Trusted Platform",
    },
];

export default function LeftPanel() {
    return (
        <section className="hidden w-[48%] lg:block">
            <div className="max-w-lg">

                <Link href="/" className="shrink-0">
                    <Image
                        src="/logos/Logo.png"
                        alt="Exbhex"
                        width={200}
                        height={42}
                        priority
                    />
                </Link>
                {/* <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
                    Welcome to Exbhex
                </span> */}

                <h1 className="mt-8 text-6xl font-extrabold leading-tight text-slate-900">
                    Grow Your Business
                </h1>

                <p className="mt-8 text-xl leading-9 text-slate-600">
                    Join manufacturers, suppliers, exporters and buyers
                    through one trusted B2B marketplace built for growth.
                </p>

                <div className="mt-14 grid grid-cols-2 gap-6">
                    {features.map((item) => (
                        <div
                            key={item.title}
                            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                        >
                            <item.icon className="mb-4 text-blue-600" size={32} />

                            <h3 className="font-semibold text-slate-800">
                                {item.title}
                            </h3>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}