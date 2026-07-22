import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, ChevronDown } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white border-b border-gray-200">
            <Container>
                <div className="flex flex-col gap-4 py-4 lg:h-[88px] lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-0">

                    <div className="flex items-center justify-between gap-4">
                        {/* Logo */}
                        <Link href="/" className="shrink-0">
                            <Image
                                src="/logos/Logo.png"
                                alt="Exbhex"
                                width={145}
                                height={42}
                                priority
                                className="h-auto w-[120px] sm:w-[145px]"
                            />
                        </Link>

                        {/* Get Best Price (mobile/tablet position) */}
                        <button className="flex h-[42px] shrink-0 items-center justify-center rounded-xl bg-[#163A7A] px-4 text-sm font-semibold text-white transition hover:bg-[#0F2F67] lg:hidden">
                            Get Best Price
                        </button>
                    </div>

                    {/* Search Bar */}
                    <div className="flex flex-1 items-center">

                        <div className="flex h-[48px] w-full overflow-hidden rounded-xl border border-gray-300 bg-white">

                            {/* Products */}

                            <button className="hidden w-[130px] items-center justify-center gap-2 border-r border-gray-300 text-[15px] font-medium text-gray-700 hover:bg-gray-50 md:flex">

                                Products

                                <ChevronDown size={16} />

                            </button>

                            {/* Location */}

                            <button className="hidden w-[150px] items-center justify-center gap-2 border-r border-gray-300 text-[15px] font-medium text-gray-700 hover:bg-gray-50 md:flex">

                                <MapPin size={17} />

                                Location

                            </button>

                            {/* Search */}

                            <input
                                type="text"
                                placeholder="Search for Products, Services or Companies..."
                                className="min-w-0 flex-1 px-4 text-[15px] placeholder:text-gray-400 focus:outline-none text-gray-500 sm:px-6"
                            />

                            {/* Search Button */}

                            <button className="flex w-[56px] shrink-0 items-center justify-center gap-2 bg-[#F89A1C] font-medium text-white transition hover:bg-[#e88910] sm:w-[170px]">

                                <Search size={18} />

                                <span className="hidden sm:inline">Search</span>

                            </button>

                        </div>

                    </div>

                    {/* Get Best Price (desktop position) */}

                    <button className="hidden h-[48px] w-[190px] shrink-0 items-center justify-center rounded-2xl bg-[#163A7A] text-[16px] font-semibold text-white transition hover:bg-[#0F2F67] lg:flex">

                        Get Best Price

                    </button>

                </div>
            </Container>
        </header>
    );
}