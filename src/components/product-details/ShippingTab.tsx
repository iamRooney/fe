interface ShippingTabProps {
  dispatchLocation: string;
}

export default function ShippingTab({ dispatchLocation }: ShippingTabProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-gray-500">
        Shipping Information
      </h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Ships From
          </h4>

          <p className="mt-2 text-gray-600">
            {dispatchLocation}
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5">
          <h4 className="font-semibold text-gray-500">
            Lead Time
          </h4>

          <p className="mt-2 text-gray-600">
            Contact supplier for lead time
          </p>
        </div>

        <div className="rounded-lg bg-gray-50 p-5 col-span-2">
          <h4 className="font-semibold text-gray-500">
            Shipping Method
          </h4>

          <p className="mt-2 text-gray-600">
            Arranged with the supplier at the time of order.
          </p>
        </div>
      </div>
    </div>
  );
}