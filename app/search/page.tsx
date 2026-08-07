import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer/Footer";
import Container from "@/components/ui/Container";
import SearchResults from "@/components/search/SearchResults";
import SearchFilters from "@/components/search/SearchFilters";

interface SearchPageProps {
    searchParams: Promise<{
        q?: string;
        location?: string;
        category?: string;
        min_price?: string;
        max_price?: string;
    }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, location, category, min_price, max_price } = await searchParams;
    const query = (q ?? "").trim();
    const locationQuery = (location ?? "").trim();
    const categoryQuery = (category ?? "").trim();
    const minPrice = (min_price ?? "").trim();
    const maxPrice = (max_price ?? "").trim();

    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#F5F7FA] py-10">
                <Container>

                    <p className="text-sm text-gray-500">
                        {query ? `Showing results for "${query}"` : "Showing all results"}
                        {locationQuery ? ` near ${locationQuery}` : ""}
                    </p>

                    <h1 className="mt-1 text-3xl font-bold text-[#1F2937]">
                        Search Results
                    </h1>

                    <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-start">

                        <SearchFilters
                            query={query}
                            location={locationQuery}
                            minPrice={minPrice}
                            maxPrice={maxPrice}
                        />

                        <div className="flex-1">
                            <SearchResults
                                query={query}
                                location={locationQuery}
                                category={categoryQuery}
                                minPrice={minPrice}
                                maxPrice={maxPrice}
                            />
                        </div>

                    </div>

                </Container>
            </main>

            <Footer />
        </>
    );
}