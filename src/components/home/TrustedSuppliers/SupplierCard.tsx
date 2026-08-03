import Image from "next/image";
import Link from "next/link";
import {
  BadgeCheck,
  Star,
  Heart,
  Building2,
} from "lucide-react";

import { Supplier } from "./types";

interface Props {
  supplier: Supplier;
}

export default function SupplierCard({ supplier }: Props) {
  return (
    <div className="rounded-xl border bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl">
      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg border bg-gray-50">
            {supplier.logo ? (
              <Image
                src={supplier.logo}
                alt={supplier.company}
                fill
                unoptimized
                className="object-contain "
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-300">
                <Building2 size={24} />
              </div>
            )}
          </div>

          <div>
            <Link
              href={`/suppliers/${supplier.slug}`}
              className="font-semibold text-gray-500 hover:text-[#173F84] hover:underline"
            >
              <h3>{supplier.company}</h3>
            </Link>

            {supplier.rating !== undefined && (
              <div className="mt-1 flex items-center gap-2 text-sm">
                <span className="flex items-center text-yellow-500">
                  <Star size={14} fill="currentColor" />
                  {supplier.rating}
                </span>

                {supplier.reviews !== undefined && (
                  <span className="text-gray-400">
                    ({supplier.reviews})
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {supplier.verified && (
          <BadgeCheck
            className="text-green-500"
            size={20}
          />
        )}
      </div>

      {/* Description */}

      <p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
        {supplier.description}
      </p>

      {/* Footer */}

      <div className="mt-6 flex items-center justify-between">

        <Link
          href={`/suppliers/${supplier.slug}`}
          className="rounded-lg bg-[#173F84] px-5 py-2 text-sm font-semibold text-white transition hover:bg-[#0f2d62]"
        >
          Contact Supplier
        </Link>

        <button className="rounded-lg border p-2 transition hover:bg-red-500">
          <Heart size={18} />
        </button>
      </div>
    </div>
  );
}