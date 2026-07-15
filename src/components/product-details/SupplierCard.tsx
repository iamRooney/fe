import { MapPin, BadgeCheck } from "lucide-react";

export default function SupplierCard() {
  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <h2 className="text-2xl font-semibold text-gray-500">
          Sana Technos
        </h2>

        <span className="flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
          <BadgeCheck size={14} />
          Verified Seller
        </span>
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-gray-500">
        <MapPin size={18} />
        <span>New Delhi, India</span>
      </div>

      {/* Stats */}
      <div className="mt-6 grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-gray-50 p-5 text-center">
          <h3 className="text-2xl font-bold text-blue-700">14</h3>
          <p className="mt-2 text-sm text-gray-500">
            Years in Business
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5 text-center">
          <h3 className="text-2xl font-bold text-blue-700">95%</h3>
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
            ₹50L - ₹1Cr
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-500">
            Staff Count
          </span>

          <span className="font-semibold text-gray-500">
            25 - 50 People
          </span>
        </div>
      </div>
    </div>
  );
}