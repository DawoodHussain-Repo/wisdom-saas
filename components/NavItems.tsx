"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
] as const;

export default function NavItems() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 bg-[var(--color-bg-subtle)] p-1 rounded-full border border-[var(--color-border)] max-md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.label}
            href={item.href}
            className={cn(
              "text-sm font-medium transition-all duration-300 px-4 py-1.5 rounded-full relative",
              isActive
                ? "text-black shadow-sm bg-white border border-[var(--color-border)]"
                : "text-[var(--color-text-secondary)] hover:text-black",
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
