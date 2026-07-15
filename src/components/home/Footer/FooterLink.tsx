interface Props {
    title: string;
    links: string[];
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
                    <li
                        key={link}
                        className="cursor-pointer text-gray-300 transition hover:text-orange-400"
                    >
                        {link}
                    </li>
                ))}
            </ul>
        </div>
    );
}