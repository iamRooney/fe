import { API_BASE_URL, ApiError } from "@/lib/api";
import { getAdminToken } from "@/lib/admin-auth";

interface RequestOptions {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: unknown;
    /** Attach the admin bearer token. Default: true — nearly every admin call needs it. */
    auth?: boolean;
}

/**
 * Same shape as apiRequest() in @/lib/api, but reads the admin token
 * (a separate Sanctum token/session from the buyer/seller one) and
 * always hits paths under /admin.
 */
export async function adminApiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, auth = true } = options;

    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    if (body !== undefined && !isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (auth) {
        const token = getAdminToken();
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    let res: Response;
    try {
        res = await fetch(`${API_BASE_URL}/admin${path}`, {
            method,
            headers,
            cache: "no-store",
            body:
                body === undefined
                    ? undefined
                    : isFormData
                        ? (body as FormData)
                        : JSON.stringify(body),
        });
    } catch {
        throw new ApiError("Couldn't reach the server. Is the backend running?", 0, null);
    }

    let data: unknown = null;
    try {
        data = await res.json();
    } catch {
        // No JSON body
    }

    if (!res.ok) {
        const message =
            data &&
                typeof data === "object" &&
                "message" in data &&
                typeof (data as { message?: unknown }).message === "string"
                ? (data as { message: string }).message
                : `Request failed (${res.status})`;

        throw new ApiError(message, res.status, data);
    }

    return data as T;
}

/**
 * Stream an admin-viewable file (e.g. a company document) and open it
 * in a new tab. Plain <a href> can't carry the Authorization header,
 * so we fetch it as a blob ourselves and hand the browser an object URL.
 */
export async function openAdminFile(path: string) {
    const token = getAdminToken();
    const res = await fetch(`${API_BASE_URL}/admin${path}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        cache: "no-store",
    });

    if (!res.ok) {
        throw new ApiError(`Couldn't load the file (${res.status})`, res.status, null);
    }

    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    // Give the new tab a moment to actually load the blob before revoking.
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
