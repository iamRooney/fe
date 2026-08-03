"use client";

import { useState } from "react";
import DescriptionTab from "./DescriptionTab";
import SpecificationsTab from "./SpecificationsTab";
import ShippingTab from "./ShippingTab";

const tabs = ["Description", "Specifications", "Shipping"] as const;

type Tab = (typeof tabs)[number];

interface ProductTabsProps {
  description: string | null;
  price: string | null;
  unit: string | null;
  categoryName: string | null;
  supplierLocation: string;
}

export default function ProductTabs({
  description,
  price,
  unit,
  categoryName,
  supplierLocation,
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div className="rounded-xl border bg-white">
      {/* Tab Header */}
      <div className="flex border-b">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 px-6 py-4 text-sm font-semibold transition ${
              activeTab === tab
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:bg-gray-50"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {activeTab === "Description" && (
          <DescriptionTab description={description} />
        )}
        {activeTab === "Specifications" && (
          <SpecificationsTab price={price} unit={unit} categoryName={categoryName} />
        )}
        {activeTab === "Shipping" && (
          <ShippingTab dispatchLocation={supplierLocation} />
        )}
      </div>
    </div>
  );
}