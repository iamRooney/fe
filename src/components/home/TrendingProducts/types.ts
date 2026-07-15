export interface Product {
    id: number;
    name: string;
    image: string;
    supplier: string;
    price: string;
    moq: string;
    verified: boolean;
    badge?: string;
}