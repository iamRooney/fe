import { ShieldCheck, Headphones } from "lucide-react";

export default function BenefitsCard() {
    return (
        <div className="relative h-full overflow-hidden rounded-md bg-[#123E84] p-8 text-white">
            {/* Decorative Circles */}
            <div className="absolute -bottom-16 -right-16 h-56 w-56 rounded-full border border-white/10"></div>

            <div className="absolute bottom-8 right-8 h-36 w-36 rounded-full border border-white/10"></div>

            <div className="relative z-10 flex h-full flex-col justify-center space-y-12">
                <div className="flex items-center gap-4">
                    <ShieldCheck size={34} />

                    <div>
                        <h3 className="text-3xl font-bold">1M+</h3>

                        <p className="text-xs uppercase tracking-widest text-white/70">
                            Verified Sellers
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Headphones size={34} />

                    <div>
                        <h3 className="text-3xl font-bold">24/7</h3>

                        <p className="text-xs uppercase tracking-widest text-white/70">
                            Procurement Support
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}