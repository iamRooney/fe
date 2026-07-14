import { InputHTMLAttributes } from "react";
import clsx from "clsx";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export default function Input({
    label,
    className,
    ...props
}: Props) {
    return (
        <div className="space-y-2">

            {label && (
                <label className="text-sm font-medium text-gray-700">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={clsx(
                    "w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition",
                    "placeholder:text-gray-400",
                    "focus:border-[#F89A1C] focus:ring-4 focus:ring-orange-100",
                    className
                )}
            />

        </div>
    );
}