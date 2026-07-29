import PolicySection from "./PolicySection";

export default function PolicyContent() {
    return (
        <div className="space-y-10 text-[#0D3B7A]">

            <PolicySection
                id="privacy"
                title="Privacy Policy"
            >
                At Exbhex, your privacy matters.
                We collect only the information
                necessary to create your account,
                display your business profile, and
                connect buyers with suppliers. Your
                information is protected using
                industry-standard security practices,
                and we never sell your personal data.
                Any business information you choose to
                publish, such as your company name,
                products, or contact details, may be
                visible to other users of the platform.

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