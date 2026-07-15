const cities = [
    "Thrissur",
    "Kochi",
    "Coimbatore",
    "Chennai",
    "Hyderabad",
    "Pune",
    "Mumbai",
    "Nagpur",
    "Greater Noida",
];

export default function CityBar() {
    return (
        <div className="mt-5 flex gap-2 overflow-x-auto pb-2">
            {cities.map((city) => (
                <button
                    key={city}
                    className="whitespace-nowrap rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-600 transition hover:border-[#0B5FFF] hover:text-[#0B5FFF]"
                >
                    {city}
                </button>
            ))}
        </div>
    );
}