import {
    BriefcaseBusiness,
    ShieldCheck,
    BadgeCheck,
    Headphones,
} from "lucide-react";

import { Check } from "lucide-react";

export const trustSealFeatures = [
    {
        icon: BriefcaseBusiness,
        title: "Purchase Manager",
        description:
            "Dedicated sourcing expert handling supplier shortlisting, price negotiations and deal closure.",
        highlight: "Save time, get expert help →",
    },
    {
        icon: ShieldCheck,
        title: "Payment Protection (₹10L)",
        description:
            "Built-in financial security against fraud, advance payment risks and delivery disputes.",
        highlight: "Confidence for higher-value orders →",
    },
    {
        icon: BadgeCheck,
        title: "Verified TrustSEAL Badge",
        description:
            "Your verified credibility mark across Exbhex, improving response rates and pricing.",
        highlight: "Faster replies + better pricing →",
    },
    {
        icon: Headphones,
        title: "Priority 24×7 Support",
        description:
            "Dedicated priority support for complex orders, disputes and account management.",
        highlight: "Never get stuck, always forward →",
    },
];

export const pricingPlans = [
    {
        id: "basic",
        name: "Basic",
        price: "Free",
        description: "For occasional buyers",
        button: "Current Plan",
        highlighted: false,
        features: [
            "Verified Buyer Profile",
            "30 RFQs / month",
            "Standard Support",
            "Basic Supplier Search",
        ],
    },
    {
        id: "trustseal",
        name: "TrustSEAL Buyer",
        price: "₹999",
        duration: "/month",
        description: "Recommended for businesses",
        button: "Upgrade Now",
        highlighted: true,
        features: [
            // "Dedicated Purchase Manager",
            "₹10L Payment Protection",
            "Priority Supplier Matching",
            "Unlimited RFQs",
            "24×7 Priority Support",
            "Verified TrustSEAL Badge",
        ],
    },
];

export const testimonials = [
    {
        id: 1,
        name: "Rahul Sharma",
        company: "ABC Engineering",
        review:
            "TrustSEAL helped us source reliable suppliers quickly. The Purchase Manager saved us weeks of effort.",
    },
    {
        id: 2,
        name: "Priya Nair",
        company: "Metro Industries",
        review:
            "Payment Protection gave us confidence to place larger orders. Highly recommended.",
    },
    {
        id: 3,
        name: "Amit Verma",
        company: "Tech Manufacturing",
        review:
            "Supplier quality and response time improved dramatically after upgrading.",
    },
];

export const faqs = [
    {
        question: "What is TrustSEAL Buyer?",
        answer:
            "TrustSEAL Buyer provides verified sourcing, payment protection and dedicated purchase support.",
    },
    {
        question: "What does ₹10L payment protection cover?",
        answer:
            "It protects eligible transactions against fraud, delivery disputes and specified payment risks.",
    },
    {
        question: "Can I cancel anytime?",
        answer:
            "Yes. Membership can be cancelled according to the applicable subscription terms.",
    },
    {
        question: "Will I get priority support?",
        answer:
            "Yes, TrustSEAL members receive priority customer support.",
    },
];