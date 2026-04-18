"use client";

import { useState } from "react";
import { AddEventDialog } from "@/modules/event/ui/add-event-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useEvents } from "@/hooks/useEvents";
import { Plus, Edit2, Trash2, Calendar, Users } from "lucide-react";

export default function AdminEventsPage() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { events, isLoaded } = useEvents();

  const handleEventCreated = () => {
    // Refetch events - in a real app, you'd use a state management solution
    console.log("Event created successfully");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Event Management
            </h1>
            <p className="text-slate-600 mt-2">
              Create, edit, and manage all your events
            </p>
          </div>
          <Button
            onClick={() => setDialogOpen(true)}
            size="lg"
            className="gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-5 w-5" />
            Add New Event
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Total Events
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {events.length}
                </p>
              </div>
              <Calendar className="h-10 w-10 text-blue-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">Active</p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {
                    events.filter((e) => new Date(e.event_date) > new Date())
                      .length
                  }
                </p>
              </div>
              <Users className="h-10 w-10 text-green-500 opacity-20" />
            </div>
          </Card>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium">
                  Tier Distribution
                </p>
                <p className="text-3xl font-bold text-slate-900 mt-2">
                  {new Set(events.map((e) => e.tier)).size}
                </p>
              </div>
              <Users className="h-10 w-10 text-purple-500 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Events Table */}
        <Card className="overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-900">
              Events List
            </h2>
          </div>

          {!isLoaded ? (
            <div className="p-8 text-center">
              <div className="animate-spin inline-block w-6 h-6 border-2 border-slate-300 border-t-blue-600 rounded-full"></div>
              <p className="mt-4 text-slate-600">Loading events...</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center">
              <Calendar className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-4">
                No events yet. Create one to get started!
              </p>
              <Button
                onClick={() => setDialogOpen(true)}
                variant="outline"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create First Event
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                      Tier
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-600">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {events.map((event) => (
                    <tr
                      key={event.id}
                      className="hover:bg-slate-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-900">
                            {event.title}
                          </p>
                          <p className="text-sm text-slate-600 truncate">
                            {event.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600">
                        {new Date(event.event_date).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            event.tier === "free"
                              ? "bg-blue-100 text-blue-800"
                              : event.tier === "silver"
                                ? "bg-slate-100 text-slate-800"
                                : event.tier === "gold"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {event.tier.charAt(0).toUpperCase() +
                            event.tier.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>

        {/* Quick Start Guide */}
        <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-3">💡 Quick Start</h3>
          <ul className="space-y-2 text-sm text-blue-900">
            <li>• Click &quot;Add New Event&quot; to create a new event</li>
            <li>
              • Fill in event details: title, description, date, tier, and image
            </li>
            <li>• Images are automatically uploaded to Supabase Storage</li>
            <li>
              • Events are stored in the database and visible across the app
            </li>
          </ul>
        </Card>
      </div>

      {/* Add Event Dialog */}
      <div className="flex w-full">
        <AddEventDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onEventCreated={handleEventCreated}
        />
      </div>
    </div>
  );
}
