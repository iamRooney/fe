import {
    LayoutDashboard, MessageSquare, Package, PlusCircle,
    Building2, BarChart3, FileText, Bookmark, History, UserCog, LucideIcon,
} from "lucide-react";

import { UserRole } from "@/lib/types";

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

const sellerNavItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "products", label: "My Products", icon: Package },
    { id: "add-product", label: "Add Product", icon: PlusCircle },
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "messages", label: "Messages", icon: MessageSquare },
];

// Kept deliberately minimal — the buyer dashboard only needs these five.
const buyerNavItems: NavItem[] = [
    { id: "enquiries", label: "My Enquiries", icon: FileText },
    { id: "saved", label: "Saved Suppliers", icon: Bookmark },
    { id: "recent", label: "Recently Viewed", icon: History },
    { id: "messages", label: "Messages", icon: MessageSquare },
    { id: "profile", label: "Profile Edit", icon: UserCog },
];

export function getNavItems(role: UserRole): NavItem[] {
    return role === "seller" ? sellerNavItems : buyerNavItems;
}

/** The section a role lands on when they first open the dashboard. */
export function getDefaultSection(role: UserRole): string {
    return role === "seller" ? "overview" : "enquiries";
}
