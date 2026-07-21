"use client";

import { useState } from "react";
import CategorySelect from "./CategorySelect";

export default function BuyerDetails() {
    const [interests, setInterests] = useState<string[]>([]);

    return (
        <div className="space-y-10">
            <div>
                <h3 className="text-xl font-semibold text-slate-900">Company Details</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Tell suppliers a bit about your business.
                </p>

                <div className="mt-6 grid gap-6 md:grid-cols-2 text-gray-500">
                    <Field label="Company Name" placeholder="ABC Trading Co." />
                    <Field label="Business Email" type="email" placeholder="info@company.com" />
                    <Field label="Country" placeholder="India" />
                    <Field label="City" placeholder="Thrissur" />
                </div>
            </div>

            <div>
                <h3 className="text-xl font-semibold text-slate-900">What are you sourcing?</h3>
                <p className="mt-1 text-sm text-slate-500">
                    Select the categories you're interested in — this helps us match you with the right suppliers.
                </p>

                <div className="mt-6">
                    <CategorySelect selected={interests} onChange={setInterests} multiple />
                </div>
            </div>
        </div>
    );
}

interface FieldProps {
    label: string;
    placeholder: string;
    type?: string;
    value?: string;
    onChange?: (value: string) => void;
}

function Field({ label, placeholder, type = "text", value, onChange }: FieldProps) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange?.(e.target.value)}
                className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
        </div>
    );
}