import Link from "next/link";
import { MapPin, BadgeCheck } from "lucide-react";

interface SupplierCardProps {
  name: string;
  slug: string;
  verified: boolean;
  location: string;
  yearsInBusiness: number | null;
  responseRate: number | null;
  annualTurnover: string | null;
  staffCount: number | null;
}

export default function SupplierCard({
  name,
  slug,
  verified,
  location,
  yearsInBusiness,
  responseRate,
  annualTurnover,
  staffCount,
}: SupplierCardProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <Link
          href={`/suppliers/${slug}`}
          className="text-2xl font-semibold text-gray-700 hover:text-blue-600"
        >
          {name}
        </Link>

        {verified && (
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <BadgeCheck size={14} />
            Verified Seller
          </span>
        )}
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <MapPin size={18} />
        <span>{location}</span>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-5 text-center">
          <h3 className="text-2xl font-bold text-blue-700">
            {yearsInBusiness ?? "—"}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Years in Business
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5 text-center">
          <h3 className="text-2xl font-bold text-blue-700">
            {responseRate !== null ? `${responseRate}%` : "—"}
          </h3>
          <p className="mt-2 text-sm text-gray-500">
            Response Rate
          </p>
        </div>
      </div>

      {/* Divider */}
      <hr className="my-6" />

      {/* Company Details */}
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">
            Annual Turnover
          </span>

          <span className="font-semibold text-gray-500">
            {annualTurnover ?? "Not disclosed"}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Staff Count
          </span>

          <span className="font-semibold text-gray-500">
            {staffCount ?? "Not disclosed"}
          </span>
        </div>
      </div>
    </div>
  );
}