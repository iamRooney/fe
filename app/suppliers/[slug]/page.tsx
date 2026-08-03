// app/suppliers/[slug]/page.tsx

import { notFound } from "next/navigation";

import Breadcrumb from "@/components/category/layout/Breadcrumb";
import SupplierHero from "@/components/supplier/SupplierHero";
import SupplierAbout from "@/components/supplier/SupplierAbout";
import SupplierQuickFacts from "@/components/supplier/SupplierQuickFacts";
import SupplierSidebar from "@/components/supplier/SupplierSidebar";
import { fetchCompanyBySlug } from "@/lib/home";
import { ApiError } from "@/lib/api";

interface SupplierPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export default async function SupplierPage({
    params,
}: SupplierPageProps) {
    const { slug } = await params;

    let company;
    try {
        company = await fetchCompanyBySlug(slug);
    } catch (err) {
        if (err instanceof ApiError && err.status === 404) {
            notFound();
        }
        throw err;
    }

    const location = [company.city?.name, company.state?.name]
        .filter(Boolean)
        .join(", ") || "Location not provided";

    // Backend fields the profile still doesn't have yet (rating, reviews,
    // reply time, business type, named contact person) fall back to
    // sensible placeholders below — see the note left in the PR/ticket.
    const supplier = {
        id: company.id,
        slug: company.slug,
        name: company.name,
        logo: company.logo_url ?? "/images/suppliers/supplier-1.jfif",
        banner: "/images/d.jfif",
        verified: company.verified,
        rating: 0,
        reviews: 0,
        businessType: "Supplier",
        location,
        memberSince: company.created_at
            ? new Date(company.created_at).getFullYear()
            : new Date().getFullYear(),

        about:
            company.description ??
            "This supplier hasn't added a company description yet.",

        quickFacts: [
            { label: "Location", value: location },
            { label: "Established (years)", value: String(company.years_in_business ?? 0) },
            // { label: "Employees", value: String(company.staff_count ?? 0) },
            { label: "Response Rate", value: `${company.response_rate ?? 0}%` },
            { label: "GST Number", value: company.gst_number ? "Verified" : "Not provided" },

        ],

        contact: {
            person: company.name,
            phone: company.phone ?? "Not provided",
            email: company.email ?? "Not provided",
            website: company.website ?? "Not provided",
            address: company.address ?? location,
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