"use client";

const items = [
    {
        id: "privacy",
        label: "Privacy Policy",
    },
    {
        id: "buyer-policy",
        label: "Buyer Policy",
    },
    {
        id: "seller-policy",
        label: "Seller Policy",
    },
    {
        id: "terms",
        label: "Terms & Conditions",
    },
    {
        id: "refund",
        label: "Refund Policy",
    },
    {
        id: "cookies",
        label: "Cookie Policy",
    },
    {
        id: "contact",
        label: "Contact",
    },
];

export default function PolicySidebar() {
    return (
        <div className="sticky top-24 rounded-3xl border bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold text-[#0D3B7A]">Contents</h3>

            <nav className="space-y-2">
                {items.map((item) => (
                    <a
                        key={item.id}
                        href={`#${item.id}`}
                        className="block rounded-xl px-4 py-3 text-[#0D3B7A] transition hover:bg-primary hover:text-[#F7941E]"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>
        </div>
    );
}