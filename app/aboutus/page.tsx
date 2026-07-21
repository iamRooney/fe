import Hero from "@/components/about/Hero";
import AboutSection from "@/components/about/AboutSection";
import MissionVision from "@/components/about/MissionVision";
import Features from "@/components/about/Features";
import WhyChoose from "@/components/about/WhyChoose";
import Stats from "@/components/about/Stats";
import HowItWorks from "@/components/about/HowItWorks";

import Contact from "@/components/about/Contact";
import FAQ from "@/components/about/FAQ";
import Terms from "@/components/about/Terms";
import Privacy from "@/components/about/Privacy";
import CTA from "@/components/about/CTA";

export default function AboutUsPage() {
    return (
        <main className="bg-white">
            <Hero />
            <AboutSection />
            <MissionVision />
            <Features />
            <WhyChoose />
            <Stats />
            <HowItWorks />

            <Contact sectionId="contact" />
            <FAQ />
            <Terms />
            <Privacy />
            <CTA />
        </main>
    );
}