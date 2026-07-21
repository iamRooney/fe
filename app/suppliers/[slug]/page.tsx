// app/suppliers/[slug]/page.tsx

import Breadcrumb from "@/components/category/layout/Breadcrumb";
import SupplierHero from "@/components/supplier/SupplierHero";
import SupplierAbout from "@/components/supplier/SupplierAbout";
import SupplierQuickFacts from "@/components/supplier/SupplierQuickFacts";
import SupplierSidebar from "@/components/supplier/SupplierSidebar";

interface SupplierPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SupplierPage({
    params,
}: SupplierPageProps) {
    const { slug } = await params;

    // Temporary data
    // Replace with Laravel API later
    const supplier = {
        id: 1,
        slug,
        name: "Exbhex Industries",
        logo: "/images/exbhex.png",
        banner: "/images/d.jfif",
        verified: true,
        rating: 4.8,
        reviews: 126,
        businessType: "Manufacturer",
        location: "Kochi, Kerala",
        memberSince: 2018,

        about:
            "Exbhex Industries is a trusted manufacturer and supplier of industrial products serving businesses across India. We focus on quality, reliability, and timely delivery.",

        quickFacts: [
            {
                label: "Established",
                value: "2018",
            },
            {
                label: "Employees",
                value: "50+",
            },
            {
                label: "GST",
                value: "Verified",
            },
            {
                label: "Response Rate",
                value: "98%",
            },
            {
                label: "Reply Time",
                value: "15 mins",
            },
            {
                label: "Location",
                value: "Kochi, Kerala",
            },
        ],

        contact: {
            person: "John Mathew",
            phone: "+91 9876543210",
            email: "info@exbhex.com",
            website: "www.exbhex.com",
            address: "Kochi, Kerala",
        },
    };

    return (
        <main className="bg-gray-50">
            <div className="mx-auto max-w-7xl px-6 py-6">

                <Breadcrumb
                    items={[
                        { label: "Home", href: "/" },
                        { label: "Suppliers", href: "/suppliers" },
                        { label: supplier.name },
                    ]}
                />

                <SupplierHero supplier={supplier} />

                <div className="mt-10 grid gap-8 lg:grid-cols-12">

                    <div className="space-y-8 lg:col-span-8">

                        <SupplierAbout about={supplier.about} />

                        <SupplierQuickFacts
                            facts={supplier.quickFacts}
                        />

                    </div>

                    <aside className="lg:col-span-4">

                        <SupplierSidebar
                            contact={supplier.contact}
                        />

                    </aside>

                </div>

            </div>
        </main>
    );
}