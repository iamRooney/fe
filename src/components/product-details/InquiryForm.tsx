"use client";

import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { createEnquiry } from "@/lib/home";
import { ApiError } from "@/lib/api";

interface InquiryFormProps {
    companyId: number;
    productId: number;
}

export default function InquiryForm({ companyId, productId }: InquiryFormProps) {
    const [quantity, setQuantity] = useState(1);
    const [unit, setUnit] = useState("Pieces");
    const [message, setMessage] = useState("");
    const [name, setName] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [sent, setSent] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!message.trim()) {
            setError("Please add a short message for the supplier.");
            return;
        }

        setError("");
        setLoading(true);

        // The Enquiry model only stores a single message field, so fold the
        // buyer's contact context in below the note itself.
        const contactLines = [
            `Quantity required: ${quantity} ${unit}`,
            name && `Name: ${name}`,
            city && `City: ${city}`,
            phone && `Phone: ${phone}`,
            email && `Email: ${email}`,
        ].filter(Boolean);

        const fullMessage = `${message.trim()}\n\n${contactLines.join("\n")}`;

        try {
            await createEnquiry({
                company_id: companyId,
                product_id: productId,
                message: fullMessage,
            });
            setSent(true);
        } catch (err) {
            setError(
                err instanceof ApiError ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    if (sent) {
        return (
            <div className="rounded-xl border-2 bg-white p-6 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-green-500" />
                <h2 className="mt-3 text-xl font-semibold text-gray-700">Inquiry Sent</h2>
                <p className="mt-1 text-sm text-gray-500">
                    The supplier has received your enquiry. Track it anytime from
                    My Enquiries in your dashboard.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-xl border-2  bg-white p-6">
            <h2 className="text-2xl font-semibold text-gray-500">
                Send Inquiry to Supplier
            </h2>

            <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
                {/* Quantity */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        Quantity Required
                    </label>

                    <div className="flex items-center text-gray-500">
                        <input
                            type="number"
                            min={1}
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                            className="w-full rounded-l-lg border px-4 py-3 outline-none focus:text-blue-700"
                        />

                        <input
                            type="text"
                            value={unit}
                            onChange={(e) => setUnit(e.target.value)}
                            className="w-32 rounded-r-lg border border-l-0 bg-gray-50 px-4 py-3 text-center outline-none"
                        />
                    </div>
                </div>

                {/* Message */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        Your Message
                    </label>

                    <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-lg border p-4 outline-none focus:text-blue-700 text-gray-500"
                        placeholder="I am interested in this product. Please share the best quotation..."
                    />
                </div>

                {/* Name */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Your Name"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
                    />
                </div>

                {/* City */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        City
                    </label>

                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
                    />
                </div>

                {/* Phone */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+91 XXXXX XXXXX"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
                    />
                </div>

                {/* Email */}
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-500">
                        Contact Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="example@email.com"
                        className="w-full rounded-lg border px-4 py-3 outline-none focus:text-blue-700 text-gray-500"
                    />
                </div>

                {error && <p className="text-sm font-medium text-red-500">{error}</p>}

                {/* Submit */}
                <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#F89A1C] py-4 text-lg font-semibold text-white transition hover:bg-[#e88910] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send Inquiry Now"
                    )}
                </button>

                <p className="text-center text-xs text-gray-500">
                    By clicking submit, you agree to our Terms of Service and Privacy
                    Policy.
                </p>
            </form>
        </div>
    );
}
