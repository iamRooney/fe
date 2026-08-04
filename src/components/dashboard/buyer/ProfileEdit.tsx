"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, Loader2, Trash2, Upload, User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest, ApiError } from "@/lib/api";
import { updateStoredUser, StoredUser } from "@/lib/auth";

function ProfileEditForm({ user }: { user: StoredUser }) {
    const inputRef = useRef<HTMLInputElement>(null);

    const [name, setName] = useState(user.name ?? "");
    const [email, setEmail] = useState(user.email ?? "");
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(user.profile_image_url ?? null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    function handleFile(selected: File) {
        setAvatarFile(selected);
        setSuccess(false);
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(selected);
    }

    function removePhoto() {
        setAvatarFile(null);
        setPreview(null);
        setSuccess(false);
        if (inputRef.current) inputRef.current.value = "";
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!name.trim()) {
            setError("Please enter your full name.");
            return;
        }

        setError("");
        setSuccess(false);
        setLoading(true);

        try {
            const fields: Record<string, string> = {
                name,
                email: email || "",
                role: "buyer",
            };

            let body: FormData | typeof fields = fields;

            if (avatarFile) {
                const formData = new FormData();
                Object.entries(fields).forEach(([key, value]) => {
                    if (value !== "") formData.append(key, value);
                });
                formData.append("profile_image", avatarFile);
                body = formData;
            }

            const res = await apiRequest<{ success: boolean; data: StoredUser }>(
                "/profile/complete",
                { method: "POST", body, auth: true }
            );

            updateStoredUser(res.data);
            setAvatarFile(null);
            setSuccess(true);

            // Sidebar/header read the cached user from localStorage on mount only,
            // so refresh to pick up the new name/avatar everywhere.
            setTimeout(() => window.location.reload(), 700);
        } catch (err) {
            setError(
                err instanceof ApiError ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="p-6">
            <h1 className="text-xl font-semibold text-slate-900">Edit Profile</h1>
            <p className="mt-1 text-sm text-slate-500">
                Keep your name, photo, and contact email up to date.
            </p>

            <form
                onSubmit={handleSubmit}
                className="mt-6 max-w-xl rounded-xl border border-slate-200 bg-white p-6"
            >
                <div className="flex flex-col items-center">
                    <div
                        onClick={() => inputRef.current?.click()}
                        className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-blue-600 hover:bg-blue-50"
                    >
                        {preview ? (
                            <Image
                                src={preview}
                                alt="Profile picture"
                                fill
                                unoptimized
                                className="object-cover"
                            />
                        ) : (
                            <Camera className="text-slate-400 group-hover:text-blue-600" size={28} />
                        )}
                    </div>

                    <input
                        ref={inputRef}
                        hidden
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                            const selected = e.target.files?.[0];
                            if (selected) handleFile(selected);
                        }}
                    />

                    <div className="mt-3 flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => inputRef.current?.click()}
                            className="flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-100"
                        >
                            <Upload size={14} />
                            Change Photo
                        </button>

                        {preview && (
                            <button
                                type="button"
                                onClick={removePhoto}
                                className="flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
                            >
                                <Trash2 size={14} />
                                Remove
                            </button>
                        )}
                    </div>
                </div>

                <div className="mt-6">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Arjun Menon"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-slate-700">
                        Email <span className="font-normal text-slate-400">(optional)</span>
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full rounded-xl border border-slate-300 px-4 py-2.5 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                    />
                </div>

                <div className="mt-5">
                    <label className="mb-2 block text-sm font-medium text-slate-700">Phone</label>
                    <input
                        type="text"
                        value={user.phone ?? ""}
                        disabled
                        className="w-full cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-slate-400"
                    />
                    <p className="mt-1.5 text-xs text-slate-400">
                        Phone number is tied to your login and can&apos;t be changed here.
                    </p>
                </div>

                {error && <p className="mt-4 text-sm font-medium text-red-500">{error}</p>}

                {success && (
                    <p className="mt-4 flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <CheckCircle2 size={16} />
                        Profile updated. Refreshing…
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-[#0057D9] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {loading ? (
                        <>
                            <Loader2 size={16} className="animate-spin" />
                            Saving…
                        </>
                    ) : (
                        "Save Changes"
                    )}
                </button>
            </form>
        </div>
    );
}

export default function BuyerProfileEdit() {
    const auth = useAuth();

    if (auth === null || !auth.user) {
        return (
            <div className="p-6">
                <div className="flex h-40 items-center justify-center text-slate-400">
                    <UserIcon className="mr-2 animate-pulse" size={18} />
                    Loading profile…
                </div>
            </div>
        );
    }

    // key forces a remount (and fresh useState defaults) if the underlying
    // user record ever changes identity, e.g. after a re-login.
    return <ProfileEditForm key={auth.user.id} user={auth.user} />;
}
