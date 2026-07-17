import {
    ShieldCheck,
    Headphones,
    BriefcaseBusiness,
    Truck,
} from "lucide-react";

const items = [
    {
        title: "Purchase Manager",
        icon: BriefcaseBusiness,
    },
    {
        title: "₹10L Protection",
        icon: ShieldCheck,
    },
    {
        title: "FASTag Tracking",
        icon: Truck,
    },
    {
        title: "24/7 Support",
        icon: Headphones,
    },
];

export default function TrustSealCard() {
    return (
        <div
            className="
      bg-[#F8F9FD]
      rounded-2xl
      border
      p-8
      shadow-sm
    "
        >
            <div className="grid grid-cols-2 gap-5">

                {items.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="
              bg-white
              rounded-xl
              border
              h-28
              flex
              flex-col
              items-center
              justify-center
              gap-3
              hover:shadow-md
              transition
            "
                        >

                            <Icon
                                size={22}
                                className="text-[#163B82]"
                            />

                            <span className="text-sm font-medium text-gray-700">
                                {item.title}
                            </span>

                        </div>
                    );
                })}

            </div>

            <div className="mt-10 text-center">

                <div className="text-4xl font-bold text-[#163B82]">
                    ₹999
                    <span className="text-base font-normal text-gray-500">
                        /month
                    </span>
                </div>

            </div>
        </div>
    );
}