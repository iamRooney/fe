import Container from "@/components/ui/Container";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Search, ChevronDown } from "lucide-react";

export default function Header() {
    return (
        <header className="bg-white border-b">
            <Container>

                <div className="flex items-center justify-between py-5 gap-6">

                    <Link href="/" className="shrink-0 ">

                        <Image
                            src="/logos/Logo.png"
                            alt="Exbhex"
                            width={150}
                            height={50}
                        />

                    </Link>

                    <div className="flex flex-1 items-center">

                        <div className="flex w-full rounded-xl border border-gray-200 overflow-hidden">

                            <button className="flex items-center gap-2 w-34 border-r text-sm text-gray-700">

                                Products

                                <ChevronDown size={16} />

                            </button>

                            <button className="flex items-center gap-2 w-36 border-r text-sm text-gray-700">

                                <MapPin size={16} />

                                Location

                            </button>

                            <input
                                type="text"
                                placeholder="Search for Products, Services or Companies..."
                                className="w-full flex-1 px-5 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none"
                            />

                            <button className="bg-[#F79A1E] hover:bg-orange-400 text-white px-10 flex items-center gap-2 transition shrink-0">

                                <Search size={18} />

                                Search

                            </button>

                        </div>

                    </div>

                    <button className="bg-[#0B2C6B] text-white rounded-2xl px-6 py-3 font-medium hover:bg-[#07204E] transition">

                        Get Best Price

                    </button>

                </div>

            </Container>
        </header>
    );
}