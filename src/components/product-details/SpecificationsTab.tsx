interface SpecificationsTabProps {
  price: string | null;
  unit: string | null;
  categoryName: string | null;
}

export default function SpecificationsTab({
  price,
  unit,
  categoryName,
}: SpecificationsTabProps) {
  // The backend doesn't store structured technical specs yet, just the
  // fields below — so that's all this tab can honestly show for now.
  const specifications = [
    { label: "Category", value: categoryName ?? "Uncategorized" },
    {
      label: "Price",
      value: price ? `₹${Number(price).toLocaleString()}` : "Contact for price",
    },
    { label: "Unit", value: unit ?? "Not specified" },
  ];

  return (
    <div>
      <h2 className="mb-6 text-2xl font-semibold text-gray-500">
        Specifications
      </h2>

      <div className="overflow-hidden rounded-xl border text-gray-500">
        {specifications.map((item, index) => (
          <div
            key={item.label}
            className={`grid grid-cols-2 ${
              index !== specifications.length - 1
                ? "border-b"
                : ""
            }`}
          >
            <div className="bg-gray-50 px-6 py-4 font-medium">
              {item.label}
            </div>

            <div className="px-6 py-4">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}