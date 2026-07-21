export interface Message {
    id: string;
    conversationId: string;
    senderId: string;
    senderType: "buyer" | "supplier";
    text: string;
    createdAt: string; // ISO timestamp
    status: "sent" | "delivered" | "read";
}

export interface Conversation {
    id: string;
    supplierId: string;
    supplierName: string;
    supplierAvatar: string; // initials fallback
    lastMessage: string;
    lastMessageAt: string;
    unreadCount: number;
    isStarred: boolean;
}

export interface Supplier {
    id: string;
    name: string;
    logo: string; // initials fallback
    location: string;
    responseRate: string;
    responseTime: string;
    verified: boolean;
    memberSince: string;
    mainProducts: string[];
}