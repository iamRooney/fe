"use client";

import CategorySelect from "./CategorySelect";

interface Props {
    value: string[];
    onChange: (value: string[]) => void;
}

export default function BuyerDetails({ value, onChange }: Props) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-slate-900">What are you sourcing?</h3>
            <p className="mt-1 text-sm text-slate-500">
                Select the categories you're interested in — this helps us match you with the right suppliers.
            </p>

            <div className="mt-6">
                <CategorySelect selected={value} onChange={onChange} multiple />
            </div>
        </div>
    );
}