import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function RequirementForm() {
    return (
        <div className="relative z-20 w-full max-w-[430px] rounded-3xl bg-white p-8 shadow-[0_25px_60px_rgba(0,0,0,0.15)]">

            {/* <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-600">
                FREE QUOTATION
            </span> */}

            <h2 className="mt-4 text-2xl font-bold text-[#072B66]">
                Post Your Requirement
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500">
                Receive multiple quotations from trusted suppliers within hours.
            </p>

            <div className="mt-8 space-y-5 text-gray-500">

                <Input
                    label="Product / Service"
                    placeholder="Eg. LED Television"
                />

                <div className="grid grid-cols-2 gap-4">

                    <Input
                        type="number"
                        label="Quantity"
                        placeholder="100"
                    />

                    <Select label="Unit">
                        <option>Pieces</option>
                        <option>Kg</option>
                        <option>Boxes</option>
                        <option>Litres</option>
                    </Select>

                </div>

                {/* <Input
                    label="Email"
                    type="email"
                    placeholder="company@email.com"
                /> */}

                <Input
                    type="number"
                    label="Mobile Number"
                    placeholder="+91 9876543210"
                />

                <Button
                    type="submit"
                    className="w-full py-4 text-base"
                >
                    Post Requirement
                </Button>

            </div>

            <div className="mt-8 flex justify-between border-t pt-5 text-xs text-gray-500">

                <span>✔ Verified Suppliers</span>

                <span>✔ Secure Enquiry</span>

                <span>✔ Secure Communication</span>

            </div>

        </div>
    );
}