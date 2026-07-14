import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  title: string;
  subtitle: string;
}

export default function SectionHeading({
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-12 flex items-end justify-between">

      <div>

        <p className="text-sm font-semibold uppercase tracking-[3px] text-[#F89A1C]">
          {subtitle}
        </p>

        <h2 className="mt-2 text-4xl font-bold text-[#072B66]">
          {title}
        </h2>

      </div>

      <Link
        href="/categories"
        className="flex items-center gap-2 font-semibold text-[#072B66] hover:text-[#F89A1C]"
      >
        View All

        <ArrowRight size={18} />

      </Link>

    </div>
  );
}