import Container from "@/components/ui/Container";
import CategoryCard from "@/components/cards/CategoryCard";
import { categories } from "@/data/categories";
import { ArrowRight } from "lucide-react";

export default function Categories() {
    return (
        <section className="bg-white py-14">

            <Container>

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-sm text-gray-600">
                            Explore Popular Categories
                        </p>

                        <p className="mt-2 text-gray-500">
                            Sourcing made easy across diverse industrial sectors.
                        </p>

                    </div>

                    <button
                        className="
            flex
            items-center
            gap-2
            text-[#18B5F7]
            text-sm
            hover:gap-3
            transition-all
            "
                    >
                        View All

                        <ArrowRight size={16} />

                    </button>

                </div>

                <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4 xl:grid-cols-8">

                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            title={category.title}
                            icon={category.icon}
                        />
                    ))}
                </div>

            </Container>

        </section>
    );
}