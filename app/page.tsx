import CompanionCard from "@/components/CompanionCard";
import CompanionsList from "@/components/CompanionsList";
import CTA from "@/components/CTA";
import { recentSessions } from "@/constants";
import React from "react";

const Page = () => {
  return (
    <main>
      <h1 className="text-2xl underline">Popular Companion</h1>
      <section className="home-section">
        {[
          {
        id: "123",
        name: "Neura The Brainy Explorer",
        topic: "Topic: Neural Network For Brain",
        subject: "Science",
        duration: Math.floor(Math.random() * 60) + 20,
        color: "#19bda7",
          },
          {
        id: "124",
        name: "Lexi The Language Guru",
        topic: "Topic: Mastering Multilingualism",
        subject: "Languages",
        duration: Math.floor(Math.random() * 60) + 20,
        color: "#f39c12",
          },
          {
        id: "125",
        name: "Aria The Art Enthusiast",
        topic: "Topic: Renaissance Art Movements",
        subject: "Art",
        duration: Math.floor(Math.random() * 60) + 20,
        color: "#8e44ad",
          },
        ].map((companion) => (
          <CompanionCard key={companion.id} {...companion} />
        ))}
      </section>
      <section className="home-section">
        <CompanionsList title="Recently Completed Sessions"
        companions={recentSessions}
        classNames="w-2/3 max-lg:w-full"
       />
        <CTA />
      </section>
    </main>
  );
};

export default Page;
