"use client";

import { useState } from "react";
import { AddEventDialog } from "@/modules/event/ui/add-event-dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function ComponentShowcasePage() {
  const [dialogVariant1, setDialogVariant1] = useState(false);
  const [dialogVariant2, setDialogVariant2] = useState(false);
  const [dialogVariant3, setDialogVariant3] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            AddEventDialog Component
          </h1>
          <p className="text-lg text-slate-600">
            Showcase and documentation for the event creation dialog component
          </p>
        </div>

        {/* Feature Overview */}
        <Card className="mb-8 p-6 bg-blue-50 border-blue-200">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">✨ Features</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-900">Form Validation</h3>
              <ul className="text-sm text-blue-900 mt-2 space-y-1">
                <li>✓ Title validation (3-255 chars)</li>
                <li>✓ Description validation (10-2000 chars)</li>
                <li>✓ Future date requirement</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">File Handling</h3>
              <ul className="text-sm text-blue-900 mt-2 space-y-1">
                <li>✓ Image preview before upload</li>
                <li>✓ File size validation (max 5MB)</li>
                <li>✓ Format validation (JPG, PNG, WebP)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">Database Integration</h3>
              <ul className="text-sm text-blue-900 mt-2 space-y-1">
                <li>✓ Supabase Storage upload</li>
                <li>✓ Event record creation</li>
                <li>✓ Automatic URL generation</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-blue-900">User Feedback</h3>
              <ul className="text-sm text-blue-900 mt-2 space-y-1">
                <li>✓ Toast notifications</li>
                <li>✓ Loading states</li>
                <li>✓ Error handling</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Usage Examples */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Usage Examples</h2>

        <div className="space-y-6">
          {/* Example 1: Basic Usage */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Basic Usage
                </h3>
                <p className="text-slate-600 mb-4">
                  Simple button trigger for event creation with minimal setup
                </p>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Create Event
</Button>

<AddEventDialog 
  open={open}
  onOpenChange={setOpen}
/>`}
                </pre>
              </div>
              <Button
                onClick={() => setDialogVariant1(true)}
                className="ml-4 bg-blue-600 hover:bg-blue-700"
              >
                Try It
              </Button>
            </div>
          </Card>

          {/* Example 2: With Callback */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  With Event Callback
                </h3>
                <p className="text-slate-600 mb-4">
                  Trigger actions after successful event creation
                </p>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const handleEventCreated = () => {
  // Refresh list, redirect, etc.
  console.log("Event created!");
  refetchEvents();
};

<AddEventDialog 
  open={open}
  onOpenChange={setOpen}
  onEventCreated={handleEventCreated}
/>`}
                </pre>
              </div>
              <Button
                onClick={() => setDialogVariant2(true)}
                className="ml-4 bg-green-600 hover:bg-green-700"
              >
                Try It
              </Button>
            </div>
          </Card>

          {/* Example 3: Advanced Integration */}
          <Card className="p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-slate-900 mb-2">
                  Advanced Integration
                </h3>
                <p className="text-slate-600 mb-4">
                  Full-featured implementation with multiple dialogs and state management
                </p>
                <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm overflow-x-auto">
{`const [dialogOpen, setDialogOpen] = useState(false);
const { events, refetch } = useEvents();

const handleEventCreated = () => {
  refetch();
  toast.success("Create another or close");
};

<AddEventDialog 
  open={dialogOpen}
  onOpenChange={setDialogOpen}
  onEventCreated={handleEventCreated}
/>`}
                </pre>
              </div>
              <Button
                onClick={() => setDialogVariant3(true)}
                className="ml-4 bg-purple-600 hover:bg-purple-700"
              >
                Try It
              </Button>
            </div>
          </Card>
        </div>

        {/* Integration Points */}
        <Card className="mt-8 p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4">
            Integration Points
          </h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-600 mt-2"></div>
              <div>
                <p className="font-medium text-slate-900">Main Page</p>
                <p className="text-sm text-slate-600">
                  EventsView component includes the dialog trigger
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-600 mt-2"></div>
              <div>
                <p className="font-medium text-slate-900">Admin Dashboard</p>
                <p className="text-sm text-slate-600">
                  Full event management interface at /admin/events
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-2 h-2 rounded-full bg-purple-600 mt-2"></div>
              <div>
                <p className="font-medium text-slate-900">Supabase Setup</p>
                <p className="text-sm text-slate-600">
                  Requires event-images bucket and events table
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Dialog Instances */}
      <AddEventDialog
        open={dialogVariant1}
        onOpenChange={setDialogVariant1}
      />
      <AddEventDialog
        open={dialogVariant2}
        onOpenChange={setDialogVariant2}
        onEventCreated={() => {
          console.log("Event created successfully!");
          setDialogVariant2(false);
        }}
      />
      <AddEventDialog
        open={dialogVariant3}
        onOpenChange={setDialogVariant3}
        onEventCreated={() => {
          console.log("Event created - advanced integration");
          setDialogVariant3(false);
        }}
      />
    </div>
  );
}
