"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LogIn } from "lucide-react";
import { ApiError } from "@/lib/api";
import { adminApiRequest } from "@/lib/api/admin";
import { setAdminSession, StoredAdmin } from "@/lib/admin-auth";

interface LoginResponse {
    success: boolean;
    message: string;
    data: {
        admin: StoredAdmin;
        token: string;
    };
}

export default function AdminLoginForm() {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email.trim() || !password) {
            setError("Please enter your email and password.");
            return;
        }

        setError("");
        setLoading(true);

        try {
            const res = await adminApiRequest<LoginResponse>("/login", {
                method: "POST",
                body: { email, password },
                auth: false,
            });

            setAdminSession(res.data.token, res.data.admin);
            router.push("/admin");
        } catch (err) {
            setError(
                err instanceof ApiError ? err.message : "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
            <div className="w-full max-w-sm rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
                <div className="text-center">
                    <p className="text-lg font-semibold text-[#0057D9]">Exbhex</p>
                    <h1 className="mt-2 text-2xl font-bold text-slate-900">Admin Login</h1>
                    <p className="mt-1 text-sm text-slate-500">Sign in to manage the marketplace.</p>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@exbhex.com"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            className="w-full rounded-2xl border border-slate-300 px-4 py-3 text-slate-700 outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                        />
                    </div>

                    {error && <p className="text-center text-sm font-medium text-red-500">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-sky-500 py-3 text-base font-semibold text-white shadow-lg transition-all hover:scale-[1.01] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={20} className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            <>
                                <LogIn size={20} />
                                Sign In
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}
