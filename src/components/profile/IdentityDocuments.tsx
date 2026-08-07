"use client";

import { useRef } from "react";
import { FileText, Upload, Trash2, CheckCircle2 } from "lucide-react";

export interface IdentityDocsValue {
    aadhar: File | null;
    pan: File | null;
}

interface Props {
    value: IdentityDocsValue;
    onChange: (value: IdentityDocsValue) => void;
}

interface DocSlotProps {
    label: string;
    hint: string;
    file: File | null;
    onSelect: (file: File | null) => void;
}

function DocSlot({ label, hint, file, onSelect }: DocSlotProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div className="rounded-2xl border border-slate-200 p-5">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-sm font-medium text-slate-700">{label}</p>
                    <p className="mt-0.5 text-xs text-slate-400">{hint}</p>
                </div>
                {file && <CheckCircle2 className="shrink-0 text-emerald-500" size={20} />}
            </div>

            <div
                onClick={() => inputRef.current?.click()}
                className="mt-4 flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center transition hover:border-blue-600 hover:bg-blue-50"
            >
                <FileText className="text-slate-400" size={26} />
                <p className="max-w-full truncate text-sm font-medium text-slate-600">
                    {file ? file.name : "Click to upload"}
                </p>
                <p className="text-xs text-slate-400">PDF, JPG or PNG • Max 5MB</p>
            </div>

            <input
                ref={inputRef}
                hidden
                type="file"
                accept="application/pdf,image/jpeg,image/png"
                onChange={(e) => {
                    const selected = e.target.files?.[0];
                    if (selected) onSelect(selected);
                }}
            />

            <div className="mt-3 flex justify-center">
                {file ? (
                    <button
                        onClick={() => {
                            onSelect(null);
                            if (inputRef.current) inputRef.current.value = "";
                        }}
                        className="flex items-center gap-2 rounded-xl border border-red-200 px-4 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={14} />
                        Remove
                    </button>
                ) : (
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                    >
                        <Upload size={14} />
                        Choose File
                    </button>
                )}
            </div>
        </div>
    );
}

export default function IdentityDocuments({ value, onChange }: Props) {
    return (
        <div>
            <h3 className="text-xl font-semibold text-slate-900">Identity Documents</h3>
            <p className="mt-1 text-sm text-slate-500">
                Upload your Aadhar and PAN card for identity verification.
            </p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <DocSlot
                    label="Aadhar Card"
                    hint="Government-issued identity proof"
                    file={value.aadhar}
                    onSelect={(file) => onChange({ ...value, aadhar: file })}
                />
                <DocSlot
                    label="PAN Card"
                    hint="Permanent Account Number card"
                    file={value.pan}
                    onSelect={(file) => onChange({ ...value, pan: file })}
                />
            </div>
        </div>
    );
}
