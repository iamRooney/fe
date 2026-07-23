import Image from "next/image";
import { recentlyViewed } from "@/data/recentlyViewed";

export default function RecentlyViewed() {
    return (
        <section className="rounded-md border border-gray-200 bg-white p-6">
            <h2 className="mb-6 text-2xl font-bold text-[#153D7A]">
                Recently Viewed
            </h2>

            <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
                {recentlyViewed.map((item) => (
                    <div
                        key={item.id}
                        className="rounded border border-gray-200 p-4 transition hover:shadow-md"
                    >
                        <div className="relative mx-auto h-20 w-20">
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                className="object-contain"
                            />
                        </div>

                        <h3 className="mt-4 text-sm font-medium text-gray-500">
                            {item.title}
                        </h3>

                        <p className="mt-1 font-bold text-[#153D7A]">
                            {item.price}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}