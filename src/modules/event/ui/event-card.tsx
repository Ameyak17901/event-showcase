"use client";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditEventDialog } from '@/modules/event/ui/edit-event-dialog';
import { DeleteEventDialog } from '@/modules/event/ui/delete-event-dialog';
import { formatDate } from "@/lib/utils";
import { canManageEvent } from "@/lib/permissions";
import { useUser } from "@clerk/nextjs";

import type { Event as EventType } from "@/types/event";
import { useSupabase } from "@/utils/supabase/supabase-provider";
import { Edit2, MoreVertical, Trash2, UserCheck } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  event: EventType;
}

export const EventCard = ({ event }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const { user } = useUser();
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const canManage = canManageEvent(user, event);
  const isOwner = Boolean(user?.id && event.user_id && user.id === event.user_id);

  useEffect(() => {
    if (!supabase) return;
    const getImagePublicUrl = async () => {
      const { data: image } = supabase.storage
        .from("event-images")
        .getPublicUrl(event.image_url);
      setImageUrl(image.publicUrl);
    };
    getImagePublicUrl();
  }, [supabase, event.image_url]);

  const getTierBadgeStyles = (tier: EventType["tier"]) => {
    switch (tier) {
      case "free":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "silver":
        return "bg-slate-100 text-slate-800 border-slate-200";
      case "gold":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "platinum":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Close dropdown on click outside or Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <>
      <Card className="relative group flex flex-col w-full h-full overflow-hidden hover:shadow-md transition-all duration-300 border border-slate-200">
        {/* Hover-triggered Ellipsis Menu (Only rendered if user is authorized) */}
        {canManage && (
          <div ref={dropdownRef} className="absolute top-3 right-3 z-20">
            <button
              type="button"
              title="More options"
              aria-label="More options"
              onClick={(e) => {
                e.stopPropagation();
                setDropdownOpen((prev) => !prev);
              }}
              className={`flex items-center justify-center w-8 h-8 rounded-full bg-white/90 hover:bg-white shadow-sm text-slate-700 hover:text-slate-900 border border-slate-200/80 backdrop-blur-sm transition-all duration-200 cursor-pointer ${
                dropdownOpen
                  ? "opacity-100 ring-2 ring-slate-400"
                  : "opacity-0 group-hover:opacity-100 focus-within:opacity-100"
              }`}
            >
              <MoreVertical className="w-4 h-4" />
            </button>

            {/* Ellipsis Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-1 w-36 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-30 flex flex-col text-sm text-slate-700 animate-in fade-in-50 zoom-in-95">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    setEditOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-50 transition-colors text-slate-700 hover:text-slate-900"
                >
                  <Edit2 className="w-4 h-4 text-slate-500" />
                  <span>Edit</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(false);
                    setDeleteOpen(true);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-left hover:bg-red-50 transition-colors text-red-600 font-medium"
                >
                  <Trash2 className="w-4 h-4 text-red-500" />
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Dialog Modals */}
        {canManage && (
          <>
            <EditEventDialog open={editOpen} onOpenChange={setEditOpen} event={event} />
            <DeleteEventDialog open={deleteOpen} onOpenChange={setDeleteOpen} event={event} />
          </>
        )}

        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="object-cover rounded-t-md hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              priority
            />
          </div>
        )}
        <CardHeader className="p-4 flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className={`text-xs font-semibold px-2 py-0.5 border rounded-full uppercase tracking-wider ${getTierBadgeStyles(event.tier)}`}>
                {event.tier}
              </span>
              {isOwner && (
                <span className="inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full">
                  <UserCheck className="w-3 h-3" />
                  Mine
                </span>
              )}
            </div>
            <span className="text-xs text-slate-500 font-medium">
              {formatDate(new Date(event.event_date))}
            </span>
          </div>
          <CardTitle className="text-lg font-bold text-slate-900 line-clamp-1">
            {event.title}
          </CardTitle>
          <CardDescription className="text-sm text-slate-600 line-clamp-2 mt-1">
            {event.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </>
  );
};


