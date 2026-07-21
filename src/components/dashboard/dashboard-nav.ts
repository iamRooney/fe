import {
    LayoutDashboard, MessageSquare, Package, PlusCircle,
    Building2, BarChart3, FileText, Send, Bookmark, History, LucideIcon,
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
    { id: "products", label: "My Products", icon: Package },
    { id: "add-product", label: "Add Product", icon: PlusCircle },
    { id: "profile", label: "Company Profile", icon: Building2 },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
];

const buyerNavItems: NavItem[] = [
    { id: "enquiries", label: "My Enquiries", icon: FileText },
    { id: "post-rfq", label: "Post an RFQ", icon: Send },
    { id: "saved", label: "Saved Suppliers", icon: Bookmark },
    { id: "recent", label: "Recently Viewed", icon: History },
];

const messagesNavItem: NavItem = { id: "messages", label: "Messages", icon: MessageSquare };

export function getNavItems(role: UserRole): NavItem[] {
    const roleItems = role === "seller" ? sellerNavItems : buyerNavItems;
    return [...sharedNavItems, ...roleItems, messagesNavItem];
}