import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import {
  getUserCompanions,
  getUserSessions,
  getBookmarkedCompanions,
} from "@/lib/actions/companion.actions";
import Image from "next/image";
import CompanionsList from "@/components/CompanionsList";
import { CheckCircle2, GraduationCap } from "lucide-react";

export default async function Profile() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  const [companions, sessionHistory, bookmarkedCompanions] = await Promise.all([
    getUserCompanions(user.id),
    getUserSessions(user.id),
    getBookmarkedCompanions(user.id),
  ]);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-lg"
          />
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl">{user.firstName} {user.lastName}</h1>
            <p className="text-sm text-[var(--color-text-muted)]">
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <StatCard
            icon={<CheckCircle2 size={20} className="text-green-600" />}
            value={sessionHistory.length}
            label="Lessons completed"
          />
          <StatCard
            icon={<GraduationCap size={20} className="text-[var(--color-accent)]" />}
            value={companions.length}
            label="Companions created"
          />
        </div>
      </section>

      <Accordion type="multiple">
        <AccordionItem value="bookmarks">
          <AccordionTrigger className="text-2xl font-bold">
            Bookmarked Companions ({bookmarkedCompanions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList companions={bookmarkedCompanions} title="Bookmarked Companions" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="recent">
          <AccordionTrigger className="text-2xl font-bold">
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="Recent Sessions" companions={sessionHistory} />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="companions">
          <AccordionTrigger className="text-2xl font-bold">
            My Companions ({companions.length})
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
}

function StatCard({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="border border-black rounded-lg p-3 gap-2 flex flex-col h-fit">
      <div className="flex gap-2 items-center">
        {icon}
        <p className="text-2xl font-bold">{value}</p>
      </div>
      <div className="text-sm text-[var(--color-text-muted)]">{label}</div>
    </div>
  );
}