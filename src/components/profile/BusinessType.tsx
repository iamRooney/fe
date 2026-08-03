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
import { apiRequest, ApiError } from "@/lib/api";

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

interface Country {
    id: number;
    name: string;
    code: string;
}

interface State {
    id: number;
    name: string;
    country_id: number;
}

interface City {
    id: number;
    name: string;
    state_id: number;
}

export interface BusinessTypeValue {
    name: string;
    companyName: string;
    businessEmail: string;
    countryId: number | null;
    stateId: number | null;
    cityId: number | null;
    website: string;
    gstNumber: string;
    address: string;
    yearsInBusiness: string;
    description: string;
}

interface Props {
    value: BusinessTypeValue;
    onChange: (value: BusinessTypeValue) => void;
}

export default function BusinessType({ value, onChange }: Props) {
    const [selectedType, setSelectedType] = useState("");

    const [countries, setCountries] = useState<Country[]>([]);
    const [states, setStates] = useState<State[]>([]);
    const [cities, setCities] = useState<City[]>([]);
    const [locationsError, setLocationsError] = useState("");

    useEffect(() => {
        let cancelled = false;

        async function loadLocations() {
            try {
                const [countryRes, stateRes, cityRes] = await Promise.all([
                    apiRequest<Country[]>("/countries"),
                    apiRequest<State[]>("/states"),
                    apiRequest<City[]>("/cities"),
                ]);

                if (cancelled) return;

                setCountries(countryRes);
                setStates(stateRes);
                setCities(cityRes);
            } catch (err) {
                if (cancelled) return;
                setLocationsError(
                    err instanceof ApiError
                        ? err.message
                        : "Couldn't load countries/states/cities."
                );
            }
        }

        loadLocations();
        return () => {
            cancelled = true;
        };
    }, []);

    const statesForCountry = states.filter(
        (s) => s.country_id === value.countryId
    );
    const citiesForState = cities.filter((c) => c.state_id === value.stateId);

    const update = (patch: Partial<BusinessTypeValue>) =>
        onChange({ ...value, ...patch });

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

                <p className="mt-1 text-sm text-slate-500">
                    Tell us about you and your business.
                </p>

                {locationsError && (
                    <p className="mt-2 text-sm font-medium text-red-500">
                        {locationsError}
                    </p>
                )}

                <div className="mt-6 grid gap-6 md:grid-cols-2 text-gray-500">

                    <Field
                        label="Your Name"
                        placeholder="e.g. Arjun Menon"
                        value={value.name}
                        onChange={(v) => update({ name: v })}
                    />

                    <Field
                        label="Company Name"
                        placeholder="ABC Industries"
                        value={value.companyName}
                        onChange={(v) => update({ companyName: v })}
                    />

                    <Field
                        label="Business Email"
                        type="email"
                        placeholder="info@company.com"
                        value={value.businessEmail}
                        onChange={(v) => update({ businessEmail: v })}
                    />

                    <SelectField
                        label="Country"
                        options={countries.map((c) => ({ id: c.id, label: c.name }))}
                        value={value.countryId}
                        onChange={(id) =>
                            update({ countryId: id, stateId: null, cityId: null })
                        }
                    />

                    <SelectField
                        label="State"
                        options={statesForCountry.map((s) => ({ id: s.id, label: s.name }))}
                        value={value.stateId}
                        onChange={(id) => update({ stateId: id, cityId: null })}
                        disabled={!value.countryId}
                    />

                    <SelectField
                        label="City"
                        options={citiesForState.map((c) => ({ id: c.id, label: c.name }))}
                        value={value.cityId}
                        onChange={(id) => update({ cityId: id })}
                        disabled={!value.stateId}
                    />

                    <Field
                        label="Website"
                        placeholder="https://www.company.com"
                        value={value.website}
                        onChange={(v) => update({ website: v })}
                    />

                    <Field
                        label="GST Number"
                        placeholder="22AAAAA0000A1Z5"
                        value={value.gstNumber}
                        onChange={(v) => update({ gstNumber: v })}
                    />

                    <Field
                        label="Years in Business"
                        type="number"
                        placeholder="e.g. 5"
                        value={value.yearsInBusiness}
                        onChange={(v) => update({ yearsInBusiness: v })}
                    />

                    <Field
                        label="Address"
                        placeholder="Street, building, area"
                        value={value.address}
                        onChange={(v) => update({ address: v })}
                    />

                </div>

                <div className="mt-6">

                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Company Description <span className="font-normal text-slate-400">(optional)</span>
                    </label>

                    <textarea
                        rows={4}
                        value={value.description}
                        onChange={(e) => update({ description: e.target.value })}
                        placeholder="Tell buyers what your company does..."
                        className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
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

interface SelectOption {
    id: number;
    label: string;
}

interface SelectProps {
    label: string;
    options: SelectOption[];
    value: number | null;
    onChange: (id: number | null) => void;
    disabled?: boolean;
}

function SelectField({
    label,
    options,
    value,
    onChange,
    disabled,
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

    const selected = options.find((o) => o.id === value);

    return (
        <div ref={containerRef} className="relative">

            <label className="mb-2 block text-sm font-medium text-slate-700">
                {label}
            </label>

            <button
                type="button"
                disabled={disabled}
                onClick={() => setOpen((prev) => !prev)}
                className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 text-left outline-none transition ${open
                    ? "border-blue-600 ring-4 ring-blue-100"
                    : "border-slate-300 hover:border-blue-300"
                    } ${disabled ? "cursor-not-allowed bg-slate-50 opacity-60" : ""}`}
            >

                <span className={selected ? "text-slate-900" : "text-slate-400"}>
                    {selected?.label ?? `Select ${label}`}
                </span>

                <ChevronDown
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 ${open ? "rotate-180 text-blue-600" : ""
                        }`}
                />

            </button>

            {open && !disabled && (
                <div className="absolute z-10 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-slate-200 bg-white p-1.5 shadow-lg">

                    {options.length === 0 && (
                        <p className="px-3 py-2.5 text-sm text-slate-400">
                            No options available
                        </p>
                    )}

                    {options.map((option) => {

                        const active = option.id === value;

                        return (

                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    onChange(option.id);
                                    setOpen(false);
                                }}
                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition ${active
                                    ? "bg-blue-50 text-blue-600 font-medium"
                                    : "text-slate-700 hover:bg-slate-50"
                                    }`}
                            >

                                {option.label}

                                {active && <Check size={16} />}

                            </button>

                        );

                    })}

                </div>
            )}

        </div>
    );
}