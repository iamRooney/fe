import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  product: {
    name: string;
  };
}

export default function ProductBreadcrumb({
  product,
}: ProductBreadcrumbProps) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="rounded-xl border border-gray-200 bg-white px-6 py-4"
    >
      <ol className="flex flex-wrap items-center gap-2 text-sm">
        <li>
          <Link href="/" className="text-gray-500 hover:text-blue-600">
            Home
          </Link>
        </li>

        <ChevronRight size={16} className="text-gray-400" />

        <li>
          <Link href="/products" className="text-gray-500 hover:text-blue-600">
            Electronics
          </Link>
        </li>

        <ChevronRight size={16} className="text-gray-400" />

        <li>
          <Link href="/products" className="text-gray-500 hover:text-blue-600">
            Development Boards
          </Link>
        </li>

        <ChevronRight size={16} className="text-gray-400" />

        <li className="font-semibold text-gray-900">
          {product.name}
        </li>
      </ol>
    </nav>
  );
}