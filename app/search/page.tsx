import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer/Footer";
import Container from "@/components/ui/Container";
import SearchResults from "@/components/search/SearchResults";

interface SearchPageProps {
    searchParams: Promise<{ q?: string; location?: string }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
    const { q, location } = await searchParams;
    const query = (q ?? "").trim();
    const locationQuery = (location ?? "").trim();

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

                    <div className="mt-8">
                        <SearchResults query={query} location={locationQuery} />
                    </div>

                </Container>
            </main>

            <Footer />
        </>
    );
}