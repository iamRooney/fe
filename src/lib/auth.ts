import { UserRole } from "./types";

const TOKEN_KEY = "token";
const ROLE_KEY = "userRole";

export interface AuthState {
    isAuthenticated: boolean;
    role: UserRole | null;
}

// Demo implementation — swap this for reading a decoded JWT / session cookie
// once there's a real backend. Keep the AuthState shape the same so nothing
// else in the app needs to change.
export function getAuthState(): AuthState {
    if (typeof window === "undefined") {
        return { isAuthenticated: false, role: null };
    }

    const token = localStorage.getItem(TOKEN_KEY);
    const role = localStorage.getItem(ROLE_KEY) as UserRole | null;

    return {
        isAuthenticated: Boolean(token),
        role: role === "buyer" || role === "seller" ? role : null,
    };
}