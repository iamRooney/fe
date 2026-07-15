import Container from "@/components/ui/Container";
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
        <main className="py-6">
            <Container>
                <ProductBreadcrumb />

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
    );
}