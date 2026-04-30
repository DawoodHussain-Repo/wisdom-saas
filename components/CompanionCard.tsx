import Image from "next/image";
import Link from "next/link";
import React from "react";

interface CompanionCardProps {
  id: string;
  name: string;
  duration: number;
  subject: string;
  color: string;
  topic: string;
}

const CompanionCard = ({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) => {
  return (
    <article className="companion-card" id={`companion-card-${id}`}>
      {/* Color accent bar */}
      <div
        className="absolute top-0 left-0 w-full h-1 rounded-t-2xl"
        style={{ background: color }}
      />

      <div className="flex justify-between items-center">
        <div
          className="subject-badge"
          style={{
            background: `${color}20`,
            color: color,
            borderColor: `${color}40`,
            border: `1px solid ${color}40`,
          }}
        >
          {subject}
        </div>
        <button className="companion-bookmark" aria-label="Bookmark companion">
          <Image
            src={`/icons/bookmark.svg`}
            alt="Bookmark"
            width={12}
            height={12}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
        {name}
      </h2>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        {topic}
      </p>
      <div className="items-center flex gap-2" style={{ color: "var(--text-muted)" }}>
        <Image src={"/icons/clock.svg"} alt="Clock" width={12} height={12} />
        <p className="text-sm">{duration} mins</p>
      </div>
      <Link
        href={`/companions/${id}`}
        className="btn-primary w-full justify-center"
        id={`launch-session-${id}`}
      >
        Launch Session
      </Link>
    </article>
  );
};

export default CompanionCard;
