"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, Upload, Trash2 } from "lucide-react";

export default function LogoUploader() {
    const inputRef = useRef<HTMLInputElement>(null);

    const [preview, setPreview] = useState<string | null>(null);

    const handleFile = (file: File) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setPreview(reader.result as string);
        };

        reader.readAsDataURL(file);
    };

    return (
        <div>

            <h3 className="text-lg font-semibold text-slate-900">
                Company Logo
            </h3>

            <p className="mt-1 text-sm text-slate-500">
                Upload your company logo.
            </p>

            <div className="mt-6 flex flex-col items-center">

                <div
                    onClick={() => inputRef.current?.click()}
                    className="group relative flex h-36 w-36 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-600 hover:bg-blue-50"
                >
                    {preview ? (
                        <Image
                            src={preview}
                            alt="Company Logo"
                            fill
                            className="object-cover"
                        />
                    ) : (
                        <div className="text-center">

                            <Camera
                                className="mx-auto text-slate-400 group-hover:text-blue-600"
                                size={34}
                            />

                            <p className="mt-2 text-sm font-medium text-slate-600">
                                Upload
                            </p>

                        </div>
                    )}
                </div>

                <input
                    ref={inputRef}
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];

                        if (file) {
                            handleFile(file);
                        }
                    }}
                />

                {preview ? (
                    <button
                        onClick={() => setPreview(null)}
                        className="mt-5 flex items-center gap-2 rounded-xl border border-red-200 px-5 py-2 text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={18} />
                        Remove Logo
                    </button>
                ) : (
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="mt-5 flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
                    >
                        <Upload size={18} />
                        Choose Image
                    </button>
                )}

                <p className="mt-3 text-xs text-slate-400">
                    PNG, JPG or SVG • Max 2MB
                </p>

            </div>

        </div>
    );
}