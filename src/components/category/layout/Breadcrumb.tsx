import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
    return (
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
            {items.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                    {index > 0 && <ChevronRight size={14} />}

                    {index === items.length - 1 || !item.href ? (
                        <span className="font-medium text-gray-900">
                            {item.label}
                        </span>
                    ) : (
                        <Link
                            href={item.href}
                            className="transition hover:text-[#15448B]"
                        >
                            {item.label}
                        </Link>
                    )}
                </div>
            ))}
        </nav>
    );
}