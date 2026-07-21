import Link from "next/link";

interface FooterLinkItem {
    title: string;
    href: string;
}

interface Props {
    title: string;
    links: FooterLinkItem[];
}

export default function FooterLinks({
    title,
    links,
}: Props) {
    return (
        <div>
            <h3 className="mb-5 text-lg font-semibold text-white">
                {title}
            </h3>

            <ul className="space-y-3">
                {links.map((link) => (
                    <li key={link.href}>
                        <Link
                            href={link.href}
                            className="cursor-pointer text-gray-300 transition-colors duration-200 hover:text-orange-400"
                        >
                            {link.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}