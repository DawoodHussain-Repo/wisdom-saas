import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import CardSwap, { Card } from "@/components/ui/CardSwap";

export default function HeroSection() {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-between gap-12 py-20 max-w-[1200px] mx-auto w-full">
      <div className="flex flex-col text-left gap-8 max-w-2xl flex-1">
        <div className="inline-flex w-fit items-center gap-2 px-3 py-1 rounded-full border border-black bg-white text-sm font-semibold mb-2">
          <span className="w-2 h-2 rounded-full bg-[var(--color-accent)] animate-pulse" />
          Converso 2.0 is Here
        </div>
        
        <h1 className="text-5xl md:text-7xl leading-[1.1]">
          Master Any Subject, One Conversation at a Time
        </h1>
        
        <p className="text-xl text-[var(--color-text-secondary)] leading-relaxed">
          Personalized AI voice tutors that adapt to your pace. Choose a subject,
          start talking, and learn naturally through voice interaction.
        </p>
        
        <div className="flex gap-4 flex-wrap mt-2">
          <SignUpButton>
            <button className="btn-primary text-lg px-8 py-4 cursor-pointer">
              Get Started Free
            </button>
          </SignUpButton>
          <Link href="#how-it-works" className="btn-signin text-lg px-8 py-4">
            See How It Works
            <ArrowRight size={20} />
          </Link>
        </div>
        
        <div className="flex items-center gap-4 mt-6 text-sm text-[var(--color-text-muted)]">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white" />
            <div className="w-8 h-8 rounded-full bg-gray-400 border-2 border-white" />
          </div>
          <p>Join 10,000+ learners today</p>
        </div>
      </div>
      
      <div className="flex-1 w-full flex justify-center items-center h-[500px] relative hidden md:flex">
        <CardSwap
          width={350}
          height={450}
          cardDistance={50}
          verticalDistance={60}
          delay={4000}
          pauseOnHover={true}
        >
          <Card className="flex flex-col justify-between p-8 shadow-2xl border-2 border-black" style={{ backgroundColor: '#ffdfb9' }}>
            <div>
              <div className="bg-black text-white text-xs px-2 py-1 rounded-full w-fit mb-4">Mathematics</div>
              <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-2">Calculus & Integrals</h3>
              <p className="text-black/70">Master derivatives, integrals, and limits with a step-by-step interactive voice guide.</p>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-black w-2/3" />
              </div>
            </div>
          </Card>
          
          <Card className="flex flex-col justify-between p-8 shadow-2xl border-2 border-black" style={{ backgroundColor: '#c5b4ff' }}>
            <div>
              <div className="bg-black text-white text-xs px-2 py-1 rounded-full w-fit mb-4">Science</div>
              <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-2">Quantum Physics</h3>
              <p className="text-black/70">Explore the bizarre world of subatomic particles through an engaging conversational approach.</p>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-black w-1/2" />
              </div>
            </div>
          </Card>
          
          <Card className="flex flex-col justify-between p-8 shadow-2xl border-2 border-black" style={{ backgroundColor: '#b7ecd7' }}>
            <div>
              <div className="bg-black text-white text-xs px-2 py-1 rounded-full w-fit mb-4">Programming</div>
              <h3 className="text-3xl font-bold font-[var(--font-heading)] mb-2">React & Next.js</h3>
              <p className="text-black/70">Build modern web applications by talking through architecture and component design.</p>
            </div>
            <div className="flex items-center gap-2 mt-8">
              <div className="w-10 h-10 rounded-full bg-black flex items-center justify-center">
                <span className="text-white text-xs">AI</span>
              </div>
              <div className="h-2 w-24 bg-black/20 rounded-full overflow-hidden">
                <div className="h-full bg-black w-4/5" />
              </div>
            </div>
          </Card>
        </CardSwap>
      </div>
    </section>
  );
}
