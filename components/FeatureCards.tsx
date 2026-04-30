import React from "react";
import { Mic, Brain, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Voice Sessions",
    description:
      "Real-time voice conversations with AI companions. Ask questions, discuss concepts, and learn naturally — just like talking to a tutor.",
    accent: "var(--accent-amber)",
    accentBg: "rgba(245, 158, 11, 0.1)",
    accentBorder: "rgba(245, 158, 11, 0.2)",
  },
  {
    icon: Brain,
    title: "Personalized Learning",
    description:
      "Choose your subject, topic, teaching style, and voice. Every companion is tailored to how you learn best.",
    accent: "var(--accent-violet)",
    accentBg: "rgba(139, 92, 246, 0.1)",
    accentBorder: "rgba(139, 92, 246, 0.2)",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Review session history, bookmark favorites, and build your personal library of companions to revisit anytime.",
    accent: "#22c55e",
    accentBg: "rgba(34, 197, 94, 0.1)",
    accentBorder: "rgba(34, 197, 94, 0.2)",
  },
];

const FeatureCards = () => {
  return (
    <section className="flex flex-col items-center gap-12 py-12" id="features">
      <div className="text-center flex flex-col gap-3">
        <span className="section-label">Why Converso?</span>
        <h2
          className="text-3xl md:text-4xl font-bold"
          style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
          Everything you need to{" "}
          <span className="gradient-text-violet">learn smarter</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {features.map((feature, index) => (
          <article
            key={feature.title}
            className={`feature-card animate-fadeInUp`}
            style={{ animationDelay: `${index * 0.15}s` }}
          >
            <div
              className="feature-card-icon"
              style={{
                background: feature.accentBg,
                borderColor: feature.accentBorder,
              }}
            >
              <feature.icon
                size={22}
                style={{ color: feature.accent }}
                strokeWidth={2}
              />
            </div>
            <h3
              className="text-xl font-bold"
              style={{ fontFamily: "'Bricolage Grotesque', sans-serif" }}
            >
              {feature.title}
            </h3>
            <p style={{ color: "var(--text-secondary)", lineHeight: 1.7 }}>
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
