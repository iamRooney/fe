import {
    UserPlus,
    Building2,
    Boxes,
    MessageSquare,
    TrendingUp,
} from "lucide-react";

const steps = [
    {
        icon: UserPlus,
        title: "Register",
    },
    {
        icon: Building2,
        title: "Create Profile",
    },
    {
        icon: Boxes,
        title: "List Products",
    },
    {
        icon: MessageSquare,
        title: "Receive Inquiries",
    },
    {
        icon: TrendingUp,
        title: "Grow Business",
    },
];

export default function HowItWorks() {
    return (
        <section className="py-24 bg-slate-50">

            <div className="max-w-7xl mx-auto px-6">

                <div className="text-center mb-20">

                    <p className="uppercase font-semibold text-blue-600">
                        How It Works
                    </p>

                    <h2 className="text-4xl font-bold mt-4 text-gray-500">
                        Start Growing in 5 Simple Steps
                    </h2>

                </div>

                <div className="grid md:grid-cols-5 gap-8">

                    {steps.map((step, index) => (

                        <div
                            key={step.title}
                            className="relative text-center text-gray-500"
                        >

                            <div className="w-24 h-24 rounded-full bg-blue-600 text-white mx-auto flex items-center justify-center">

                                <step.icon size={36} />

                            </div>

                            <div className="mt-6">

                                <div className="text-blue-600 font-bold">
                                    Step {index + 1}
                                </div>

                                <h3 className="font-semibold mt-2 text-lg">
                                    {step.title}
                                </h3>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}