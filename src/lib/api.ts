// Thin wrapper around fetch for talking to the Laravel backend.
// Set NEXT_PUBLIC_API_URL in .env.local if the backend isn't at the default.
export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

export const API_ORIGIN = API_BASE_URL.replace(/\/api\/?$/, "");

/**
 * Service (unlike Product/Company) doesn't append a full `image_url` on the
 * backend — it only returns the raw stored path. Resolve it to an absolute
 * URL here so <Image> can render it.
 */
export function resolveStorageUrl(path?: string | null): string | null {
    if (!path) return null;
    if (/^https?:\/\//i.test(path)) return path;
    return `${API_ORIGIN}/storage/${path.replace(/^\/+/, "")}`;
}

export class ApiError extends Error {
    status: number;
    body: unknown;

    constructor(message: string, status: number, body: unknown) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.body = body;
    }
}

interface RequestOptions {
    method?: "GET" | "POST" | "PATCH" | "PUT" | "DELETE";
    body?: unknown;
    /** Attach the stored bearer token to this request. Default: false. */
    auth?: boolean;
}

export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, auth = false } = options;

    const headers: Record<string, string> = {
        Accept: "application/json",
    };

    const isFormData = typeof FormData !== "undefined" && body instanceof FormData;

    // Let the browser set the multipart Content-Type (with boundary) itself
    // when sending a FormData body — setting it manually breaks the upload.
    if (body !== undefined && !isFormData) {
        headers["Content-Type"] = "application/json";
    }

    if (auth && typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        if (token) headers["Authorization"] = `Bearer ${token}`;
    }

    let res: Response;
    try {
        res = await fetch(`${API_BASE_URL}${path}`, {
            method,
            headers,
            body:
                body === undefined
                    ? undefined
                    : isFormData
                        ? (body as FormData)
                        : JSON.stringify(body),
        });
    } catch {
        // Network-level failure (server down, CORS block, DNS, etc.)
        throw new ApiError(
            "Couldn't reach the server. Is the backend running?",
            0,
            null
        );
    }

    let data: unknown = null;
    try {
        data = await res.json();
    } catch {
        // No JSON body (e.g. 204, or an HTML error page)
    }

    if (!res.ok) {
        const message =
            data &&
                typeof data === "object" &&
                "message" in data &&
                typeof (data as { message?: unknown }).message === "string"
                ? (data as { message: string }).message
                : `Request failed (${res.status})`;

        // Laravel validation errors: { errors: { field: [msg, ...] } }
        const firstValidationError =
            data &&
                typeof data === "object" &&
                "errors" in data &&
                data.errors &&
                typeof data.errors === "object"
                ? Object.values(data.errors as Record<string, string[]>)[0]?.[0]
                : undefined;

        throw new ApiError(firstValidationError ?? message, res.status, data);
    }

    return data as T;
}