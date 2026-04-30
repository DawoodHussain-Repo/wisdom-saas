import { Clock, Bookmark } from "lucide-react";
import Link from "next/link";

interface CompanionCardProps {
  id: string;
  name: string;
  duration: number;
  subject: string;
  color: string;
  topic: string;
}

export default function CompanionCard({
  id,
  name,
  topic,
  subject,
  duration,
  color,
}: CompanionCardProps) {
  return (
    <article className="companion-card" style={{ backgroundColor: color }}>
      <div className="flex justify-between items-center">
        <div className="subject-badge">{subject}</div>
        <button className="companion-bookmark" aria-label="Bookmark">
          <Bookmark size={12} className="text-white" />
        </button>
      </div>
      <h2 className="text-2xl font-bold">{name}</h2>
      <p className="text-sm">{topic}</p>
      <div className="flex items-center gap-2 text-sm">
        <Clock size={12} />
        <span>{duration} mins</span>
      </div>
      <Link
        href={`/companions/${id}`}
        className="btn-primary w-full justify-center"
      >
        Launch Session
      </Link>
    </article>
  );
}
