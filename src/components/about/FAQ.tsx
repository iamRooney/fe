const faqs = [
    {
        q: "How do I register my company?",
        a: "Create an account and complete your company profile to start listing products and services."
    },
    {
        "q": "Is Exbhex free?",
        "a": "Yes! Exbhex offers a free plan to get started. For advanced features and a better experience, Premium starts at ₹999/month."
    },
    {
        q: "How do buyers contact suppliers?",
        a: "Buyers can use the RFQ system or contact information on verified business profiles."
    },
    {
        q: "Does Exbhex verify companies?",
        a: "We aim to verify business information to improve trust and reliability."
    }
];

export default function FAQ() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="max-w-5xl mx-auto px-6">
                <h2 className="text-center text-4xl font-bold mb-12 text-gray-500">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq) => (
                        <details
                            key={faq.q}
                            className="bg-white rounded-2xl p-6 shadow-sm"
                        >
                            <summary className="font-semibold cursor-pointer text-gray-500">
                                {faq.q}
                            </summary>

                            <p className="mt-4 text-slate-600 leading-7">
                                {faq.a}
                            </p>
                        </details>
                    ))}
                </div>
            </div>
        </section>
    );
}