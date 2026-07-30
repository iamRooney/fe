export interface Supplier {
    id: number;
    company: string;
    logo: string | null;
    rating?: number;
    reviews?: number;
    description: string;
    verified: boolean;
}