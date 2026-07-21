"use client";

import { useEffect, useRef, useState } from "react";
import {
    Factory,
    Package,
    Globe2,
    BriefcaseBusiness,
    ChevronDown,
    Check,
} from "lucide-react";

const businessTypes = [
    {
        id: "manufacturer",
        title: "Manufacturer",
        icon: Factory,
    },
    {
        id: "supplier",
        title: "Supplier",
        icon: Package,
    },
    {
        id: "exporter",
        title: "Exporter",
        icon: Globe2,
    },
    {
        id: "service",
        title: "Service Provider",
        icon: BriefcaseBusiness,
    },
];

const categories = [
    "Industrial Machinery",
    "Construction",
    "Electrical",
    "Electronics",
    "Automobile",
    "Packaging",
    "Agriculture",
    "Healthcare",
    "Food Processing",
    "Chemicals",
    "Other",
];

export default function BusinessType() {
    const [selectedType, setSelectedType] = useState("");
    const [category, setCategory] = useState("");
    const [otherCategory, setOtherCategory] = useState("");

    return (
        <div className="space-y-10">

            {/* Business Type */}

            <div>

                <h3 className="text-xl font-semibold text-slate-900">
                    Business Type
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                    Select your primary business activity.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">

                    {businessTypes.map((item) => {

                        const Icon = item.icon;

                        const active =
                            selectedType === item.id;

                        return (

                            <button
                                key={item.id}
                                type="button"
                                onClick={() =>
                                    setSelectedType(item.id)
                                }
                                className={`rounded-2xl border p-6 text-left transition-all ${active
                                    ? "border-blue-600 bg-blue-50 shadow-md"
                                    : "border-slate-200 hover:border-blue-300 hover:shadow-sm"
                                    }`}
                            >

                                <Icon
                                    size={32}
                                    className={
                                        active
                                            ? "text-blue-600"
                                            : "text-slate-500"
                                    }
                                />

                                <h4 className="mt-4 font-semibold text-slate-900">
                                    {item.title}
                                </h4>

                            </button>

                        );

                    })}

                </div>

            </div>

            {/* Company Details */}

            <div>

                <h3 className="text-xl font-semibold text-slate-900">
                    Company Details
                </h3>

                <div className="mt-6 grid gap-6 md:grid-cols-2 text-gray-500">

                    <Field
                        label="Company Name"
                        placeholder="ABC Industries"
                    />

                    <Field
                        label="Business Email"
                        type="email"
                        placeholder="info@company.com"
                    />

                    <div className={category === "Other" ? "md:col-span-2 grid gap-6 md:grid-cols-2" : ""}>

                        <SelectField
                            label="Industry Category"
                            options={categories}
                            value={category}
                            onChange={(value) => {
                                setCategory(value);
                                if (value !== "Other") setOtherCategory("");
                            }}
                        />

                        {category === "Other" && (
                            <Field
                                label="Please specify"
                                placeholder="Describe your industry"
                                value={otherCategory}
                                onChange={setOtherCategory}
                            />
                        )}

                    </div>

                    <Field
                        label="GST Number"
                        placeholder="32ABCDE1234F1Z5"
                    />

                    <Field
                        label="Country"
                        placeholder="India"
                    />

                    <Field
                        label="State"
                        placeholder="Kerala"
                    />

                    <Field
                        label="City"
                        placeholder="Thrissur"
                    />

                    <Field
                        label="Website"
                        placeholder="https://company.com"
                    />

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

function Field({
    label,
    placeholder,
    type = "text",
    value,
    onChange,
}: FieldProps) {
    return (
        <div>

            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

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

interface SelectProps {
    label: string;
    options: string[];
    value: string;
    onChange: (value: string) => void;
}

function SelectField({
    label,
    options,
    value,
    onChange,
}: SelectProps) {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={containerRef} className="relative">

            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left outline-none transition ${open
                    ? "border-blue-600 ring-4 ring-blue-100"
                    : "border-slate-300 hover:border-blue-300"
                    }`}
            >

                <span className={value ? "text-slate-900" : "text-slate-400"}>
                    {value || "Select Category"}
                </span>

                <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : ""
                        }`}
                />

            </button>

            {open && (
                <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg">

                    {options.map((option) => {

                        const active = option === value;

                        return (

                            <button
                                key={option}
                                type="button"
                                onClick={() => {
                                    onChange(option);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${active
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-slate-700 hover:bg-slate-50"
                                    }`}
                            >

                                {option}

                                {active && <Check size={16} />}

                            </button>

                        );

                    })}

                </div>
            )}

        </div>
    );
}