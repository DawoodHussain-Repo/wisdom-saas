
import CompanionComponent from "@/components/CompanionComponent";
import { getCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";

interface CompanionSessionPageProps {
    params: Promise<{ id: string }>;
}

const CompanionSession = async ({ params }: CompanionSessionPageProps) => {
    const { id } = await params;
    const companion = await getCompanion(id);
    const user = await currentUser();
    if (!user) {
        redirect("/sign-in");
    }
    if (!companion) {
        redirect("/companions");
    }
    const { name, subject, topic, duration } = companion;
    return (
        <main>
            <article
                className="flex rounded-border justify-between p-6 max-md:flex-col"
                style={{
                    background: "var(--bg-card)",
                    borderColor: "var(--border-default)",
                }}
            >
                <div className="flex items-center gap-3">
                    <div
                        className="size-[72px] flex items-center justify-center rounded-lg max-md:hidden"
                        style={{ backgroundColor: getSubjectColor(subject) }}
                    >
                        <Image
                            src={`/icons/${subject}.svg`}
                            alt={subject}
                            width={35}
                            height={35}
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <p
                                className="font-bold text-2xl"
                                style={{ color: "var(--text-primary)" }}
                            >
                                {name}
                            </p>
                            <div
                                className="subject-badge max-sm:hidden"
                                style={{
                                    background: `${getSubjectColor(subject)}20`,
                                    color: getSubjectColor(subject),
                                    border: `1px solid ${getSubjectColor(subject)}40`,
                                }}
                            >
                                {subject}
                            </div>
                        </div>
                        <p
                            className="text-lg"
                            style={{ color: "var(--text-secondary)" }}
                        >
                            {topic}
                        </p>
                    </div>
                </div>
                <div
                    className="items-start text-2xl max-md:hidden flex items-center gap-2"
                    style={{ color: "var(--text-muted)" }}
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                    </svg>
                    {duration} minutes
                </div>
            </article>

            <CompanionComponent
                {...companion}
                companionId={id}
                userName={user.firstName!}
                userImage={user.imageUrl!}
                duration={duration}
            />
        </main>
    );
};

export default CompanionSession;
