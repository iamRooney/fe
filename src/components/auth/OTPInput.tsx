"use client";

import { useRef } from "react";

interface Props {
    value: string[];
    setValue: (value: string[]) => void;
}

export default function OTPInput({
    value,
    setValue,
}: Props) {
    const inputs = useRef<(HTMLInputElement | null)[]>([]);

    const handleChange = (
        index: number,
        digit: string
    ) => {
        if (!/^\d?$/.test(digit)) return;

        const updated = [...value];
        updated[index] = digit;

        setValue(updated);

        if (digit && index < value.length - 1) {
            inputs.current[index + 1]?.focus();
        }
    };

    return (
        <div className="flex justify-center gap-2 sm:gap-3">
            {value.map((digit, index) => (
                <input
                    key={index}
                    ref={(el) => {
                        inputs.current[index] = el;
                    }}
                    value={digit}
                    onChange={(e) =>
                        handleChange(index, e.target.value)
                    }
                    maxLength={1}
                    className="h-11 w-11 rounded-xl border text-center text-xl font-bold outline-none focus:border-blue-600 sm:h-14 sm:w-14 sm:text-2xl"
                />
            ))}
        </div>
    );
}