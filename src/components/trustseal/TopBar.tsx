import { Globe, CircleHelp } from "lucide-react";

export default function TopBar() {
    return (
        <div className="bg-[#163B82] text-white">
            <div className="mx-auto flex h-12 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">

                <div className="flex items-center gap-8 text-sm">

                    <button className="flex items-center gap-5 hover:text-gray-200 transition">
                        <Globe size={16} />
                        <span>English</span>
                    </button>

                    {/* <button className="flex items-center gap-2 hover:text-gray-200 transition">
                        <CircleHelp size={16} />
                        <span>Help Center</span>
                    </button> */}

                </div>

            </div>
        </div>
    );
}