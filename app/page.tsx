import { SignedIn, SignedOut, SignUpButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Plus, Library, Compass } from "lucide-react";
import Link from "next/link";
import HowItWorks from "@/components/landing/HowItWorks";
import SubjectShowcase from "@/components/landing/SubjectShowcase";
import Pricing from "@/components/landing/Pricing";
import CompanionsList from "@/components/CompanionsList";
import {
  getUserCompanions,
  getUserSessions,
} from "@/lib/actions/companion.actions";

async function SignedInDashboard() {
  const user = await currentUser();
  if (!user) return null;

  const [recentSessions, userCompanions] = await Promise.all([
    getUserSessions(user.id, 5),
    getUserCompanions(user.id),
  ]);

  return (
    <div className="flex flex-col gap-10">
      {/* Welcome */}
      <section className="flex flex-col gap-2">
        <span className="section-label">Dashboard</span>
        <h1 className="text-4xl">Welcome back, {user.firstName}</h1>
        <p className="text-[var(--color-text-secondary)]">
          Pick up where you left off or start something new.
        </p>
      </section>

      {/* Quick actions */}
      <section className="flex gap-4 flex-wrap">
        <Link href="/companions/new" className="btn-primary px-6 py-3">
          <Plus size={18} />
          Build New Companion
        </Link>
        <Link href="/companions" className="btn-signin px-6 py-3">
          <Library size={18} />
          Companion Library
        </Link>
        <Link href="/my-journey" className="btn-signin px-6 py-3">
          <Compass size={18} />
          My Journey
        </Link>
      </section>

      {/* Recent sessions */}
      {recentSessions.length > 0 && (
        <CompanionsList
          title="Recent Sessions"
          companions={recentSessions}
        />
      )}

      {/* Companions summary */}
      {userCompanions.length > 0 ? (
        <section className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl">Your Companions</h2>
            <Link
              href="/my-journey"
              className="flex items-center gap-1 text-sm font-medium text-[var(--color-accent)] hover:underline"
            >
              See all <ArrowRight size={14} />
            </Link>
          </div>
          <p className="text-[var(--color-text-secondary)]">
            You have {userCompanions.length} companion{userCompanions.length !== 1 ? "s" : ""}.
            Head to your journey page to manage them.
          </p>
        </section>
      ) : (
        <section className="rounded-4xl border border-black p-10 text-center flex flex-col items-center gap-4">
          <h2 className="text-2xl">No companions yet</h2>
          <p className="text-[var(--color-text-secondary)] max-w-md">
            Create your first AI learning companion and start an interactive voice session.
          </p>
          <Link href="/companions/new" className="btn-primary px-6 py-3">
            <Plus size={18} />
            Create Your First Companion
          </Link>
        </section>
      )}
    </div>
  );
}

function GuestHero() {
  return (
    <section className="flex flex-col items-center text-center gap-8 py-20">
      <h1 className="text-5xl md:text-6xl leading-tight max-w-3xl">
        Master Any Subject, One Conversation at a Time
      </h1>
      <p className="text-lg text-[var(--color-text-secondary)] max-w-xl leading-relaxed">
        Personalized AI voice tutors that adapt to your pace. Choose a subject,
        start talking, and learn naturally.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <SignUpButton>
          <button className="btn-primary text-base px-8 py-3 cursor-pointer">
            Get Started Free
          </button>
        </SignUpButton>
        <Link href="#how-it-works" className="btn-signin text-base px-8 py-3">
          See How It Works
          <ArrowRight size={16} />
        </Link>
      </div>
    </section>
  );
}

export default async function Page() {
  return (
    <main>
      <SignedOut>
        <GuestHero />
        <div id="how-it-works">
          <HowItWorks />
        </div>
        <SubjectShowcase />
        <Pricing />
        {/* Final CTA */}
        <section className="bg-cta text-white rounded-4xl px-8 py-16 flex flex-col items-center text-center gap-6 mb-10">
          <div className="cta-badge">Ready to start?</div>
          <h2 className="text-3xl text-white">
            Your personal AI tutor is one click away
          </h2>
          <p className="text-white/70 max-w-lg">
            Join learners mastering new subjects with AI companions.
            Build yours in under a minute.
          </p>
          <SignUpButton>
            <button className="bg-cta-gold text-black rounded-xl px-8 py-3 font-semibold cursor-pointer hover:opacity-90 transition-opacity duration-150">
              Sign Up Free
            </button>
          </SignUpButton>
        </section>
      </SignedOut>

      <SignedIn>
        <SignedInDashboard />
      </SignedIn>
    </main>
  );
}