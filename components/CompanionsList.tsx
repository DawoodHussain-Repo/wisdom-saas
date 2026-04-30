import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, getSubjectColor } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

interface companionListProps {
  title: string;
  companions?: Companion[];
  classNames?: string;
}
const CompanionsList = ({
  title,
  companions,
  classNames,
}: companionListProps) => {
  return (
    <article className={cn("companion-list mb-4", classNames)}>
      <h2
        className="font-bold text-3xl mb-4"
        style={{
          fontFamily: "'Bricolage Grotesque', sans-serif",
          color: "var(--text-primary)",
        }}
      >
        {title}
      </h2>
      <Table>
        <TableHeader>
          <TableRow
            style={{ borderColor: "var(--border-subtle)" }}
          >
            <TableHead
              className="w-1/2 text-lg max-md:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Lessons
            </TableHead>
            <TableHead
              className="w-1/4 text-lg max-md:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Subject
            </TableHead>
            <TableHead
              className="w-1/4 text-lg text-right max-md:text-base"
              style={{ color: "var(--text-muted)" }}
            >
              Duration
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map((companion, index) => (
            <TableRow
              key={companion.sessionId || `${companion.id}-${index}`}
              className="transition-colors duration-200 hover:bg-[rgba(255,255,255,0.03)]"
              style={{ borderColor: "var(--border-subtle)" }}
            >
              <TableCell className="max-md:p-2 overflow-hidden">
                <Link href={`companions/${companion.id}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                      style={{
                        backgroundColor: getSubjectColor(companion.subject),
                      }}
                    >
                      <Image
                        src={`/icons/${companion.subject}.svg`}
                        width={20}
                        height={20}
                        alt={companion.subject}
                      />
                    </div>
                    <div className="flex flex-col gap-2 min-w-0 flex-1">
                      <p
                        className="text-xl font-bold max-md:text-base truncate"
                        style={{ color: "var(--text-primary)" }}
                      >
                        {companion.name}
                      </p>
                      <p
                        className="text-base max-md:text-sm truncate"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {companion.topic}
                      </p>
                    </div>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="max-md:p-2">
                <div className="flex items-center gap-2">
                  <div
                    className="size-[32px] flex items-center justify-center rounded-lg max-md:hidden"
                    style={{
                      backgroundColor: getSubjectColor(companion.subject),
                    }}
                  >
                    <Image
                      src={`/icons/${companion.subject}.svg`}
                      width={20}
                      height={20}
                      alt={companion.subject}
                    />
                  </div>
                  <p
                    className="text-lg max-md:text-base capitalize"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {companion.subject}
                  </p>
                </div>
              </TableCell>
              <TableCell className="max-md:p-2">
                <p
                  className="text-lg text-right max-md:text-base"
                  style={{ color: "var(--text-muted)" }}
                >
                  {companion.duration} min
                </p>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </article>
  );
};

export default CompanionsList;
