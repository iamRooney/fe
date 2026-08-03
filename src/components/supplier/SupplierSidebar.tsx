"use client";

import Link from "next/link";
import {
    Phone,
    Mail,
    Globe,
    MapPin,
    User,
    MessageCircle,
    Send,
    Lock,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

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
    const auth = useAuth();

    // auth === null means "still checking localStorage" — that is NOT the
    // same as logged-out. Treating them the same is what caused the
    // login-gate to flash on screen for logged-in users before flipping
    // over to the real contact details on every refresh.
    const isChecking = auth === null;
    const isLoggedIn = Boolean(auth?.isAuthenticated);

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

                {isChecking ? (
                    <div className="mt-6 animate-pulse space-y-5">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="flex items-start gap-3">
                                <div className="mt-1 h-[18px] w-[18px] rounded-full bg-gray-200" />
                                <div className="flex-1 space-y-2">
                                    <div className="h-3 w-20 rounded bg-gray-200" />
                                    <div className="h-4 w-32 rounded bg-gray-200" />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : isLoggedIn ? (
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
                ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 text-center">
                        <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                            <Lock size={18} className="text-gray-500" />
                        </div>

                        <p className="mt-3 text-sm font-medium text-gray-700">
                            Sign in to view contact details
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                            Phone, email, and address are only visible to registered buyers.
                        </p>

                        <div className="mt-4 flex items-center justify-center gap-3">
                            <Link
                                href="/auth/login"
                                className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/90"
                            >
                                Login
                            </Link>
                            <Link
                                href="/register"
                                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
                            >
                                Register
                            </Link>
                        </div>
                    </div>
                )}

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