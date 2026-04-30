import Image from "next/image";
import Link from "next/link";
import { subjects, subjectsColors } from "@/constants";

export default function SubjectShowcase() {
  return (
    <section className="flex flex-col items-center gap-10 py-16">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">Subjects</span>
        <h2 className="text-3xl">Explore what you can learn</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
        {subjects.map((subject) => {
          const color = subjectsColors[subject as keyof typeof subjectsColors];
          return (
            <Link key={subject} href={`/companions?subject=${subject}`}>
              <article
                className="subject-showcase-card"
                style={{ backgroundColor: color }}
              >
                <Image
                  src={`/icons/${subject}.svg`}
                  alt={subject}
                  width={36}
                  height={36}
                />
                <span className="font-semibold capitalize text-sm">
                  {subject}
                </span>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
