import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer/Footer";
import {
    ProductBreadcrumb,
    ProductGallery,
    ProductInfo,
    SupplierCard,
    InquiryForm,
    ProductTabs,
    SimilarProducts,
} from "@/components/product-details";

export default function ProductDetailsPage() {
    return (
        <>
            <Header />
        <main className="bg-[#F5F7FA] min-h-screen py-6">
            
            <Container>
                <ProductBreadcrumb product={{ name: "Sample Product" }} />

                <div className="mt-6 grid grid-cols-12 gap-6">
                    {/* Left */}
                    <div className="col-span-8 space-y-6">
                        <ProductGallery />

                        <ProductInfo />

                        <ProductTabs />

                        <SimilarProducts />
                    </div>

                    {/* Right */}
                    <div className="col-span-4 space-y-6">
                        <SupplierCard />

                        <InquiryForm />
                    </div>
                </div>
            </Container>
        </main>
        <Footer />
        </>
    );
}