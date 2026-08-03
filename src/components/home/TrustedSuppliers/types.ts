export interface Supplier {
    id: number;
    slug: string;
    company: string;
    logo: string | null;
    rating?: number;
    reviews?: number;
    description: string;
    verified: boolean;
}