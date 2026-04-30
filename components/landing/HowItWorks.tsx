"use client";

import { BookOpen, Mic, BarChart3 } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    icon: BookOpen,
    title: "Create Your Companion",
    description: "Pick a subject, set a topic, choose voice and teaching style.",
    mockup: (
      <div className="flex flex-col gap-3 h-full justify-center w-full max-w-sm mx-auto px-4">
        <h4 className="text-sm font-bold text-[var(--color-text-secondary)] mb-2 uppercase tracking-wide">Companion Builder</h4>
        <div className="w-full bg-[var(--color-bg-subtle)] rounded-lg border border-[var(--color-border)] p-4 flex flex-col gap-2">
          <div className="text-xs font-semibold">Subject & Topic</div>
          <div className="w-full h-8 bg-white rounded border border-[var(--color-border)] flex items-center px-3 text-sm text-[var(--color-text-muted)]">Advanced Calculus...</div>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="w-full bg-white border border-[var(--color-border-strong)] rounded-lg p-3 flex flex-col gap-1 text-center">
            <span className="text-xs font-bold">Voice</span>
            <span className="text-xs text-[var(--color-text-muted)]">British Female</span>
          </div>
          <div className="w-full bg-white border border-[var(--color-border-strong)] rounded-lg p-3 flex flex-col gap-1 text-center">
            <span className="text-xs font-bold">Style</span>
            <span className="text-xs text-[var(--color-text-muted)]">Formal Tutor</span>
          </div>
        </div>
        <div className="w-full h-12 bg-[var(--color-primary)] text-white font-semibold flex items-center justify-center rounded-lg mt-2 shadow-sm">
          Create Companion
        </div>
      </div>
    ),
  },
  {
    icon: Mic,
    title: "Start a Voice Session",
    description: "Have a real-time conversation with your personal AI tutor.",
    mockup: (
      <div className="flex flex-col h-full items-center justify-center gap-6 px-4">
        <div className="text-center">
          <h4 className="font-bold text-lg">Dr. Mathematics</h4>
          <p className="text-sm text-[var(--color-text-secondary)]">Active Session • 04:23</p>
        </div>
        <div className="relative my-4">
          <div className="absolute inset-0 bg-[var(--color-accent)] opacity-20 rounded-full animate-ping" />
          <div className="w-24 h-24 bg-[var(--color-accent)] rounded-full flex items-center justify-center z-10 relative shadow-lg">
            <Mic size={32} color="white" />
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-1 items-center justify-center h-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div
                key={i}
                className="w-2 bg-[var(--color-text)] rounded-full animate-pulse"
                style={{
                  height: `${Math.max(20, Math.random() * 100)}%`,
                  animationDelay: `${i * 0.1}s`,
                }}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-[var(--color-text-muted)]">Listening...</span>
        </div>
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Review sessions, bookmark favorites, build your library.",
    mockup: (
      <div className="flex flex-col h-full justify-center gap-4 w-full max-w-sm mx-auto px-4">
        <h4 className="text-sm font-bold text-[var(--color-text-secondary)] mb-1 uppercase tracking-wide">Your Journey</h4>
        <div className="flex gap-4">
          <div className="flex-1 bg-white border border-[var(--color-border-strong)] rounded-xl flex flex-col items-center justify-center py-4 shadow-sm">
            <span className="font-bold text-3xl text-[var(--color-accent)]">12</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1">Sessions</span>
          </div>
          <div className="flex-1 bg-white border border-[var(--color-border-strong)] rounded-xl flex flex-col items-center justify-center py-4 shadow-sm">
            <span className="font-bold text-3xl text-[var(--color-accent)]">5</span>
            <span className="text-xs text-[var(--color-text-muted)] font-medium mt-1">Companions</span>
          </div>
        </div>
        <div className="w-full bg-white border border-[var(--color-border)] rounded-xl p-4 flex flex-col gap-3 mt-2 shadow-sm">
          <div className="flex justify-between items-center">
            <span className="text-sm font-bold">Calculus Progress</span>
            <span className="text-xs font-bold text-[var(--color-accent)]">85%</span>
          </div>
          <div className="w-full h-2 bg-[var(--color-bg-subtle)] rounded-full overflow-hidden">
            <div className="w-[85%] h-full bg-[var(--color-primary)]" />
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mt-1">Almost mastered Integration by Parts!</p>
        </div>
      </div>
    ),
  },
];

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STEPS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col items-center gap-8 md:gap-12 py-12 md:py-16 lg:py-20 w-full px-4 md:px-0">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">How It Works</span>
        <h2 className="text-3xl md:text-4xl">Three steps to smarter learning</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 md:gap-12 w-full max-w-[1100px] items-center">
        {/* Left: Interactive Steps */}
        <div className="flex flex-col gap-4 md:gap-6 w-full lg:w-1/2">
          {STEPS.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <div
                key={step.title}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex items-start gap-4 md:gap-5 p-4 md:p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                  isActive
                    ? "border-[var(--color-border-strong)] bg-white shadow-lg scale-[1.02]"
                    : "border-transparent hover:bg-white/50"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 size-10 md:size-12 flex items-center justify-center rounded-full transition-colors duration-300",
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
                  )}
                >
                  <step.icon size={20} className="md:w-6 md:h-6" strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className={cn("text-lg md:text-xl transition-colors", isActive ? "font-bold" : "font-medium text-[var(--color-text-secondary)]")}>
                    {step.title}
                  </h3>
                  <p className={cn("text-sm md:text-base leading-relaxed transition-colors", isActive ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]")}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Demo Storyboard */}
        <div className="w-full lg:w-1/2 h-[350px] md:h-[400px] bg-[var(--color-bg-subtle)] rounded-3xl border border-[var(--color-border)] relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          
          <div className="relative z-10 w-full h-full p-6 md:p-8 transition-opacity duration-500">
            {STEPS[activeStep].mockup}
          </div>
          
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 h-1 bg-[var(--color-border)] w-full">
            <div 
              className="h-full bg-[var(--color-primary)] transition-all duration-300 ease-linear"
              style={{ 
                width: '100%', 
                animation: 'progress 4s linear infinite' 
              }} 
            />
          </div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @keyframes progress {
              0% { width: 0%; }
              100% { width: 100%; }
            }
          `}} />
        </div>
      </div>

      <Link href="/companions/new" className="btn-primary text-base px-6 md:px-8 py-3 mt-4">
        Get Started
      </Link>
    </section>
  );
}
