import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer/Footer";
import Container from "@/components/ui/Container";

import Breadcrumb from "@/components/category/layout/Breadcrumb";
import CityBar from "@/components/category/layout/CityBar";
import CategoryHeader from "@/components/category/layout/CategoryHeader";

export default function CategoryPage() {
    return (
        <>
            <Header />

            <main className="min-h-screen bg-[#F5F7FA] py-6">
                <Container>
                    <Breadcrumb />

                    <CityBar />

                    <CategoryHeader />

                    {/* Phase 2 starts here */}
                    <div className="mt-6 rounded-xl border-2 border-dashed border-gray-300 bg-white p-16 text-center text-gray-400">
                        Sidebar + Products will be built in Phase 2
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}