interface Props {
    name: string;
    company: string;
    review: string;
}

export default function TestimonialCard({
    name,
    company,
    review,
}: Props) {
    return (
        <div className="rounded-2xl border bg-white p-8 shadow-sm hover:shadow-lg transition">
            <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#163B82] text-lg font-bold text-white">
                    {name.charAt(0)}
                </div>

                <div>
                    <h4 className="font-semibold">{name}</h4>
                    <p className="text-sm text-gray-500">{company}</p>
                </div>
            </div>

            <p className="mt-6 leading-7 text-gray-600">
                "{review}"
            </p>
        </div>
    );
}