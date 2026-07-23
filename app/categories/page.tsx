import Header from "@/components/layout/Header";
import Container from "@/components/ui/Container";

import Breadcrumb from "@/components/category/layout/Breadcrumb";
import CityBar from "@/components/category/layout/CityBar";

import FilterSidebar from "@/components/category/sidebar/filtersidebar";

import ProductGrid from "@/components/category/products/ProductGrid";

import RFQSection from "@/components/category/rfq/RFQSection";
import BenefitsCard from "@/components/category/rfq/BenefitsCard";

import FeedbackSection from "@/components/category/feedback/FeedbackSection";

import RecentlyViewed from "@/components/category/recently-viewed/RecentlyViewed";

export default function CategoryPage() {
    return (
        <>
            <Header />

            <main className="bg-[#F5F7FA] min-h-screen py-6">
                <Container>

                    {/* Breadcrumb */}
                    <Breadcrumb
                        items={[
                            { label: "Home", href: "/" },
                            { label: "Categories", href: "/categories" },
                            { label: "Arduino Development Boards" },
                        ]}
                    />

                    {/* Nearby Cities */}
                    <CityBar />

                    {/* Main Content */}
                    <div className="mt-6 flex flex-col items-start gap-6 lg:flex-row">

                        {/* Left Sidebar */}
                        <FilterSidebar />

                        {/* Right Content */}
                        <div className="w-full flex-1 space-y-6">

                            <ProductGrid />

                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                                <div className="lg:col-span-2">
                                    <RFQSection />
                                </div>

                                <BenefitsCard />
                            </div>

                            <FeedbackSection />

                            <RecentlyViewed />

                        </div>

                    </div>

                </Container>
            </main>
        </>
    );
}