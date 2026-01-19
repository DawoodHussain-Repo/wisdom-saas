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
    <article className="companion-card " style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark">
          <Image
            src={`/icons/bookmark.svg`}
            alt="Bookmark"
            width={12}
            height={12}
          />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="items-center flex gap-2">
        <Image src={"/icons/clock.svg"} alt="Clock" width={12} height={12} />
        <p className="text-sm"> {duration} mins duration</p>
      </div>
      <Link
        href={`/companions/${id}`}
        className="btn-primary w-full justify-center"
      >
        Launch Session
      </Link>
    </article>
  );
};

export default CompanionCard;
