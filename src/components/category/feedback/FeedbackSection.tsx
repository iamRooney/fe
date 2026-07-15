import { ThumbsDown, ThumbsUp } from "lucide-react";

export default function FeedbackSection() {
    return (
        <section className="rounded-md border border-dashed border-gray-300 bg-white py-14">
            <h3 className="text-center text-2xl font-medium text-gray-800">
                Did you find the products you were looking for?
            </h3>

            <div className="mt-8 flex justify-center gap-5">
                <button className="flex h-12 w-36 items-center justify-center gap-2 rounded border hover:bg-green-300 text-gray-500">
                    <ThumbsUp size={18} />
                    Yes
                </button>

                <button className="flex h-12 w-36 items-center justify-center gap-2 rounded border hover:bg-red-300 text-gray-500">
                    <ThumbsDown size={18} />
                    No
                </button>
            </div>
        </section>
    );
}