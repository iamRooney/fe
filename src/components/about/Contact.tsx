import { Mail, Phone, MapPin, Clock } from "lucide-react";

interface ContactProps {
    sectionId?: string;
}

export default function Contact({ sectionId = "contact" }: ContactProps) {
    return (
        <section
            id={sectionId}
            className="bg-white py-24 scroll-mt-24"
        >
            <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
                <div>
                    <p className="font-semibold uppercase text-blue-600">
                        Contact Us
                    </p>

                    <h2 className="text-4xl font-bold mt-3 text-gray-500">
                        We'd Love to Hear From You
                    </h2>

                    <div className="space-y-8 mt-10">
                        <div className="flex gap-4">
                            <MapPin className="text-blue-600" />
                            <div>
                                <h4 className="font-semibold text-gray-500">Office</h4>
                                <p className="text-slate-600">
                                    Thrissur, Kerala, India
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Mail className="text-blue-600" />
                            <div>
                                <h4 className="font-semibold text-gray-500">Email</h4>
                                <p className="text-slate-600">
                                    support@exbhex.com
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Phone className="text-blue-600" />
                            <div>
                                <h4 className="font-semibold text-gray-500">Phone</h4>
                                <p className="text-slate-600">
                                    +91 XXXXX XXXXX
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Clock className="text-blue-600" />
                            <div>
                                <h4 className="font-semibold text-gray-500">Working Hours</h4>
                                <p className="text-slate-600">
                                    Monday – Saturday · 9 AM – 6 PM IST
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <form className="rounded-3xl border p-8 shadow-sm space-y-5 text-gray-500">
                    <input
                        placeholder="Full Name"
                        className="w-full border rounded-xl px-4 py-3 text-gray-500"
                    />

                    <input
                        placeholder="Company"
                        className="w-full border rounded-xl px-4 py-3 text-gray-500"
                    />

                    <input
                        placeholder="Email"
                        className="w-full border rounded-xl px-4 py-3 text-gray-500"
                    />

                    <textarea
                        rows={5}
                        placeholder="Message"
                        className="w-full border rounded-xl px-4 py-3 text-gray-500"
                    />

                    <button className="bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition">
                        Send Message
                    </button>
                </form>
            </div>
        </section>
    );
}