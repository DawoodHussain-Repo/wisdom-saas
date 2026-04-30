import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CardSwap, { Card } from "@/components/ui/CardSwap";

const SUBJECT_CARDS = [
  {
    subject: "Mathematics",
    title: "Calculus & Integrals",
    description: "Master derivatives, integrals, and limits with a step-by-step interactive voice guide.",
    color: "#ffdfb9",
    progress: 66
  },
  {
    subject: "Science",
    title: "Quantum Physics",
    description: "Explore the bizarre world of subatomic particles through an engaging conversational approach.",
    color: "#c5b4ff",
    progress: 50
  },
  {
    subject: "Programming",
    title: "React & Next.js",
    description: "Build modern web applications by talking through architecture and component design.",
    color: "#b7ecd7",
    progress: 80
  }
] as const;

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 py-12 md:py-16 lg:py-20 max-w-[1200px] mx-auto w-full px-4 md:px-0">
      {/* Left Content */}
      <div className="flex flex-col text-left gap-6 md:gap-8 max-w-2xl flex-1 w-full">
        <div className="inline-flex w-fit items-center gap-2 px-3 py-1.5 rounded-full border border-black bg-white text-xs md:text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" aria-hidden="true" />
          Converso 2.0 is Here
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.1]">
          Master Any Subject, One Conversation at a Time
        </h1>
        
        <p className="text-base sm:text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed">
          Personalized AI voice tutors that adapt to your pace. Choose a subject,
          start talking, and learn naturally through voice interaction.
        </p>
        
        <div className="flex gap-3 md:gap-4 flex-wrap mt-2">
          <SignUpButton>
            <button className="btn-primary text-base md:text-lg px-6 md:px-8 py-3 md:py-4 cursor-pointer">
              Get Started Free
            </button>
          </SignUpButton>
          <Link href="#how-it-works" className="btn-signin text-base md:text-lg px-6 md:px-8 py-3 md:py-4">
            See How It Works
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="flex items-center gap-3 md:gap-4 mt-4 md:mt-6 text-xs sm:text-sm text-[var(--color-text-muted)]">
          <div className="flex -space-x-2" aria-hidden="true">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-200 border-2 border-white" />
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-300 border-2 border-white" />
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-gray-400 border-2 border-white" />
          </div>
          <p>Join 10,000+ learners today</p>
        </div>
      </div>
      
      {/* Right Content - Card Animation */}
      <div className="flex-1 w-full flex justify-center items-center min-h-[500px] relative hidden md:flex">
        <CardSwap
          width={350}
          height={450}
          cardDistance={50}
          verticalDistance={60}
          delay={4000}
          pauseOnHover={true}
        >
          {SUBJECT_CARDS.map((card, index) => (
            <Card 
              key={index}
              className="flex flex-col justify-between p-8 shadow-2xl border-2 border-black" 
              style={{ backgroundColor: card.color }}
            >
              <div>
                <div className="bg-black text-white text-xs px-2 py-1 rounded-full w-fit mb-4">
                  {card.subject}
                </div>
                <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-2">
                  {card.title}
                </h3>
                <p className="text-black/70">
                  {card.description}
                </p>
              </div>
              <div className="flex items-center gap-2 mt-8">
                <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center" aria-label="AI Tutor">
                  <span className="text-white text-xs font-semibold">AI</span>
                </div>
                <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden" role="progressbar" aria-valuenow={card.progress} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full bg-black transition-all duration-300" style={{ width: `${card.progress}%` }} />
                </div>
              </div>
            </Card>
          ))}
        </CardSwap>
      </div>
    </section>
  );
}
