import { notFound } from "next/navigation";

import Container from "@/components/ui/Container";
import Header from "@/components/layout/Header";
import Footer from "@/components/home/Footer/Footer";
import RequireAuth from "@/components/auth/RequireAuth";
import {
    ProductBreadcrumb,
    ProductGallery,
    ProductInfo,
    SupplierCard,
    InquiryForm,
    ProductTabs,
    SimilarProducts,
    ProductViewTracker,
} from "@/components/product-details";
import { fetchProductBySlug } from "@/lib/home";
import { ApiError } from "@/lib/api";

interface ProductDetailsPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function ProductDetailsPage({
    params,
}: ProductDetailsPageProps) {
    const { slug } = await params;

    let product;
    try {
        product = await fetchProductBySlug(slug);
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            notFound();
        }
        throw err;
    }

    const company = product.company;
    const supplierLocation =
        [company?.city?.name, company?.state?.name].filter(Boolean).join(", ") ||
        "Location not provided";

    // Main image first, then any extra gallery shots, deduped.
    const images = Array.from(
        new Set([product.image_url, ...product.gallery_urls].filter(Boolean))
    ) as string[];

    return (
        <RequireAuth>
            <ProductViewTracker productId={product.id} />
            <Header />
            <main className="bg-[#F5F7FA] min-h-screen py-6">

                <Container>
                    <ProductBreadcrumb
                        product={{ name: product.name }}
                        category={product.category}
                    />

                    <div className="mt-6 grid grid-cols-12 gap-6">
                        {/* Left */}
                        <div className="col-span-8 space-y-6">
                            <ProductGallery images={images} name={product.name} />

                            <ProductInfo
                                name={product.name}
                                price={product.price}
                                unit={product.unit}
                                shortDescription={product.short_description}
                                views={product.views}
                            />

                            <ProductTabs
                                description={product.description}
                                price={product.price}
                                unit={product.unit}
                                categoryName={product.category?.name ?? null}
                                supplierLocation={supplierLocation}
                            />

                            <SimilarProducts
                                categorySlug={product.category?.slug ?? null}
                                excludeProductId={product.id}
                            />
                        </div>

                        {/* Right */}
                        <div className="col-span-4 space-y-6">
                            {company && (
                                <SupplierCard
                                    name={company.name}
                                    slug={company.slug}
                                    verified={company.verified}
                                    location={supplierLocation}
                                    yearsInBusiness={company.years_in_business ?? null}
                                    responseRate={company.response_rate ?? null}
                                    annualTurnover={company.annual_turnover ?? null}
                                    staffCount={company.staff_count ?? null}
                                />
                            )}

                            {company && (
                                <InquiryForm companyId={company.id} productId={product.id} />
                            )}
                        </div>
                    </div>
                </Container>
            </main>
            <Footer />
        </RequireAuth>
    );
}