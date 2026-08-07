import {
    LayoutDashboard, Building2, Package, BriefcaseBusiness,
    FolderTree, Users, Settings, FileCheck2, LucideIcon,
} from "lucide-react";

export interface AdminNavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

export const adminNavItems: AdminNavItem[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "documents", label: "Documents", icon: FileCheck2 },
    { id: "companies", label: "Companies", icon: Building2 },
    { id: "products", label: "Products", icon: Package },
    { id: "services", label: "Services", icon: BriefcaseBusiness },
    { id: "categories", label: "Categories", icon: FolderTree },
    { id: "users", label: "Users", icon: Users },
    { id: "settings", label: "Settings", icon: Settings },
];
