import Container from "@/components/ui/Container/";
import { Globe, CircleHelp } from "lucide-react";
import { MessageCircleMore } from 'lucide-react';
import { LogIn } from 'lucide-react';
import Link from "next/link";

export default function TopBar() {
    return (
        <div className="bg-[#0B3A78] text-white text-sm">
            <Container>
                <div className="flex h-10 items-center justify-between">
                    <div />

                    <div className="flex items-center gap-6">

                        <button className="flex items-center gap-2 hover:text-orange-400 transition">
                            <Globe size={16} />
                            English
                        </button>

                        <Link
                            href="/help"
                            className="flex items-center gap-2 hover:text-orange-400 transition"
                        >
                            <CircleHelp size={16} />
                            Help Center
                        </Link>

                        <Link
                            href="/messages"
                            className="flex items-center gap-2 hover:text-orange-400 transition"
                        >
                            <MessageCircleMore size={16} />
                            Messages
                        </Link>

                        <Link
                            href="/login"
                            className="font-medium hover:text-orange-400 transition"
                        >
                            Login / Sign up
                        </Link>

                    </div>
                </div>
            </Container>
        </div>
    );
}