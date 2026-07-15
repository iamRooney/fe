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

                        <p className="mt-2 text-gray-500">
                            Sourcing made easy across diverse industrial sectors.
                        </p>

                        <p className="text-3xl font-bold text-gray-500">
                            Explore Popular Categories
                        </p>



                    </div>

                    <button className="rounded-full border px-5 py-2 hover:bg-gray-100 text-gray-500">
                        View All →
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