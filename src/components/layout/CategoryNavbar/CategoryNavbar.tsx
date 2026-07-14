import Container from "@/components/ui/Container";
import {
    Cpu,
    Factory,
    Shirt,
    Hammer,
    Wheat,
    FlaskConical,
    Grid2X2,
} from "lucide-react";

const categories = [
    { icon: Cpu, label: "Electronics" },
    { icon: Factory, label: "Machinery" },
    { icon: Shirt, label: "Apparel" },
    { icon: Hammer, label: "Construction" },
    { icon: Wheat, label: "Agriculture" },
    { icon: FlaskConical, label: "Chemicals" },
];

export default function CategoryNavbar() {
    return (
        <nav className="bg-[#072B66] text-white">
            <Container>

                <div className="flex h-12 items-center justify-between">

                    <div className="flex gap-10">

                        {categories.map(({ icon: Icon, label }) => (
                            <button
                                key={label}
                                className="flex items-center gap-2 text-sm hover:text-orange-400 transition"
                            >
                                <Icon size={16} />
                                {label}
                            </button>
                        ))}

                    </div>

                    <button className="flex items-center gap-2 hover:text-orange-400 transition">

                        All Categories

                        <Grid2X2 size={18} />

                    </button>

                </div>

            </Container>
        </nav>
    );
}