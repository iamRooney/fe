import PolicySection from "./PolicySection";

export default function PolicyContent() {
    return (
        <div className="space-y-10 text-[#0D3B7A]">

            <PolicySection
                id="privacy"
                title="Privacy Policy"
            >
                Privacy policy content...
            </PolicySection>

            <PolicySection
                id="buyer-policy"
                title="Buyer Policy"
            >
                Buyer policy...
            </PolicySection>

            <PolicySection
                id="seller-policy"
                title="Seller Policy"
            >
                Seller policy...
            </PolicySection>

            <PolicySection
                id="terms"
                title="Terms & Conditions"
            >
                Terms...
            </PolicySection>

            <PolicySection
                id="refund"
                title="Refund Policy"
            >
                Refund...
            </PolicySection>

            <PolicySection
                id="cookies"
                title="Cookie Policy"
            >
                Cookies...
            </PolicySection>

            <PolicySection
                id="contact"
                title="Contact Us"
            >
                Contact...
            </PolicySection>

        </div>
    );
}