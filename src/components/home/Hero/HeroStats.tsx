const stats = [
    {
        number: "15M+",
        title: "Global Buyers",
    },
    {
        number: "2M+",
        title: "Verified Suppliers",
    },
    {
        number: "190+",
        title: "Countries",
    },
    {
        number: "24/7",
        title: "Trade Support",
    },
];

export default function HeroStats() {
    return (
        <div className="mt-10 grid grid-cols-2 gap-6 sm:mt-16 sm:gap-8 lg:grid-cols-4">

            {stats.map((item) => (
                <div key={item.title}>

                    <h2 className="text-2xl font-black text-white sm:text-3xl lg:text-4xl">
                        {item.number}
                    </h2>

                    <p className="mt-2 text-sm text-blue-200 sm:text-base">
                        {item.title}
                    </p>

                </div>
            ))}

        </div>
    );
}