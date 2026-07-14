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
        <div className="mt-16 grid grid-cols-2 gap-8 lg:grid-cols-4">

            {stats.map((item) => (
                <div key={item.title}>

                    <h2 className="text-4xl font-black text-white">
                        {item.number}
                    </h2>

                    <p className="mt-2 text-blue-200">
                        {item.title}
                    </p>

                </div>
            ))}

        </div>
    );
}