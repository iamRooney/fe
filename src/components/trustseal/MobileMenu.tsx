"use client";

import Link from "next/link";

interface Props {
    open: boolean;
    onClose: () => void;
}

const links = [
    {
        name: "Benefits",
        href: "#benefits",
    },
    {
        name: "Pricing",
        href: "#pricing",
    },
    {
        name: "Reviews",
        href: "#reviews",
    },
    {
        name: "FAQs",
        href: "#faqs",
    },
];

export default function MobileMenu({
    open,
    onClose,
}: Props) {
    if (!open) return null;

    return (
        <div className="border-t bg-white md:hidden">
            <div className="flex flex-col p-6">

                {links.map((item) => (
                    <Link
                        key={item.name}
                        href={item.href}
                        onClick={onClose}
                        className="border-b py-4 text-gray-700"
                    >
                        {item.name}
                    </Link>
                ))}

            </div>
        </div>
    );
}