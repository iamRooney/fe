import Link from "next/link";
import {
    Phone,
    Mail,
    Globe,
    MapPin,
    User,
    MessageCircle,
    Send,
} from "lucide-react";

interface Contact {
    person: string;
    phone: string;
    email: string;
    website: string;
    address: string;
}

interface SupplierSidebarProps {
    contact: Contact;
}

export default function SupplierSidebar({
    contact,
}: SupplierSidebarProps) {
    return (
        <div className="sticky top-24 space-y-6">
            {/* Contact Card */}
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900">
                    Contact Supplier
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                    Get in touch with the supplier directly.
                </p>

                <div className="mt-6 space-y-5">
                    <div className="flex items-start gap-3 text-[#0D3B7A]">
                        <User className="mt-1 text-primary" size={18} />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Contact Person
                            </p>
                            <p className="font-medium text-gray-900">
                                {contact.person}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#0D3B7A]">
                        <Phone className="mt-1 text-primary" size={18} />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Phone
                            </p>
                            <Link
                                href={`tel:${contact.phone}`}
                                className="font-medium text-gray-900 hover:text-primary"
                            >
                                {contact.phone}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#0D3B7A]">
                        <Mail className="mt-1 text-primary" size={18} />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Email
                            </p>
                            <Link
                                href={`mailto:${contact.email}`}
                                className="break-all font-medium text-gray-900 hover:text-primary"
                            >
                                {contact.email}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#0D3B7A]">
                        <Globe className="mt-1 text-primary" size={18} />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Website
                            </p>
                            <Link
                                href={`https://${contact.website}`}
                                target="_blank"
                                className="font-medium text-gray-900 hover:text-primary"
                            >
                                {contact.website}
                            </Link>
                        </div>
                    </div>

                    <div className="flex items-start gap-3 text-[#0D3B7A]">
                        <MapPin className="mt-1 text-primary" size={18} />
                        <div>
                            <p className="text-xs uppercase tracking-wide text-gray-400">
                                Address
                            </p>
                            <p className="font-medium text-gray-900">
                                {contact.address}
                            </p>
                        </div>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-8 space-y-3">
                    <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 font-semibold text-white transition hover:bg-primary/90">
                        <Send size={18} />
                        Contact Supplier
                    </button>

                    <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-green-500 px-5 py-3 font-semibold text-green-600 transition hover:bg-green-50">
                        <MessageCircle size={18} />
                        Message Supplier
                    </button>

                    {/* <button className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition hover:bg-gray-100">
                        <Phone size={18} />
                        Call Now
                    </button> */}
                </div>
            </div>

            {/* Trust Card */}
            {/* <div className="rounded-3xl border border-primary/20 bg-primary/5 p-6">
                <h4 className="font-semibold text-gray-900">
                    Why contact this supplier?
                </h4>

                <ul className="mt-4 space-y-3 text-sm text-gray-600">
                    <li>✅ Verified business profile</li>
                    <li>⚡ Fast response time</li>
                    <li>📦 Bulk order support</li>
                    <li>🤝 Trusted by business buyers</li>
                </ul>
            </div> */}
        </div>
    );
}