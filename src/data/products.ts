export interface Product {
    id: number;
    name: string;
    image: string;
    supplier: string;
    location: string;
    price: string;
    moq: string;
    verified: boolean;
    badge?: string;
}

export const products: Product[] = [
    {
        id: 1,
        name: "Arduino Uno R3 With USB Cable",
        image: "/images/products/product-1.jfif",
        supplier: "Inscart",
        location: "Ernakulam, Kerala",
        price: "₹350",
        moq: "/ Piece",
        verified: true,
        badge: "BEST SELLER",
    },
    {
        id: 2,
        name: "Arduino Uno R3 With USB Cable",
        image: "/images/products/product-2.jfif",
        supplier: "Unikart",
        location: "Thrissur, Kerala",
        price: "₹350",
        moq: "/ Piece",
        verified: true,
    },
    {
        id: 3,
        name: "Arduino Nano Electronic Development Board",
        image: "/images/products/product-3.jfif",
        supplier: "H&H Suppliers",
        location: "Kochi, Kerala",
        price: "₹300",
        moq: "/ Piece",
        verified: true,
        badge: "STAR SUPPLIER",
    },
    {
        id: 4,
        name: "Arduino Nano Electronic Development Board",
        image: "/images/products/product-4.jfif",
        supplier: "Audio Systems",
        location: "Calicut, Kerala",
        price: "₹300",
        moq: "/ Piece",
        verified: false,
    },
];