const stats = [
    {
        number: "1,000+",
        label: "Registered Companies",
    },
    {
        number: "15,000+",
        label: "Products",
    },
    {
        number: "500+",
        label: "Business Categories",
    },
    {
        number: "20+",
        label: "Countries",
    },
];

export default function Stats() {
    return (
        <section className="py-24 bg-white">

            <div className="max-w-7xl mx-auto px-6">

                <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">

                    {stats.map((stat) => (

                        <div
                            key={stat.label}
                            className="rounded-3xl bg-gradient-to-br from-blue-600 to-blue-800 text-white text-center p-10"
                        >

                            <h2 className="text-5xl font-bold">
                                {stat.number}
                            </h2>

                            <p className="mt-4 text-blue-100">
                                {stat.label}
                            </p>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}