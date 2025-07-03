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
      <h2 className="font-bold text-3xl">{title}</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-2/3 text-lg max-md:text-base">
              Lessons
            </TableHead>
            <TableHead className="text-lg max-md:text-base">Subject</TableHead>
            <TableHead className="text-lg text-right max-md:text-base">
              Duration
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companions?.map((companion) => (
            <TableRow key={companion.id}>
              <TableCell className="max-md:p-2">
                <Link href={`companions/${companion.id}`}>
                  <div className="flex items-center gap-2">
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
                    <div className="flex flex-col gap-2">
                      <p className="text-2xl font-bold max-md:text-lg">
                        {companion.name}
                      </p>
                      <p className="text-lg max-md:text-base">
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
                  <p className="text-lg max-md:text-base">
                    {companion.subject}
                  </p>
                </div>
              </TableCell>
              <TableCell className="max-md:p-2">
                <p className="text-lg text-right max-md:text-base">
                  {Math.floor(companion.duration / 60)}m{" "}
                  {companion.duration % 60}s
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
