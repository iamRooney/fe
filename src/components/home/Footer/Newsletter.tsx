export default function Newsletter() {
    return (
        <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
                Stay Updated
            </h3>

            <p className="mb-5 text-gray-300">
                Subscribe for marketplace news and product updates.
            </p>

            <div className="flex overflow-hidden rounded-lg bg-white">
                <input
                    placeholder="Email Address"
                    className="flex-1 px-4 py-3 text-black outline-none"
                />
            </div>
            <button className="rounded-lg bg-orange-500 font-semibold text-white hover:bg-orange-600 flex-1 px-4 py-3 flex overflow-hidden mt-2 ml-23">
                Subscribe
            </button>
        </div>
    );
}