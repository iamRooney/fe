import Image from "next/image";
import SocialLinks from "./socialLinks";
import Newsletter from "./Newsletter";
import FooterLinks from "./FooterLink";
import Copyright from "./Copyright";

import {
    companyLinks,
    helpLinks,
    policies,
} from "./footerData";

export default function Footer() {
    return (
        <footer className="bg-[#0A2F69] text-white">
            <div className="mx-auto grid max-w-7xl gap-14 px-6 py-16 lg:grid-cols-5">

                {/* Logo */}

                <div className="lg:col-span-2">

                    <Image
                        src="/images/exbhex.png"
                        width={180}
                        height={50}
                        alt="Exbhex"
                        className="rounded-[20px]"
                    />

                    <p className="mt-6 max-w-md leading-8 text-gray-300">
                        Exbhex is the world's leading B2B sourcing
                        platform connecting buyers with trusted
                        manufacturers and suppliers across
                        hundreds of industries.
                    </p>

                    <SocialLinks />

                </div>

                <FooterLinks
                    title="Company"
                    links={companyLinks}
                />

                <FooterLinks
                    title="Policies"
                    links={policies}
                />

                <Newsletter />

            </div>

            <Copyright />
        </footer>
    );
}