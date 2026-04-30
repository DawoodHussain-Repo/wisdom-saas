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
    <nav className="flex items-center gap-4">
      {NAV_ITEMS.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            "text-sm font-medium transition-colors duration-150",
            pathname === item.href
              ? "text-[var(--color-accent)] font-semibold"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text)]",
          )}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
