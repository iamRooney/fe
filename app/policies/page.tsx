import {
    PolicyHero,
    PolicySidebar,
    PolicyContent,
    BackToTop,
} from "@/components/policies";

export default function PoliciesPage() {
    return (
        <main className="bg-slate-50">
            <PolicyHero />

            <section className="mx-auto flex max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8">
                <aside className="hidden w-72 shrink-0 lg:block">
                    <PolicySidebar />
                </aside>

                <div className="min-w-0 flex-1">
                    <PolicyContent />
                </div>
            </section>

            <BackToTop />
        </main>
    );
}