export default function Privacy() {
    return (
        <section className="bg-slate-50 py-24">
            <div className="max-w-6xl mx-auto px-6">
                <h2 className="text-4xl font-bold mb-10 text-gray-500">
                    Privacy Policy
                </h2>

                <div className="rounded-3xl bg-white p-10 shadow-sm">
                    <ul className="list-disc pl-5 space-y-5 text-slate-600 leading-8">
                        <li>We collect only the information required to operate the platform.</li>
                        <li>Your business information helps connect buyers and suppliers.</li>
                        <li>Personal information is protected using industry-standard security measures.</li>
                        <li>We do not sell your personal information to third parties.</li>
                        <li>Cookies are used to improve user experience and platform performance.</li>
                    </ul>
                </div>
            </div>
        </section>
    );
}