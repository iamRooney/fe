import TestimonialCard from "./TestimonialCard";
import { testimonials } from "@/data/trustseal";

export default function Testimonials() {
    return (
        <>
            <div className="text-center">
                <h2 className="text-4xl font-bold text-[#163B82]">
                    Trusted by Businesses
                </h2>

                <p className="mt-4 text-gray-600">
                    Thousands of buyers use TrustSEAL every day.
                </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 text-gray-500">
                {testimonials.map((item) => (
                    <TestimonialCard
                        key={item.id}
                        {...item}
                    />
                ))}
            </div>
        </>
    );
}