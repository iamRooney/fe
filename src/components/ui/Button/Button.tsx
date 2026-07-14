import { ReactNode } from "react";
import clsx from "clsx";

interface ButtonProps {
    children: ReactNode;
    variant?: "primary" | "secondary";
    className?: string;
    type?: "button" | "submit" | "reset";
}

export default function Button({
    children,
    variant = "primary",
    className,
    type = "button",
}: ButtonProps) {
    return (
        <button
            type={type}
            className={clsx(
                "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300",
                "active:scale-95",
                variant === "primary" &&
                "bg-[#F89A1C] px-6 py-3 text-white hover:-translate-y-1 hover:bg-[#ea8d13] hover:shadow-xl",

                variant === "secondary" &&
                "border border-white/30 bg-white/10 px-6 py-3 text-white backdrop-blur hover:bg-white hover:text-[#072B66]",

                className
            )}
        >
            {children}
        </button>
    );
}