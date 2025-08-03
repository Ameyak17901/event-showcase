"use client";

import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "./event-card";

export const EventList = () => {
  const { events } = useEvents();
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 min-w-screen">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};
