const searches = [
    "arduino electronic development board",
    "arduino uno",
];

export default function RecommendedSearches() {
    return (
        <div className="space-y-2">
            {searches.map((item) => (
                <div
                    key={item}
                    className="rounded-full bg-gray-100 px-3 py-2 text-xs text-gray-700"
                >
                    {item}
                </div>
            ))}
        </div>
    );
}