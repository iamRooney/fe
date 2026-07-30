export interface Product {
    id: number;
    name: string;
    image: string | null;
    supplier: string;
    price: string;
    moq: string;
    verified: boolean;
    badge?: string;
}