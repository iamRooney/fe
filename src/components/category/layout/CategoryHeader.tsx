export default function CategoryHeader() {
    return (
        <div className="mt-6 rounded-xl border border-gray-200 bg-white p-6">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                <div>
                    <h1 className="text-4xl font-bold text-[#0B2341]">
                        Arduino Development Boards
                    </h1>

                    <p className="mt-2 text-gray-500">
                        Showing <span className="font-semibold">4</span> Products
                    </p>
                </div>

                <select className="h-11 rounded-lg border border-gray-200 px-4 text-sm outline-none">
                    <option>Sort By</option>
                    <option>Newest</option>
                    <option>Price Low to High</option>
                    <option>Price High to Low</option>
                </select>
            </div>
        </div>
    );
}