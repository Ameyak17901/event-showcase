"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useSupabase } from "@/utils/supabase/supabase-provider";
import type { Event as EventType } from "@/types/event";
import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { canManageEvent } from "@/lib/permissions";

interface DeleteEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  event: EventType;
}

export const DeleteEventDialog = ({
  open,
  onOpenChange,
  event,
}: DeleteEventDialogProps) => {
  const { supabase } = useSupabase();
  const { user } = useUser();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!canManageEvent(user, event)) {
      toast.error("You do not have permission to delete this event.");
      return;
    }

    if (!supabase) {
      toast.error("Supabase client is not initialized.");
      return;
    }


    try {
      setIsDeleting(true);

      // 1. Delete event image from storage if it exists
      if (event.image_url) {
        const { error: storageError } = await supabase.storage
          .from("event-images")
          .remove([event.image_url]);

        if (storageError) {
          console.warn("Could not delete image from storage:", storageError.message);
        }
      }

      // 2. Delete event record from database
      const { error: dbError } = await supabase
        .from("events")
        .delete()
        .eq("id", event.id);

      if (dbError) {
        throw new Error(dbError.message);
      }

      toast.success(`"${event.title}" has been deleted.`);
      onOpenChange(false);
      router.refresh();
    } catch (error: any) {
      console.error("Failed to delete event:", error);
      toast.error(error.message || "Failed to delete event. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-600">
            <Trash2 className="w-5 h-5" />
            Delete Event
          </DialogTitle>
          <DialogDescription className="pt-2 text-slate-600">
            Are you sure you want to delete <span className="font-semibold text-slate-900">"{event.title}"</span>? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isDeleting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Event"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
