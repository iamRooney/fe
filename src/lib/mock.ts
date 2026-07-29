import { User, Product, RFQ, SavedItem, RecentlyViewedItem, UserRole } from "./types";

// Swap this for a real logged-in user object later
export const mockUser: User = {
    id: "u1",
    name: "Arjun Menon",
    role: "seller", // toggle to "buyer" to preview that dashboard
    companyName: "Zhejiang Hexin Plastics Co.",
    avatar: "AM",
};

export const mockProducts: Product[] = [
    { id: "p1", name: "Injection Molded Storage Box", image: "ZH", priceRange: "$1.80 - $2.10", moq: "500 units", status: "active", views: 214 },
    { id: "p2", name: "Stackable Plastic Crate", image: "ZH", priceRange: "$3.20 - $3.90", moq: "200 units", status: "active", views: 132 },
    { id: "p3", name: "Custom Color Container Set", image: "ZH", priceRange: "$2.50 - $2.95", moq: "500 units", status: "draft", views: 0 },
];

export const mockRFQs: RFQ[] = [
    { id: "r1", title: "Need 1000 cotton blend fabric rolls", category: "Textiles", quantity: "1000 rolls", status: "open", quotesReceived: 4, postedAt: "2026-07-19T10:00:00Z" },
    { id: "r2", title: "LED strip lights, custom length", category: "Electronics", quantity: "5000 units", status: "closed", quotesReceived: 7, postedAt: "2026-07-10T10:00:00Z" },
];

export const mockSavedItems: SavedItem[] = [
    { id: "sv1", name: "Ningbo Star Hardware", type: "supplier", thumbnail: "NS" },
    { id: "sv2", name: "Custom Color Container Set", type: "product", thumbnail: "ZH" },
];

export const mockRecentlyViewed: RecentlyViewedItem[] = [
    { id: "rv1", name: "LED Strip Lights", supplierName: "Shenzhen Bright LED Co.", viewedAt: "2026-07-21T07:00:00Z" },
    { id: "rv2", name: "Cotton Blend Fabric Roll", supplierName: "Guangzhou Yuetai Textiles", viewedAt: "2026-07-20T16:00:00Z" },
];

import { RecommendedProduct, CategorySuggestion } from "./types";

export const mockRecommendedProducts: RecommendedProduct[] = [
    { id: "rp1", name: "Industrial Ball Bearings", supplierName: "Ningbo Star Hardware", priceRange: "$0.40 - $0.85", image: "NS" },
    { id: "rp2", name: "PVC Pipe Fittings Set", supplierName: "Zhejiang Hexin Plastics Co.", priceRange: "$1.20 - $1.60", image: "ZH" },
    { id: "rp3", name: "Solar Panel Mounting Bracket", supplierName: "Shenzhen Bright LED Co.", priceRange: "$3.00 - $4.50", image: "SB" },
    { id: "rp4", name: "Cotton Canvas Roll", supplierName: "Guangzhou Yuetai Textiles", priceRange: "$2.80 - $3.30", image: "GY" },
];

export const mockCategorySuggestions: CategorySuggestion[] = [
    { id: "cat1", name: "IT Services", icon: "monitor", productCount: 1240 },
    { id: "cat2", name: "Electrical", icon: "zap", productCount: 3120 },
    { id: "cat3", name: "Healthcare", icon: "briefcase", productCount: 890 },
    { id: "cat4", name: "Industrial", icon: "bar-chart", productCount: 1560 },
    { id: "cat5", name: "Logistics", icon: "truck", productCount: 2100 },
    { id: "cat6", name: "Chemicals", icon: "flask", productCount: 640 },
    { id: "cat7", name: "Furniture", icon: "armchair", productCount: 480 },
    { id: "cat8", name: "Automotive", icon: "car", productCount: 970 },
];

export const mockTestimonials: Testimonial[] = [
    {
        id: "t1",
        quote: "From identifying suppliers to ensuring timely delivery — the team manages everything end-to-end.",
        name: "Rao Girwale",
        role: "Vikaa Foods",
        location: "Maharashtra",
        tag: "End-to-end sourcing",
    },
    {
        id: "t2",
        quote: "I only review and approve samples. Payment Protection means I buy with full confidence every time.",
        name: "Akhila",
        role: "E-commerce Seller · Imitation Jewellery",
        location: "Karnataka",
        tag: "₹10L Protection",
    },
    {
        id: "t3",
        quote: "Unlimited RFQs changed how we operate. The ₹999 fee pays for itself in the first order.",
        name: "Dwaipayan Das",
        role: "Dwip Retail",
        location: "Hyderabad",
        tag: "Unlimited RFQs",
    },
];
