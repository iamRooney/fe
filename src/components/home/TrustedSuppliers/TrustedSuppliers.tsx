import SupplierCard from "./SupplierCard";
import { suppliers } from "./suppliers";

export default function TrustedSuppliers() {
    return (
        <section className="bg-white py-20">
            <div className="mx-auto max-w-7xl px-6">

                <div className="mb-10 flex items-center justify-between">

                    <div>
                        <p className="text-sm text-gray-500">
                            Trusted Global Industrial Suppliers
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-gray-500">
                            Trusted Verified Suppliers
                        </h2>
                    </div>

                    {/* <button className="rounded-full border px-5 py-2 hover:bg-gray-100 text-gray-500">
                        View All →
                    </button> */}

                </div>

                <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

                    {suppliers.map((supplier) => (
                        <SupplierCard
                            key={supplier.id}
                            supplier={supplier}
                        />
                    ))}

                </div>
            </div>
        </section>
    );
}