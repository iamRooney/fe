const ADMIN_TOKEN_KEY = "adminToken";
const ADMIN_USER_KEY = "adminUser";

export interface StoredAdmin {
    id: number;
    name: string;
    email: string;
}

export interface AdminAuthState {
    isAuthenticated: boolean;
    admin: StoredAdmin | null;
}

export function getAdminAuthState(): AdminAuthState {
    if (typeof window === "undefined") {
        return { isAuthenticated: false, admin: null };
    }

    const token = localStorage.getItem(ADMIN_TOKEN_KEY);

    let admin: StoredAdmin | null = null;
    const raw = localStorage.getItem(ADMIN_USER_KEY);
    if (raw) {
        try {
            admin = JSON.parse(raw) as StoredAdmin;
        } catch {
            admin = null;
        }
    }

    return { isAuthenticated: Boolean(token), admin };
}

export function getAdminToken(): string | null {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminSession(token: string, admin: StoredAdmin) {
    localStorage.setItem(ADMIN_TOKEN_KEY, token);
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(admin));
}

export function clearAdminSession() {
    localStorage.removeItem(ADMIN_TOKEN_KEY);
    localStorage.removeItem(ADMIN_USER_KEY);
}
