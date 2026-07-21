import { MessageCircleMore } from "lucide-react";

export default function EmptyState() {
    return (
        <div className="flex h-full flex-col items-center justify-center px-10 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50">
                <MessageCircleMore className="h-10 w-10 text-[#0057D9]" />
            </div>
            <h2 className="mt-6 text-2xl font-semibold text-slate-900">Your Messages</h2>
            <p className="mt-2 max-w-md text-slate-500">
                Select a conversation from the left to start chatting with buyers and suppliers.
            </p>
        </div>
    );
}