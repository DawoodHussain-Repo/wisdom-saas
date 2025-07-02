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
    <nav className="flex items-center gap-4">
      {navItemsArr.map((Item) => (
        <Link
          key={Item.label}
          href={Item.href}
          className={cn(pathname === Item.href && "text-primary font-semibold")}
        >
          {Item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavItems;
