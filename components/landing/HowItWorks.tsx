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
      <div className="flex flex-col gap-3 h-full justify-center">
        <div className="w-full h-8 bg-[var(--color-bg-subtle)] rounded-md border border-[var(--color-border)] animate-pulse" />
        <div className="w-3/4 h-8 bg-[var(--color-bg-subtle)] rounded-md border border-[var(--color-border)] animate-pulse delay-75" />
        <div className="grid grid-cols-2 gap-2 mt-2">
          <div className="w-full h-10 bg-white border border-[var(--color-border-strong)] rounded-md" />
          <div className="w-full h-10 bg-white border border-[var(--color-border-strong)] rounded-md" />
        </div>
        <div className="w-full h-12 bg-[var(--color-primary)] rounded-md mt-4 shadow-sm" />
      </div>
    ),
  },
  {
    icon: Mic,
    title: "Start a Voice Session",
    description: "Have a real-time conversation with your personal AI tutor.",
    mockup: (
      <div className="flex flex-col h-full items-center justify-center gap-6">
        <div className="relative">
          <div className="absolute inset-0 bg-[var(--color-accent)] opacity-20 rounded-full animate-ping" />
          <div className="w-24 h-24 bg-[var(--color-accent)] rounded-full flex items-center justify-center z-10 relative">
            <Mic size={32} color="white" />
          </div>
        </div>
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
      </div>
    ),
  },
  {
    icon: BarChart3,
    title: "Track Your Progress",
    description: "Review sessions, bookmark favorites, build your library.",
    mockup: (
      <div className="flex flex-col h-full justify-center gap-4">
        <div className="flex gap-4">
          <div className="flex-1 h-20 bg-white border border-[var(--color-border-strong)] rounded-xl flex items-center justify-center font-bold text-xl text-[var(--color-accent)] shadow-sm">
            12
          </div>
          <div className="flex-1 h-20 bg-white border border-[var(--color-border-strong)] rounded-xl flex items-center justify-center font-bold text-xl text-[var(--color-accent)] shadow-sm">
            5
          </div>
        </div>
        <div className="w-full h-24 bg-white border border-[var(--color-border)] rounded-xl p-3 flex flex-col gap-2">
          <div className="w-1/3 h-4 bg-[var(--color-border-strong)] rounded-full" />
          <div className="w-full h-2 bg-[var(--color-bg-subtle)] rounded-full" />
          <div className="w-2/3 h-2 bg-[var(--color-bg-subtle)] rounded-full" />
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
    <section className="flex flex-col items-center gap-12 py-20 w-full">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">How It Works</span>
        <h2 className="text-4xl">Three steps to smarter learning</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 w-full max-w-[1100px] items-center">
        {/* Left: Interactive Steps */}
        <div className="flex flex-col gap-6 w-full lg:w-1/2">
          {STEPS.map((step, i) => {
            const isActive = i === activeStep;
            return (
              <div
                key={step.title}
                onClick={() => setActiveStep(i)}
                className={cn(
                  "flex items-start gap-5 p-5 rounded-2xl cursor-pointer transition-all duration-300 border-2",
                  isActive
                    ? "border-[var(--color-border-strong)] bg-white shadow-lg scale-[1.02]"
                    : "border-transparent hover:bg-white/50"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 size-12 flex items-center justify-center rounded-full transition-colors duration-300",
                    isActive
                      ? "bg-[var(--color-primary)] text-white"
                      : "bg-[var(--color-bg-subtle)] text-[var(--color-text-muted)]"
                  )}
                >
                  <step.icon size={24} strokeWidth={isActive ? 2 : 1.5} />
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className={cn("text-xl transition-colors", isActive ? "font-bold" : "font-medium text-[var(--color-text-secondary)]")}>
                    {step.title}
                  </h3>
                  <p className={cn("leading-relaxed transition-colors", isActive ? "text-[var(--color-text-secondary)]" : "text-[var(--color-text-muted)]")}>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Demo Storyboard */}
        <div className="w-full lg:w-1/2 h-[400px] bg-[var(--color-bg-subtle)] rounded-3xl border border-[var(--color-border)] relative overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
          
          <div className="relative z-10 w-full h-full p-8 transition-opacity duration-500">
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

      <Link href="/companions/new" className="btn-primary text-base px-8 py-3 mt-4">
        Get Started
      </Link>
    </section>
  );
}
