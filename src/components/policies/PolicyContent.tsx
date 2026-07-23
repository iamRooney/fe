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
                Exbhex is a marketplace designed
                to help businesses discover reliable
                suppliers. Buyers are encouraged to
                review supplier profiles, verify business
                information, and discuss pricing, specifications,
                and delivery terms directly with the supplier
                before making any business decisions. Exbhex is
                not a party to any transaction and does not
                guarantee the quality, availability, or performance
                of products or services listed on the platform.

            </PolicySection>

            <PolicySection
                id="seller-policy"
                title="Seller Policy"
            >
                Suppliers are expected to maintain
                accurate business information and
                provide genuine product listings.
                All descriptions, images, pricing,
                and specifications should reflect
                the actual products or services being
                offered. Exbhex reserves the right to
                remove misleading content or suspend
                accounts that violate platform policies
                to maintain a trusted marketplace.

            </PolicySection>

            <PolicySection
                id="terms"
                title="Terms & Conditions"
            >
                By accessing or using Exbhex, you agree
                to use the platform responsibly and provide
                accurate information at all times. Exbhex
                serves solely as a platform connecting buyers
                and suppliers and does not participate in negotiations,
                payments, shipping, or product delivery. Users are responsible
                for their own business decisions and agreements.

            </PolicySection>

            <PolicySection
                id="refund"
                title="Refund Policy"
            >
                Exbhex does not sell products or process payments
                between buyers and suppliers. Any requests related
                to refunds, returns, cancellations, or replacements
                must be resolved directly between the parties involved.
                Exbhex is not responsible for disputes arising from
                transactions conducted through the platform.

            </PolicySection>

            <PolicySection
                id="cookies"
                title="Cookie Policy"
            >
                Exbhex uses cookies to improve your browsing experience,
                remember your preferences, maintain secure login sessions,
                and analyze website performance. By continuing to use our
                website, you consent to the use of cookies in accordance with
                this policy. You can manage or disable cookies at any time
                through your browser settings.

            </PolicySection>

            <PolicySection
                id="contact"
                title="Contact Us"
            >
                <p>
                    If you have any questions about our policies or need assistance using Exbhex,
                    our support team is here to help. You can reach us by email at{" "}
                    <a
                        href="mailto:support@exbhex.com"
                        className="font-semibold text-orange-600 hover:text-blue-700 underline"
                    >
                        support@exbhex.com
                    </a>{" "}
                    and we'll respond as quickly as possible during our business hours. Your
                    feedback and inquiries are always welcome.
                </p>
            </PolicySection>

        </div>
    );
}