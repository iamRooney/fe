import { Eye, Mail, BadgeDollarSign } from "lucide-react";

interface ProductInfoProps {
  name: string;
  price: string | null;
  unit: string | null;
  shortDescription: string | null;
  views: number;
}

export default function ProductInfo({
  name,
  price,
  unit,
  shortDescription,
  views,
}: ProductInfoProps) {
  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Product Title */}
      <h1 className="text-4xl font-bold text-gray-900">{name}</h1>

      {shortDescription && (
        <p className="mt-3 text-gray-600">{shortDescription}</p>
      )}

      {/* Price & Views */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-orange-600">
            {price ? `₹${Number(price).toLocaleString()}` : "Contact for price"}
          </span>
          {price && unit && <span className="pb-1 text-gray-500">/ {unit}</span>}
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500">
          <Eye className="h-4 w-4" />
          <span>{views.toLocaleString()} views</span>
        </div>
      </div>

      <hr className="my-6" />

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4">
        <button className="flex items-center gap-2 rounded-lg bg-[#F89A1C] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#e88910]">
          <Mail className="h-5 w-5" />
          Contact Supplier
        </button>

        <button className="flex items-center gap-2 rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50">
          <BadgeDollarSign className="h-5 w-5" />
          Get Best Price
        </button>
      </div>
    </div>
  );
}