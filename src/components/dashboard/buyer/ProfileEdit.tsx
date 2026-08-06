"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Loader2, CheckCircle2 } from "lucide-react";
import { apiRequest, ApiError } from "@/lib/api";
import { useAuth } from "@/hooks/useAuth";
import { updateStoredUser, StoredUser } from "@/lib/auth";

export default function ProfileEdit() {
    const auth = useAuth();
    const inputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (auth?.user) {
            setName(auth.user.name ?? "");
            setEmail(auth.user.email ?? "");
        }
    }, [auth?.user]);

    function handleFile(file: File | null) {
        setProfileImage(file);
        setPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return file ? URL.createObjectURL(file) : null;
        });
    }

    async function handleSave() {
        if (!name.trim() || saving) return;

        setSaving(true);
        setSaved(false);
        setError("");

        try {
            const fields: Record<string, string> = {
                name: name.trim(),
                email: email.trim(),
                role: "buyer",
            };

            let body: FormData | typeof fields = fields;
            if (profileImage) {
                const formData = new FormData();
                Object.entries(fields).forEach(([key, value]) => {
                    if (value !== "") formData.append(key, value);
                });
                formData.append("profile_image", profileImage);
                body = formData;
            }

            const res = await apiRequest<{ success: boolean; data: StoredUser }>(
                "/profile/complete",
                { method: "POST", body, auth: true }
            );

            updateStoredUser(res.data);
            setSaved(true);
        } catch (err) {
            setError(err instanceof ApiError ? err.message : "Couldn't save your changes.");
        } finally {
            setSaving(false);
        }
    }

    const avatarSrc = preview ?? auth?.user?.profile_image_url ?? null;

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Profile Edit</h1>
            <p className="mt-1 text-sm text-slate-500">Keep your details up to date.</p>

            <div className="mt-6 max-w-lg rounded-xl border border-slate-200 bg-white p-6">
                <div className="flex items-center gap-4">
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="group relative flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 hover:border-[#0057D9]"
                    >
                        {avatarSrc ? (
                            <Image src={avatarSrc} alt="Profile" fill unoptimized className="object-cover" />
                        ) : (
                            <Camera className="h-5 w-5 text-slate-400 group-hover:text-[#0057D9]" />
                        )}
                    </div>
                    <button
                        onClick={() => inputRef.current?.click()}
                        className="text-sm font-medium text-[#0057D9] hover:underline"
                    >
                        Change photo
                    </button>
                    <input
                        ref={inputRef}
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
                    />
                </div>

                <div className="mt-6 space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-600">Full Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/10"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-600">
                            Email <span className="font-normal text-slate-400">(optional)</span>
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm text-slate-700 outline-none focus:border-[#0057D9] focus:ring-2 focus:ring-[#0057D9]/10"
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-600">Phone</label>
                        <input
                            type="text"
                            value={auth?.user?.phone ?? ""}
                            disabled
                            className="w-full cursor-not-allowed rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-400"
                        />
                    </div>
                </div>

                {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

                <button
                    onClick={handleSave}
                    disabled={saving || !name.trim()}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0057D9] px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    {saving ? (
                        <>
                            <Loader2 className="h-4 w-4 animate-spin" />
                            Saving...
                        </>
                    ) : saved ? (
                        <>
                            <CheckCircle2 className="h-4 w-4" />
                            Saved
                        </>
                    ) : (
                        "Save changes"
                    )}
                </button>
            </div>
        </div>
    );
}
