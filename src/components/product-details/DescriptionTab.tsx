interface DescriptionTabProps {
  description: string | null;
}

export default function DescriptionTab({ description }: DescriptionTabProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold text-gray-500">
          Product Overview
        </h2>

        <p className="mt-4 whitespace-pre-line leading-8 text-gray-600">
          {description ??
            "The seller hasn't added a detailed description for this product yet."}
        </p>
      </div>
    </div>
  );
}