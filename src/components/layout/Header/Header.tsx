import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, ChevronDown } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <Container>
                <div className="flex h-[88px] items-center justify-between gap-8">

                    {/* Logo */}
                    <Link href="/" className="shrink-0">
                        <Image
                            src="/logos/Logo.png"
                            alt="Exbhex"
                            width={145}
                            height={42}
                            priority
                        />
                    </Link>

                    {/* Search Bar */}
                    <div className="flex flex-1 items-center">

                        <div className="flex h-[48px] w-full overflow-hidden rounded-xl border border-gray-300 bg-white">

                            {/* Products */}

                            <button className="flex w-[130px] items-center justify-center gap-2 border-r border-gray-300 text-[15px] font-medium text-gray-700 hover:bg-gray-50">

                                Products

                                <ChevronDown size={16} />

                            </button>

                            {/* Location */}

                            <button className="flex w-[150px] items-center justify-center gap-2 border-r border-gray-300 text-[15px] font-medium text-gray-700 hover:bg-gray-50">

                                <MapPin size={17} />

                                Location

                            </button>

                            {/* Search */}

                            <input
                                type="text"
                                placeholder="Search for Products, Services or Companies..."
                                className="flex-1 px-6 text-[15px] placeholder:text-gray-400 focus:outline-none"
                            />

                            {/* Search Button */}

                            <button className="flex w-[170px] items-center justify-center gap-2 bg-[#F89A1C] font-medium text-white transition hover:bg-[#e88910]">

                                <Search size={18} />

                                Search

                            </button>

                        </div>

                    </div>

                    {/* Get Best Price */}

                    <button className="flex h-[48px] w-[190px] items-center justify-center rounded-2xl bg-[#163A7A] text-[16px] font-semibold text-white transition hover:bg-[#0F2F67]">

                        Get Best Price

                    </button>

                </div>
            </Container>
        </header>
    );
}