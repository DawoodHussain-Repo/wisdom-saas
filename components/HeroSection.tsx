import Link from "next/link";
import React from "react";

const HeroSection = () => {
  return (
    <section className="hero-section" id="hero">
      {/* Ambient orbs */}
      <div className="hero-orb-1" />
      <div className="hero-orb-2" />

      {/* Badge */}
      <div className="animate-fadeInUp relative">
        <span className="cta-badge inline-flex items-center gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          AI-Powered Learning
        </span>
      </div>

      {/* Headline */}
      <h1
        className="animate-fadeInUp-delay-1 text-5xl md:text-7xl font-bold leading-tight max-w-4xl relative z-10"
        style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
      >
        Learn Anything with{" "}
        <span className="gradient-text">AI Companions</span>
      </h1>

      {/* Subtext */}
      <p
        className="animate-fadeInUp-delay-2 text-lg md:text-xl max-w-2xl relative z-10"
        style={{ color: "var(--text-secondary)" }}
      >
        Personalized voice tutors that adapt to your pace. Interactive
        real-time sessions in Maths, Science, Coding, History, and more —
        powered by cutting-edge AI.
      </p>

      {/* CTA Buttons */}
      <div className="animate-fadeInUp-delay-3 flex items-center gap-4 relative z-10 flex-wrap justify-center">
        <Link
          href="/companions/new"
          className="btn-primary text-lg px-8 py-3 animate-pulseGlow"
          id="hero-cta-primary"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5v14" />
          </svg>
          Build Your Companion
        </Link>
        <Link
          href="/companions"
          className="btn-signin text-lg px-8 py-3"
          id="hero-cta-secondary"
        >
          Explore Library
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Stats row */}
      <div
        className="animate-fadeInUp-delay-3 flex gap-10 mt-4 relative z-10 flex-wrap justify-center"
      >
        {[
          { value: "6+", label: "Subjects" },
          { value: "AI", label: "Voice Tutors" },
          { value: "24/7", label: "Available" },
        ].map((stat) => (
          <div key={stat.label} className="flex flex-col items-center gap-1">
            <span
              className="text-2xl font-bold"
              style={{ color: "var(--accent-amber)" }}
            >
              {stat.value}
            </span>
            <span
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
