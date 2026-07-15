import { Supplier } from "./types";

export const suppliers: Supplier[] = [
    {
        id: 1,
        company: "Techno Industrial Group",
        logo: "/images/suppliers/supplier-1.jfif",
        rating: 4.8,
        reviews: 145,
        description:
            "Leading manufacturer of precision gears and automation parts with over 20 years of experience.",
        verified: true,
    },
    {
        id: 2,
        company: "Industrial Machines Ltd.",
        logo: "/images/suppliers/supplier-2.jfif",
        rating: 4.9,
        reviews: 182,
        description:
            "Specialized in hydraulic systems, motors and heavy machinery components.",
        verified: true,
    },
    {
        id: 3,
        company: "GreenTech Solutions",
        logo: "/images/suppliers/supplier-3.jfif",
        rating: 4.7,
        reviews: 120,
        description:
            "Global supplier of renewable energy equipment and industrial batteries.",
        verified: true,
    },
];