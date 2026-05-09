"use client";
import { EventList } from "@/modules/event/ui/event-list";
import { AddEventDialog } from "@/modules/event/ui/add-event-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Plus } from "lucide-react";

export const EventsView = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className="flex flex-col w-full items-start justify-start">
      <div className="flex w-full items-center gap-2 justify-center">
        <div className="flex justify-between space-x-4 w-full">
          <h2 className="text-2xl font-bold text-slate-900">Events</h2>
          <p className="text-slate-600 mt-1">
            Discover and manage exciting events
          </p>
        </div>
        <Button onClick={() => setDialogOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Create Event
        </Button>
      </div>
      <EventList />

      <AddEventDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onEventCreated={() => {
          // Refetch events - you can add this logic based on your state management
          console.log("Event created successfully");
        }}
      />
    </div>
  );
};
