"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import MobileMenu from "./MobileMenu";

const navLinks = [
    {
        title: "Benefits",
        href: "#benefits",
    },
    {
        title: "Pricing",
        href: "#pricing",
    },
    {
        title: "Reviews",
        href: "#reviews",
    },
    {
        title: "FAQs",
        href: "#faqs",
    },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="border-b bg-white">

                <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

                    {/* Logo */}

                    <Link href="/">
                        <Image
                            src="/images/Logo.png"
                            alt="Exbhex"
                            width={170}
                            height={50}
                            priority
                        />
                    </Link>

                    {/* Desktop */}

                    <div className="hidden items-center gap-10 md:flex">

                        {navLinks.map((item) => (
                            <a
                                key={item.title}
                                href={item.href}
                                className="font-medium text-gray-600 transition hover:text-[#163B82]"
                            >
                                {item.title}
                            </a>
                        ))}

                        <div className="h-8 w-px bg-gray-300" />

                        {/* <button
                            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              bg-[#163B82]
              text-sm
              font-semibold
              text-white
            "
                        >
                            KT
                        </button> */}

                    </div>

                    {/* Mobile */}

                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden"
                    >
                        {open ? (
                            <X size={28} />
                        ) : (
                            <Menu size={28} />
                        )}
                    </button>

                </div>

            </nav>

            <MobileMenu
                open={open}
                onClose={() => setOpen(false)}
            />
        </>
    );
}