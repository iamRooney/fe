import Link from "next/link";
import { socials } from "./footerData";

export default function SocialLinks() {
    return (
        <div className="flex gap-3 mt-5">
            {socials.map((item, index) => {
                const Icon = item.icon;

                return (
                    <Link
                        key={index}
                        href={item.href}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-[#20488B] transition hover:bg-orange-500"
                    >
                        <Icon size={18} className="text-white" />
                    </Link>
                );
            })}
        </div>
    );
}