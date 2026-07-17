import Header from "@/components/trustseal/Header";
import Hero from "@/components/trustseal/Hero";
import FeatureGrid from "@/components/trustseal/FeatureGrid";
import Pricing from "@/components/trustseal/Pricing";
import Testimonials from "@/components/trustseal/Testimonials";
import FAQ from "@/components/trustseal/FAQ";
import CTA from "@/components/trustseal/CTA";
import Footer from "@/components/home/Footer/Footer";

export default function TrustSealPage() {
    return (
        <main className="bg-white">

            <Header />

            <Hero />

            <section id="benefits" className="bg-[#F7F8FC] py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <FeatureGrid />
                </div>
            </section>

            <section id="pricing" className="py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Pricing />
                </div>
            </section>

            <section id="reviews" className="bg-[#F7F8FC] py-24">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <Testimonials />
                </div>
            </section>

            <section id="faqs" className="py-24">
                <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                    <FAQ />
                </div>
            </section>

            <CTA />
            <Footer />

        </main>
    );
}