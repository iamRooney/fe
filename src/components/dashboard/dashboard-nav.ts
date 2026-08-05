import {
    LayoutDashboard, MessageSquare, Package, PlusCircle,
    Building2, BarChart3, FileText, Bookmark, History, User, Send, LucideIcon,
} from "lucide-react";

import { UserRole } from "@/lib/types";

export interface NavItem {
    id: string;
    label: string;
    icon: LucideIcon;
}

const sharedNavItems: NavItem[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
];

const sellerNavItems: NavItem[] = [
    { id: "requirements", label: "RFQ Leads", icon: Send },
    { id: "products", label: "My Products", icon: Package },
    { id: "add-product", label: "Add Product", icon: PlusCircle },
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
];

// Buyer dashboard is intentionally kept to just these 5 sections
// (no overview / discovery, no post-RFQ) — see DashboardShell.
const buyerNavItems: NavItem[] = [
    { id: "enquiries", label: "My Enquiries", icon: FileText },
    { id: "saved", label: "Saved Suppliers", icon: Bookmark },
    { id: "recent", label: "Recently Viewed", icon: History },
];

const messagesNavItem: NavItem = { id: "messages", label: "Messages", icon: MessageSquare };
const buyerProfileNavItem: NavItem = { id: "profile", label: "Edit Profile", icon: User };

export function getNavItems(role: UserRole): NavItem[] {
    if (role === "buyer") {
        return [...buyerNavItems, messagesNavItem, buyerProfileNavItem];
    }
    return [...sharedNavItems, ...sellerNavItems, messagesNavItem];
}