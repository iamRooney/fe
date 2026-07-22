import Container from "@/components/ui/Container";
import HeroBackground from "./HeroBackground";
import HeroContent from "./HeroContent";
import RequirementForm from "@/components/forms/RequirementForm";

export default function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-[#072B66] via-[#0B4A96] to-[#0D7ED8]">

            <HeroBackground />

            <Container>

                <div className="relative grid items-center gap-10 py-12 sm:py-16 lg:min-h-[640px] lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                    <HeroContent />

                    <RequirementForm />

                </div>

            </Container>

        </section>

    );


}