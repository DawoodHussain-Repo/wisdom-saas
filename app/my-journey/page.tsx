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

const Profile = async () => {
  const user = await currentUser();

  if (!user) redirect("/sign-in");

  const companions = await getUserCompanions(user.id);
  const sessionHistory = await getUserSessions(user.id);
  const bookmarkedCompanions = await getBookmarkedCompanions(user.id);

  return (
    <main className="min-lg:w-3/4">
      <section className="flex justify-between gap-4 max-sm:flex-col items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={user.imageUrl}
            alt={user.firstName!}
            width={110}
            height={110}
            className="rounded-2xl"
            style={{
              border: "2px solid var(--border-default)",
            }}
          />
          <div className="flex flex-col gap-2">
            <h1 className="font-bold text-2xl">
              {user.firstName} {user.lastName}
            </h1>
            <p
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              {user.emailAddresses[0].emailAddress}
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <div
            className="rounded-2xl p-4 gap-2 flex flex-col h-fit"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex gap-2 items-center">
              <div
                className="flex items-center justify-center rounded-lg size-8"
                style={{
                  background: "rgba(34, 197, 94, 0.1)",
                  border: "1px solid rgba(34, 197, 94, 0.2)",
                }}
              >
                <Image
                  src="/icons/check.svg"
                  alt="checkmark"
                  width={16}
                  height={16}
                />
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--accent-amber)" }}
              >
                {sessionHistory.length}
              </p>
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Lessons completed
            </div>
          </div>
          <div
            className="rounded-2xl p-4 gap-2 flex flex-col h-fit"
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border-default)",
            }}
          >
            <div className="flex gap-2 items-center">
              <div
                className="flex items-center justify-center rounded-lg size-8"
                style={{
                  background: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                }}
              >
                <Image
                  src="/icons/cap.svg"
                  alt="cap"
                  width={16}
                  height={16}
                />
              </div>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--accent-violet)" }}
              >
                {companions.length}
              </p>
            </div>
            <div
              className="text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              Companions created
            </div>
          </div>
        </div>
      </section>
      <Accordion type="multiple">
        <AccordionItem
          value="bookmarks"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <AccordionTrigger
            className="text-2xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Bookmarked Companions {`(${bookmarkedCompanions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              companions={bookmarkedCompanions}
              title="Bookmarked Companions"
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="recent"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <AccordionTrigger
            className="text-2xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Recent Sessions
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList
              title="Recent Sessions"
              companions={sessionHistory}
            />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem
          value="companions"
          style={{ borderColor: "var(--border-subtle)" }}
        >
          <AccordionTrigger
            className="text-2xl font-bold"
            style={{
              color: "var(--text-primary)",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            My Companions {`(${companions.length})`}
          </AccordionTrigger>
          <AccordionContent>
            <CompanionsList title="My Companions" companions={companions} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </main>
  );
};
export default Profile;