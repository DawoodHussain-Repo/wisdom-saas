import { BookOpen, Mic, BarChart3 } from "lucide-react";
import Link from "next/link";

const STEPS = [
  {
    icon: BookOpen,
    title: "Create Your Companion",
    description: "Pick a subject, set a topic, choose voice and teaching style.",
  },
  {
    icon: Mic,
    title: "Start a Voice Session",
    description: "Have a real-time conversation with your personal AI tutor.",
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Review sessions, bookmark favorites, build your library.",
  },
] as const;

export default function HowItWorks() {
  return (
    <section className="flex flex-col items-center gap-10 py-16">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">How It Works</span>
        <h2 className="text-3xl">Three steps to smarter learning</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {STEPS.map((step, i) => (
          <article key={step.title} className="flex flex-col items-center text-center gap-4">
            <div className="step-number">{i + 1}</div>
            <step.icon size={32} strokeWidth={1.5} className="text-[var(--color-text)]" />
            <h3 className="text-xl">{step.title}</h3>
            <p className="text-[var(--color-text-secondary)] leading-relaxed">
              {step.description}
            </p>
          </article>
        ))}
      </div>

      <Link href="/companions/new" className="btn-primary text-base px-6 py-3">
        Get Started
      </Link>
    </section>
  );
}
