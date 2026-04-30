import CompanionCard from "@/components/CompanionCard";
import SearchInput from "@/components/SearchInput";
import SubjectFilter from "@/components/SubjectFilter";
import { getAllCompanions } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import React from "react";

const CompanionLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters.subject ? filters.subject : "";
  const topic = filters.topic ? filters.topic : "";
  const companions = await getAllCompanions({ subject, topic });
  return (
    <main>
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex flex-col gap-1">
          <span className="section-label">Browse</span>
          <h1>Companion Library</h1>
        </div>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.length > 0 ? (
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))
        ) : (
          <div
            className="flex flex-col items-center justify-center w-full py-20 gap-4"
            style={{ color: "var(--text-muted)" }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <p className="text-lg">No companions found</p>
            <p className="text-sm">Try adjusting your search or filter</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default CompanionLibrary;
