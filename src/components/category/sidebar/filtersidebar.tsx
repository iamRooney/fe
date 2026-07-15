import FilterSection from "./FilterSection";
import RelatedBrands from "./RelatedBrands";
import RecommendedSearches from "./recommendedsearches";

export default function FilterSidebar() {
    return (
        <aside className="w-[280px] shrink-0 space-y-4 text-gray-500">
            <FilterSection title="Price">
                <div className="space-y-3">
                    {[
                        "Below ₹250",
                        "₹251 - ₹500",
                        "₹501 - ₹1000",
                        "Above ₹1000",
                    ].map((item) => (
                        <label
                            key={item}
                            className="flex items-center gap-2 text-sm"
                        >
                            <input type="radio" name="price" />
                            {item}
                        </label>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Business Credentials">
                <div className="space-y-3">
                    <label className="flex gap-2 text-sm">
                        <input type="checkbox" />
                        Annual Turnover ₹5 Cr+
                    </label>

                    <label className="flex gap-2 text-sm">
                        <input type="checkbox" />
                        GST Registered 3+ Years
                    </label>
                </div>
            </FilterSection>

            <FilterSection title="Board Series">
                <div className="space-y-2 text-sm">
                    {[
                        "Uno",
                        "Mega",
                        "Nano",
                        "Due",
                        "Leonardo",
                        "Pro Mini",
                    ].map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Business Type">
                <div className="space-y-2 text-sm">
                    {[
                        "Manufacturer",
                        "Exporter",
                        "Wholesaler",
                        "Retailer",
                    ].map((item) => (
                        <p key={item}>{item}</p>
                    ))}
                </div>
            </FilterSection>

            <FilterSection title="Related Brands">
                <RelatedBrands />
            </FilterSection>

            <FilterSection title="Recommended Searches">
                <RecommendedSearches />
            </FilterSection>
        </aside>
    );
}