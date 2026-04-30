import { Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start Learning Now</div>
      <h2 className="text-3xl font-bold text-white">
        Build and Personalize Your Companion
      </h2>
      <p className="text-white/70">
        Unlock your potential with AI-powered companions tailored to your needs.
      </p>
      <Image
        src="images/cta.svg"
        alt="Learning illustration"
        width={500}
        height={300}
      />
      <Link href="/companions/new" className="btn-primary">
        <Plus size={14} />
        Build a New Companion
      </Link>
    </section>
  );
}
