import Link from "next/link";
import { ChevronRight } from "lucide-react";

const items = [
    { label: "Home", href: "/" },
    { label: "Kochi", href: "#" },
    { label: "Electronics", href: "#" },
    { label: "Arduino Development Board", href: "#" },
];

export default function Breadcrumb() {
    return (
        <nav className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            {items.map((item, index) => (
                <div key={item.label} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight size={12} />}

                    {index === items.length - 1 ? (
                        <span className="font-medium text-gray-700">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="hover:text-[#0B5FFF]"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}