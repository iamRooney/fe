import { Star, CheckCircle } from "lucide-react";

interface Review {
    id: number;
    customer: string;
    company?: string;
    rating: number;
    comment: string;
    date: string;
}

interface SupplierReviewsProps {
    rating: number;
    totalReviews: number;
    reviews: Review[];
}

export default function SupplierReviews({
    rating,
    totalReviews,
    reviews,
}: SupplierReviewsProps) {
    const distribution = [
        { stars: 5, value: 82 },
        { stars: 4, value: 14 },
        { stars: 3, value: 3 },
        { stars: 2, value: 1 },
        { stars: 1, value: 0 },
    ];

    return (
        <section className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            {/* Header */}
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">
                    Customer Reviews
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                    Feedback shared by verified business buyers.
                </p>
            </div>

            {/* Summary */}
            <div className="grid gap-8 lg:grid-cols-3">
                {/* Overall */}
                <div className="flex flex-col items-center justify-center rounded-2xl bg-gray-50 p-6">
                    <div className="flex items-center gap-2">
                        <Star
                            className="fill-yellow-400 text-yellow-400"
                            size={28}
                        />
                        <span className="text-5xl font-bold">
                            {rating}
                        </span>
                    </div>

                    <p className="mt-2 text-gray-500">
                        {totalReviews} Reviews
                    </p>
                </div>

                {/* Distribution */}
                <div className="space-y-3 lg:col-span-2">
                    {distribution.map((item) => (
                        <div
                            key={item.stars}
                            className="flex items-center gap-3"
                        >
                            <span className="w-5 text-sm font-medium">
                                {item.stars}
                            </span>

                            <Star
                                size={15}
                                className="fill-yellow-400 text-yellow-400"
                            />

                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200">
                                <div
                                    className="h-full rounded-full bg-yellow-400"
                                    style={{ width: `${item.value}%` }}
                                />
                            </div>

                            <span className="w-10 text-right text-sm text-gray-500">
                                {item.value}%
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Reviews */}
            <div className="mt-10 space-y-5">
                {reviews.map((review) => (
                    <div
                        key={review.id}
                        className="rounded-2xl border border-gray-200 p-5 transition hover:border-primary/30 hover:shadow-md"
                    >
                        <div className="flex items-start justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900">
                                    {review.customer}
                                </h4>

                                {review.company && (
                                    <p className="text-sm text-gray-500">
                                        {review.company}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                                <CheckCircle size={15} />
                                Verified Buyer
                            </div>
                        </div>

                        <div className="mt-3 flex">
                            {Array.from({ length: 5 }).map((_, index) => (
                                <Star
                                    key={index}
                                    size={16}
                                    className={
                                        index < review.rating
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                    }
                                />
                            ))}
                        </div>

                        <p className="mt-4 leading-7 text-gray-600">
                            {review.comment}
                        </p>

                        <p className="mt-4 text-sm text-gray-400">
                            {review.date}
                        </p>
                    </div>
                ))}
            </div>

            {/* CTA */}
            <div className="mt-8 text-center">
                <button className="rounded-xl border border-primary px-6 py-3 font-semibold text-primary transition hover:bg-primary hover:text-white">
                    View All Reviews
                </button>
            </div>
        </section>
    );
}