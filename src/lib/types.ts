export type UserRole = "buyer" | "seller";

export interface User {
    id: string;
    name: string;
    role: UserRole;
    companyName: string;
    avatar: string;
}

export interface Product {
    id: string;
    name: string;
    image: string; // placeholder color/url
    priceRange: string;
    moq: string;
    status: "active" | "draft";
    views: number;
}

export interface RFQ {
    id: string;
    title: string;
    category: string;
    quantity: string;
    status: "open" | "closed";
    quotesReceived: number;
    postedAt: string;
}

export interface SavedItem {
    id: string;
    name: string;
    type: "supplier" | "product";
    thumbnail: string;
}

export interface RecentlyViewedItem {
    id: string;
    name: string;
    supplierName: string;
    viewedAt: string;
}

export interface CategorySuggestion {
    id: string;
    name: string;
    icon: string; // lucide icon key
    productCount: number;
}

export interface RecommendedProduct {
    id: string;
    name: string;
    supplierName: string;
    priceRange: string;
    minOrder: string;
    verified: boolean;
    badge?: "Hot Deal" | "Trending" | "New";
    icon: string; // lucide icon key, rendered in the image area until real photos exist
}

export interface Testimonial {
    id: string;
    quote: string;
    name: string;
    role: string;
    location: string;
    tag: string;
}