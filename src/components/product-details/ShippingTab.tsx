export default function ShippingTab() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-500">
        Shipping Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Packaging
          </h4>

          <p className="mt-2 text-gray-600">
            Standard anti-static packaging.
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Lead Time
          </h4>

          <p className="mt-2 text-gray-600">
            3–5 Business Days
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Shipping Method
          </h4>

          <p className="mt-2 text-gray-600">
            Air, Road & Courier
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Dispatch Port
          </h4>

          <p className="mt-2 text-gray-600">
            New Delhi, India
          </p>
        </div>
      </div>
    </div>
  );
}