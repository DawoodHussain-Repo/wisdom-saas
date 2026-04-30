"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItemsArr = [
  { label: "Home", href: "/" },
  { label: "Companions", href: "/companions" },
  { label: "My Journey", href: "/my-journey" },
];

const NavItems = () => {
  const pathname = usePathname();
  return (
    <nav className="flex items-center gap-6">
      {navItemsArr.map((Item) => (
        <Link
          key={Item.label}
          href={Item.href}
          className={cn(
            "relative py-1 text-sm font-medium transition-colors duration-200",
            pathname === Item.href
              ? "text-[var(--accent-amber)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
          )}
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {Item.label}
          {pathname === Item.href && (
            <span
              className="absolute -bottom-1 left-0 w-full h-0.5 rounded-full"
              style={{
                background: "var(--accent-amber)",
                boxShadow: "0 0 8px var(--accent-amber-glow)",
              }}
            />
          )}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
