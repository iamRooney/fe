export default function PricingToggle() {
    return (
        <div className="flex justify-center mb-12">
            <div className="flex rounded-full bg-gray-100 p-1">
                <button className="rounded-full bg-[#163B82] px-6 py-2 text-white">
                    Monthly
                </button>

                <button className="rounded-full px-6 py-2 text-gray-600">
                    Yearly
                </button>
            </div>
        </div>
    );
}