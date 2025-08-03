import { EventsView } from "@/modules/event/views/events-view";

export default async function Home() {

  return (
    <div className="flex justify-center w-screen">
      <EventsView />
    </div>
  );
}
