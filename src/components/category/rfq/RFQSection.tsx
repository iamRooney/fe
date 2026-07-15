"use client";

export default function RFQSection() {
    return (
        <section className="rounded-md border border-gray-200 bg-white p-8">
            <h2 className="text-4xl font-bold text-[#153D7A]">
                Tell us what you need, and we'll help you get quotes
            </h2>

            <p className="mt-3 text-gray-500">
                Multiple quotes from verified suppliers within 24 hours.
            </p>

            <div className="mt-8 space-y-6">
                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                        I Want Quotes For *
                    </label>

                    <input
                        type="text"
                        placeholder="arduino electronic development board"
                        className="h-12 w-full rounded border border-gray-300 px-4 outline-none focus:border-blue-700 text-gray-500"
                    />
                </div>

                <div>
                    <label className="mb-2 block text-xs font-semibold uppercase tracking-wide text-gray-700">
                        Mobile Number *
                    </label>

                    <div className="flex">
                        <div className="flex h-12 items-center rounded-l border border-r-0 border-gray-300 bg-gray-100 px-4 text-gray-500">
                            +91
                        </div>

                        <input
                            type="text"
                            placeholder="Enter your mobile"
                            className="h-12 w-full rounded-r border border-gray-300 px-4 outline-none focus:border-blue-700 text-gray-500"
                        />
                    </div>
                </div>

                <button className="h-12 rounded bg-[#F7941D] px-10 font-semibold text-white hover:bg-orange-600">
                    Submit Requirement
                </button>
            </div>
        </section>
    );
}