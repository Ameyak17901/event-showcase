import { EventsView } from "@/modules/event/views/events-view";

export default function Home() {
  return (
    <div className="flex px-4 w-full h-full">
      <EventsView />
    </div>
  );
}
