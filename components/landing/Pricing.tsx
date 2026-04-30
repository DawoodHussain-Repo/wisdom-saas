"use client";

import { PricingTable } from "@clerk/nextjs";

export default function Pricing() {
  return (
    <section className="flex flex-col items-center gap-10 py-16">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">Pricing</span>
        <h2 className="text-3xl">Plans for every learner</h2>
      </div>
      <div className="w-full">
        <PricingTable />
      </div>
    </section>
  );
}
