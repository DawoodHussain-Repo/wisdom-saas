import Image from "next/image";
import Link from "next/link";
import React from "react";

const CTA = () => {
  return (
    <section className="cta-section" id="cta-section">
      <div className="cta-badge">Start Learning Now</div>
      <h2
        className="text-3xl font-bold relative z-10"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        Build and Personalize{" "}
        <span className="gradient-text">Your Companion</span>
      </h2>
      <p
        className="relative z-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Unlock your potential with AI-powered companions tailored to your
        needs. Start your journey today!
      </p>
      <Image
        src={"images/cta.svg"}
        alt="CTA Image"
        width={500}
        height={300}
        className="cta-image relative z-10"
      />
      <Link
        href={"/companions/new"}
        className="btn-primary animate-pulseGlow relative z-10"
        id="cta-build-companion"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5v14" />
        </svg>
        <p>Build a New Companion</p>
      </Link>
    </section>
  );
};

export default CTA;
