import Image from "next/image";

const brands = [
    {
        name: "Lays Chips",
        image: "/images/brands/brand-1.jfif",
    },
    {
        name: "Nivea",
        image: "/images/brands/brand-2.jfif",
    },
    {
        name: "Dominos",
        image: "/images/brands/brand-3.jfif",
    },
    {
        name: "Raspberry Pi Boards",
        image: "/images/brands/brand-4.jfif",
    },
    {
        name: "Microcontroller Boards",
        image: "/images/brands/brand-5.jfif",
    },
];

export default function RelatedBrands() {
    return (
        <div className="space-y-3">
            {brands.map((brand) => (
                <div
                    key={brand.name}
                    className="flex items-center gap-3 rounded-lg border border-gray-100 p-2 hover:bg-gray-50"
                >
                    <div className="relative h-10 w-10">
                        <Image
                            src={brand.image}
                            alt={brand.name}
                            fill
                            className="object-contain"
                        />
                    </div>

                    <span className="text-sm">
                        {brand.name}
                    </span>
                </div>
            ))}
        </div>
    );
}