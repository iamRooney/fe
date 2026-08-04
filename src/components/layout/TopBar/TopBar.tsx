import Container from "@/components/ui/Container/";
import { Globe, CircleHelp } from "lucide-react";
import { MessageCircleMore } from 'lucide-react';
import Link from "next/link";
import AuthActions from "./AuthActions";

export default function TopBar() {
    return (
        <div className="bg-[#0B3A78] text-white text-sm">
            <Container>
                <div className="flex h-10 items-center justify-end sm:justify-between">

                    <div className="hidden sm:block" />

                    <div className="flex items-center gap-3 sm:gap-6">

                        <button className="hidden items-center gap-2 hover:text-orange-400 transition sm:flex">
                            <Globe size={16} />
                            English
                        </button>

                        {/* <Link
                            href="/help"
                            className="flex items-center gap-2 hover:text-orange-400 transition"
                        >
                            <CircleHelp size={16} />
                            Help Center
                        </Link> */}

                        <Link
                            href="/dashboard/messages"
                            className="flex items-center gap-2 hover:text-orange-400 transition"
                        >
                            <MessageCircleMore size={16} />
                            <span className="hidden md:inline">Messages</span>
                        </Link>

                        <AuthActions />

                    </div>
                </div>
            </Container>
        </div>
    );
}