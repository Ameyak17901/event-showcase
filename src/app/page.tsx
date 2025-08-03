import { EventsView } from "@/modules/event/views/events-view";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function Home() {
  const { sessionId } = await auth();

  if (!sessionId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex justify-center pt-5">
      <EventsView />
    </div>
  );
}
