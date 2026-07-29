import { apiFetch } from "./client";
import { ApiUser } from "@/lib/types";

interface SendOtpResponse {
    success: boolean;
    message: string;
    data: {
        phone: string;
        otp: string; // backend echoes this back for now (no SMS provider wired up yet)
        expires_at: string;
    };
}

interface VerifyOtpResponse {
    success: boolean;
    message: string;
    data: {
        user: ApiUser;
        token: string;
    };
}

interface MeResponse {
    success: boolean;
    data: ApiUser;
}

export function sendOtp(phone: string) {
    return apiFetch<SendOtpResponse>("/auth/send-otp", {
        method: "POST",
        body: { phone },
        auth: false,
    });
}

export function verifyOtp(phone: string, otp: string) {
    return apiFetch<VerifyOtpResponse>("/auth/verify-otp", {
        method: "POST",
        body: { phone, otp },
        auth: false,
    });
}

export function me() {
    return apiFetch<MeResponse>("/auth/me");
}

export function logout() {
    return apiFetch<{ success: boolean; message: string }>("/auth/logout", {
        method: "POST",
    });
}

interface CompleteBuyerProfilePayload {
    role: "buyer";
    name: string;
    email?: string;
}

interface CompleteSellerProfilePayload {
    role: "seller";
    name: string;
    email?: string;
    company_name: string;
    country_id: number;
    state_id: number;
    city_id: number;
}

export function completeProfile(
    payload: CompleteBuyerProfilePayload | CompleteSellerProfilePayload
) {
    return apiFetch<{ success: boolean; message: string; data: ApiUser }>(
        "/profile/complete",
        {
            method: "POST",
            body: payload,
        }
    );
}
