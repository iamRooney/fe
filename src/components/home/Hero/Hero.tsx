import Container from "@/components/ui/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import RequirementForm from "@/components/forms/RequirementForm";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#072B66] via-[#0B4A96] to-[#0D7ED8]">

            <HeroBackground />

            <Container>

                <div className="relative grid min-h-[640px] items-center gap-12 py-16 lg:grid-cols-[1.15fr_0.85fr]">
                    <HeroContent />

                    <RequirementForm />

                </div>

            </Container>

        </section>

    );


}