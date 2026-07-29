const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api";

const TOKEN_KEY = "token";

/**
 * Thrown on any non-2xx response. Carries the parsed Laravel error body so
 * callers can show field-level validation messages (422s) or a generic
 * message (everything else).
 */
export class ApiError extends Error {
    status: number;
    errors?: Record<string, string[]>;

    constructor(message: string, status: number, errors?: Record<string, string[]>) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.errors = errors;
    }
}

interface RequestOptions extends Omit<RequestInit, "body"> {
    body?: unknown;
    /** Attach the Sanctum bearer token from localStorage. Default: true. */
    auth?: boolean;
}

export async function apiFetch<T = unknown>(
    path: string,
    { body, auth = true, headers, ...rest }: RequestOptions = {}
): Promise<T> {
    const finalHeaders: Record<string, string> = {
        Accept: "application/json",
        ...(headers as Record<string, string>),
    };

    if (body !== undefined) {
        finalHeaders["Content-Type"] = "application/json";
    }

    if (auth && typeof window !== "undefined") {
        const token = localStorage.getItem(TOKEN_KEY);
        if (token) finalHeaders["Authorization"] = `Bearer ${token}`;
    }

    const res = await fetch(`${API_URL}${path}`, {
        ...rest,
        headers: finalHeaders,
        body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    // 204 No Content etc.
    const text = await res.text();
    const data = text ? JSON.parse(text) : null;

    if (!res.ok) {
        throw new ApiError(
            data?.message ?? `Request failed with status ${res.status}`,
            res.status,
            data?.errors
        );
    }

    return data as T;
}
