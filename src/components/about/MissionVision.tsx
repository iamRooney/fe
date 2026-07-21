import { Eye, Target } from "lucide-react";

export default function MissionVision() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mb-16 text-center">
                    <span className="font-semibold uppercase tracking-wider text-[#1D4ED8]">
                        Our Purpose
                    </span>

                    <h2 className="mt-4 text-4xl font-bold text-slate-900">
                        Mission & Vision
                    </h2>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl bg-white p-10 shadow-sm transition hover:shadow-xl">
                        <div className="mb-6 inline-flex rounded-2xl bg-blue-50 p-4">
                            <Target className="text-[#1D4ED8]" size={32} />
                        </div>

                        <h3 className="mb-5 text-3xl font-semibold text-slate-900">
                            Our Mission
                        </h3>

                        <p className="text-lg leading-8 text-slate-600">
                            To empower businesses through a trusted digital marketplace
                            that simplifies sourcing, encourages collaboration, and helps
                            organizations grow sustainably.
                        </p>
                    </div>

                    <div className="rounded-3xl bg-white p-10 shadow-sm transition hover:shadow-xl">
                        <div className="mb-6 inline-flex rounded-2xl bg-yellow-100 p-4">
                            <Eye className="text-[#D97706]" size={32} />
                        </div>

                        <h3 className="mb-5 text-3xl font-semibold text-slate-900">
                            Our Vision
                        </h3>

                        <p className="text-lg leading-8 text-slate-600">
                            To become one of the world's most trusted B2B ecosystems where
                            businesses of every size can connect, innovate, and thrive
                            without barriers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}