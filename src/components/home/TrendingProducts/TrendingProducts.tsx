import Container from "@/components/ui/Container";
import SectionHeading from "@/components/common/SectionHeading";
import ProductCard from "@/cards/ProductCard/";
import { products } from "@/data/products";

export default function TrendingProducts() {
    return (
        <section className="bg-white py-24">

            <Container>

                <SectionHeading
                    subtitle="Featured"
                    title="Trending Products"
                />

                <div className="mt-8 flex gap-5 overflow-x-auto pb-2">

                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            {...product}
                        />
                    ))}
                </div>

            </Container>

        </section>
    );
}