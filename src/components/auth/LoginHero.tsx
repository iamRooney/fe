import {
    Building2,
    Globe2,
    ShieldCheck,
    BadgeCheck,
    FileText,
    Clock3,
    Globe,
} from "lucide-react";
import type { AuthMode } from "./LoginLayout";

export default function LoginHero({ mode }: { mode: AuthMode }) {

    // The hero slides between the right side (sign in) and left side (sign up).
    // The diagonal edge always faces the form pane it's sliding past.
    const clipPath = mode === "signin"
        ? "polygon(56px 0, 100% 0, 100% 100%, 0 100%)"
        : "polygon(0 0, 100% 0, calc(100% - 56px) 100%, 0 100%)";

    return (
        <section
            className="relative h-full overflow-hidden bg-gradient-to-br from-[#003B95] via-[#0057D9] to-[#1E6FFF] p-10 text-white flex flex-col justify-center transition-[clip-path] duration-700 ease-[cubic-bezier(.65,0,.35,1)]"
            style={{ clipPath }}
        >

            {/* Background */}

            <div className="absolute inset-0">

                <div className="absolute -top-32 -left-20 h-96 w-96 rounded-full bg-white/5" />

                <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-white/5" />

            </div>

            <div className="relative z-10" key={mode} style={{ animation: "heroIn 500ms ease forwards" }}>

                {mode === "signin" ? (

                    <>

                        <h2 className="text-3xl font-bold leading-tight lg:text-4xl">

                            Connecting businesses.

                            <br />

                            Building futures

                            <span className="text-orange-400">.</span>

                        </h2>

                        <p className="mt-4 max-w-md text-sm text-blue-100">

                            India's trusted B2B marketplace connecting buyers,
                            manufacturers, suppliers and exporters worldwide.

                        </p>

                        <div className="mt-8 grid grid-cols-3 gap-4">

                            <Stat icon={<Building2 size={20} />} title="65K+" sub="Companies" />

                            <Stat icon={<Globe2 size={20} />} title="120+" sub="Countries" />

                            <Stat icon={<ShieldCheck size={20} />} title="100%" sub="Verified" />

                        </div>

                        <div className="mt-8 overflow-hidden rounded-xl border border-white/10 shadow-xl bg-white/5 p-4">

                            <div className="space-y-2">
                                <div className="h-2 w-3/4 rounded-full bg-white/20" />
                                <div className="h-2 w-1/2 rounded-full bg-white/15" />
                                <div className="mt-3 grid grid-cols-4 gap-2">
                                    <div className="h-12 rounded-lg bg-white/15" />
                                    <div className="h-12 rounded-lg bg-white/25" />
                                    <div className="h-12 rounded-lg bg-white/10" />
                                    <div className="h-12 rounded-lg bg-white/20" />
                                </div>
                            </div>

                        </div>

                        <div className="mt-6 flex items-center justify-center gap-4 text-xs text-blue-100">

                            <span className="flex items-center gap-1.5">
                                <BadgeCheck size={14} />
                                SSL secure
                            </span>

                            <span className="h-1 w-1 rounded-full bg-white/30" />

                            <span className="flex items-center gap-1.5">
                                <BadgeCheck size={14} />
                                Verified business
                            </span>

                            <span className="h-1 w-1 rounded-full bg-white/30" />

                            <span className="flex items-center gap-1.5">
                                <BadgeCheck size={14} />
                                24/7 support
                            </span>

                        </div>

                    </>

                ) : (

                    <>

                        <h2 className="text-3xl font-bold leading-tight lg:text-4xl">

                            Your storefront

                            <br />

                            starts here

                            <span className="text-orange-400">.</span>

                        </h2>

                        <p className="mt-4 max-w-md text-sm text-blue-100">

                            List products, post RFQs, and reach verified
                            buyers and suppliers across 120+ countries.

                        </p>

                        <div className="mt-8 space-y-3">

                            <Benefit icon={<FileText size={18} />} text="Post RFQs and get quotes within hours" />

                            <Benefit icon={<Clock3 size={18} />} text="Get your business verified in 24 hours" />

                            <Benefit icon={<Globe size={18} />} text="Reach 65,000+ companies worldwide" />

                        </div>

                        <div className="mt-8 grid grid-cols-3 gap-4">

                            <Stat icon={<Building2 size={20} />} title="65K+" sub="Companies" />

                            <Stat icon={<Globe2 size={20} />} title="120+" sub="Countries" />

                            <Stat icon={<ShieldCheck size={20} />} title="100%" sub="Verified" />

                        </div>

                    </>

                )}

            </div>

        </section>
    );
}

function Stat({
    icon,
    title,
    sub,
}: any) {
    return (
        <div className="rounded-xl bg-white/10 p-3 backdrop-blur-sm">

            <div className="mb-3 text-white/80">{icon}</div>

            <h3 className="text-xl font-bold">
                {title}
            </h3>

            <p className="text-xs text-blue-100">
                {sub}
            </p>

        </div>
    );
}

function Benefit({
    icon,
    text,
}: any) {
    return (
        <div className="flex items-center gap-3 rounded-xl bg-white/10 p-3 backdrop-blur-sm">

            <span className="text-white/80">{icon}</span>

            <p className="text-sm text-blue-50">{text}</p>

        </div>
    );
}
