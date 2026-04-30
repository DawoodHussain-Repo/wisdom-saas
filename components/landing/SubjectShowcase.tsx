import Image from "next/image";
import Link from "next/link";
import { subjects, subjectsColors } from "@/constants";

export default function SubjectShowcase() {
  return (
    <section className="flex flex-col items-center gap-8 md:gap-10 py-12 md:py-16 px-4 md:px-0">
      <div className="text-center flex flex-col gap-2">
        <span className="section-label">Subjects</span>
        <h2 className="text-2xl md:text-3xl">Explore what you can learn</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 w-full">
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
                  width={32}
                  height={32}
                  className="md:w-9 md:h-9"
                />
                <span className="font-semibold capitalize text-xs md:text-sm">
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
