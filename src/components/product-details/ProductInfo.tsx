import { Star, Mail, BadgeDollarSign } from "lucide-react";

export default function ProductInfo() {
  return (
    <div className="rounded-xl border bg-white p-6">
      {/* Product Title */}
      <h1 className="text-2xl font-bold text-gray-900 sm:text-4xl">
        Arduino Mega 2560 Electronic Development Board
      </h1>

      {/* Price & Rating */}
      <div className="mt-4 flex flex-wrap items-center gap-4">
        <div className="flex items-end gap-1">
          <span className="text-3xl font-bold text-orange-600">₹300</span>
          <span className="pb-1 text-gray-500">/ Piece</span>
        </div>

        <div className="flex items-center gap-1 text-sm">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-medium">4.8</span>
          <span className="text-gray-500">(124 Reviews)</span>
        </div>
      </div>

      <hr className="my-6" />

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
        <button className="flex items-center justify-center gap-2 rounded-lg bg-[#F89A1C] px-8 py-4 text-lg font-semibold text-white transition hover:bg-[#e88910]">
          <Mail className="h-5 w-5" />
          Contact Supplier
        </button>

        <button className="flex items-center justify-center gap-2 rounded-lg border-2 border-blue-600 px-8 py-4 text-lg font-semibold text-blue-600 transition hover:bg-blue-50">
          <BadgeDollarSign className="h-5 w-5" />
          Get Best Price
        </button>
      </div>
    </div>
  );
}