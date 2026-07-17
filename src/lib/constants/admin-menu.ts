import {
    LayoutDashboard,
    Building2,
    Package,
    BriefcaseBusiness,
    FolderTree,
    Users,
    Settings,
    LogOut,
} from "lucide-react";

export const adminMenu = [
    {
        title: "Dashboard",
        href: "/admin",
        icon: LayoutDashboard,
    },
    {
        title: "Companies",
        href: "/admin/companies",
        icon: Building2,
    },
    {
        title: "Products",
        href: "/admin/products",
        icon: Package,
    },
    {
        title: "Services",
        href: "/admin/services",
        icon: BriefcaseBusiness,
    },
    {
        title: "Categories",
        href: "/admin/categories",
        icon: FolderTree,
    },
    {
        title: "Users",
        href: "/admin/users",
        icon: Users,
    },
    {
        title: "Settings",
        href: "/admin/settings",
        icon: Settings,
    },
];

export const logoutItem = {
    title: "Logout",
    href: "/login",
    icon: LogOut,
};