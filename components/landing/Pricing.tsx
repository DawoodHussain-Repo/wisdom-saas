"use client";

import { PricingTable } from "@clerk/nextjs";

export default function Pricing() {
  return (
    <section className="flex flex-col items-center gap-8 md:gap-10 py-12 md:py-16 px-4 md:px-0">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">Pricing</span>
        <h2 className="text-2xl md:text-3xl">Plans for every learner</h2>
      </div>
      <div className="w-full">
        <PricingTable />
      </div>
    </section>
  );
}
