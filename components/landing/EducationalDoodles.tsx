"use client";

import { useEffect, useState } from "react";
import { Pi, Atom, Code2, BookOpen, FlaskConical, Globe, Calculator, Binary, Languages, Divide } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS = [Pi, Atom, Code2, BookOpen, FlaskConical, Globe, Calculator, Binary, Languages, Divide];
const COLORS = [
  "text-[#ffb3ba]", // pastel pink
  "text-[#ffdfba]", // pastel orange
  "text-[#ffffba]", // pastel yellow
  "text-[#baffc9]", // pastel green
  "text-[#bae1ff]", // pastel blue
  "text-[#d4a5a5]", // muted rose
  "text-[#9b59b6]", // muted purple
];

interface Doodle {
  id: number;
  Icon: React.ElementType;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  duration: number;
  delay: number;
}

export default function EducationalDoodles() {
  const [doodles, setDoodles] = useState<Doodle[]>([]);

  useEffect(() => {
    // Generate random doodles only on the client side to avoid hydration mismatches
    const generatedDoodles: Doodle[] = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      Icon: ICONS[Math.floor(Math.random() * ICONS.length)],
      x: Math.random() * 100, // percentage
      y: Math.random() * 100, // percentage
      size: Math.floor(Math.random() * 40) + 20, // 20px to 60px
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      rotation: Math.random() * 360,
      duration: Math.random() * 20 + 20, // 20s to 40s
      delay: Math.random() * -20, // start at different points
    }));
    
    setDoodles(generatedDoodles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] bg-[var(--color-bg)]">
      {doodles.map((doodle) => {
        const Icon = doodle.Icon;
        return (
          <div
            key={doodle.id}
            className={cn("absolute opacity-20", doodle.color)}
            style={{
              left: `${doodle.x}%`,
              top: `${doodle.y}%`,
              width: doodle.size,
              height: doodle.size,
              animation: `float ${doodle.duration}s ease-in-out infinite alternate`,
              animationDelay: `${doodle.delay}s`,
            }}
          >
            <Icon 
              size={doodle.size} 
              style={{ transform: `rotate(${doodle.rotation}deg)` }} 
              strokeWidth={1.5}
            />
          </div>
        );
      })}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
          100% { transform: translateY(20px) rotate(-10deg); }
        }
      `}} />
    </div>
  );
}
