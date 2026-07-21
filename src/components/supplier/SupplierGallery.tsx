"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { useState } from "react";

interface GalleryImage {
    id: number;
    image: string;
    title: string;
}

interface SupplierGalleryProps {
    gallery: GalleryImage[];
}

export default function SupplierGallery({
    gallery,
}: SupplierGalleryProps) {
    const [selected, setSelected] = useState<GalleryImage | null>(null);

    return (
        <>
            <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-6 flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                            Business Gallery
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Take a look inside the supplier's business.
                        </p>
                    </div>

                    <div className="hidden items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary md:flex">
                        <Camera size={16} />
                        {gallery.length} Photos
                    </div>
                </div>

                {gallery.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                        {gallery.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setSelected(item)}
                                className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover transition duration-500 group-hover:scale-110"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                <div className="absolute bottom-3 left-3 text-sm font-medium text-white">
                                    {item.title}
                                </div>
                            </button>
                        ))}
                    </div>
                ) : (
                    <div className="flex h-56 items-center justify-center rounded-2xl border border-dashed border-gray-300">
                        <div className="text-center">
                            <Camera
                                className="mx-auto mb-3 text-gray-400"
                                size={36}
                            />

                            <h3 className="font-semibold text-gray-900">
                                No Gallery Images
                            </h3>

                            <p className="mt-2 text-sm text-gray-500">
                                Gallery images will appear here once uploaded.
                            </p>
                        </div>
                    </div>
                )}
            </section>

            {/* Lightbox */}
            {selected && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
                    onClick={() => setSelected(null)}
                >
                    <div
                        className="relative h-[80vh] w-full max-w-5xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selected.image}
                            alt={selected.title}
                            fill
                            className="rounded-2xl object-contain"
                        />

                        <button
                            onClick={() => setSelected(null)}
                            className="absolute right-4 top-4 rounded-full bg-white p-2 text-black"
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}