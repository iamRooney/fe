import { UserRole } from "./types";

const TOKEN_KEY = "token";
const USER_KEY = "authUser";
// Role picked on the /auth/register RoleStep, before the backend has
// assigned a real role (that only happens at profile-complete time).
// Used purely to render the right form on the complete-profile screen.
const PENDING_ROLE_KEY = "pendingRole";

export interface StoredUser {
    id: number;
    name: string;
    phone: string;
    email: string | null;
    role: UserRole | null;
    is_profile_completed: boolean;
    profile_image?: string | null;
    profile_image_url?: string | null;
}

export interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
    isProfileCompleted: boolean;
    user: StoredUser | null;
}

export function getAuthState(): AuthState {
    if (typeof window === "undefined") {
        return {
            isAuthenticated: false,
            role: null,
            isProfileCompleted: false,
            user: null,
        };
    }

    const token = localStorage.getItem(TOKEN_KEY);

    let user: StoredUser | null = null;
    const rawUser = localStorage.getItem(USER_KEY);
    if (rawUser) {
        try {
            user = JSON.parse(rawUser) as StoredUser;
        } catch {
            user = null;
        }
    }

    const role = user?.role === "buyer" || user?.role === "seller" ? user.role : null;

    return {
        isAuthenticated: Boolean(token),
        role,
        isProfileCompleted: Boolean(user?.is_profile_completed),
        user,
    };
}

/** Call after a successful /auth/verify-otp response. */
export function setAuthSession(token: string, user: StoredUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

/** Call after /profile/complete returns the updated user. */
export function updateStoredUser(patch: Partial<StoredUser>) {
    const raw = localStorage.getItem(USER_KEY);
    if (!raw) return;

    try {
        const current = JSON.parse(raw) as StoredUser;
        localStorage.setItem(USER_KEY, JSON.stringify({ ...current, ...patch }));
    } catch {
        // ignore corrupt state
    }
}

export function clearAuthSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(PENDING_ROLE_KEY);
}

export function setPendingRole(role: UserRole) {
    localStorage.setItem(PENDING_ROLE_KEY, role);
}

export function getPendingRole(): UserRole | null {
    if (typeof window === "undefined") return null;
    const value = localStorage.getItem(PENDING_ROLE_KEY);
    return value === "buyer" || value === "seller" ? value : null;
}

export function clearPendingRole() {
    localStorage.removeItem(PENDING_ROLE_KEY);
}
