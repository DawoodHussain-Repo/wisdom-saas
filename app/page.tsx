import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import HeroSection from "@/components/HeroSection";
import FeatureCards from "@/components/FeatureCards";
import {
  getAllCompanions,
  getRecentSessions,
} from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import Link from "next/link";

const Page = async () => {
  const companions = await getAllCompanions({ limit: 3 });
  const recentSessionsCompanions = await getRecentSessions(10);

  return (
    <main>
      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <FeatureCards />

      {/* Popular Companions */}
      <section className="flex flex-col gap-6 py-8" id="popular-companions">
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-1">
            <span className="section-label">Popular</span>
            <h2
              className="text-2xl md:text-3xl font-bold"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              Trending Companions
            </h2>
          </div>
          <Link
            href="/companions"
            className="btn-signin text-sm"
            id="view-all-companions"
          >
            View All
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        <div className="companions-grid">
          {companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}
        </div>
      </section>

      {/* Recent Sessions + CTA */}
      <section className="home-section py-8">
        <CompanionsList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg:w-full"
        />
        <CTA />
      </section>

      {/* Bottom CTA — Full Width */}
      <section
        className="rounded-2xl px-8 py-16 flex flex-col items-center text-center gap-6 relative overflow-hidden mb-10"
        id="bottom-cta"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,158,11,0.08) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid var(--border-subtle)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <span className="cta-badge">Ready to start?</span>
        <h2
          className="text-3xl md:text-4xl font-bold relative z-10"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Your personal AI tutor is{" "}
          <span className="gradient-text">one click away</span>
        </h2>
        <p
          className="max-w-xl relative z-10"
          style={{ color: "var(--text-secondary)" }}
        >
          Join thousands of learners who are mastering new subjects with
          AI-powered companions. Build yours in under a minute.
        </p>
        <Link
          href="/companions/new"
          className="btn-primary text-lg px-8 py-3 animate-pulseGlow relative z-10"
          id="bottom-cta-button"
        >
          Get Started — It&apos;s Free
        </Link>
      </section>
    </main>
  );
};

export default Page;