import { ReactNode } from "react";

interface Props {
    id: string;
    title: string;
    children: ReactNode;
}

export default function PolicySection({
    id,
    title,
    children,
}: Props) {
    return (
        <section
            id={id}
            className="scroll-mt-28 rounded-3xl border bg-white p-10 shadow-sm"
        >
            <h2 className="mb-6 text-3xl font-bold">{title}</h2>

            <div className="prose prose-slate max-w-none">
                {children}
            </div>
        </section>
    );
}