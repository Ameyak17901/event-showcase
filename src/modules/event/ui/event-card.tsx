"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditEventDialog } from '@/modules/event/ui/edit-event-dialog';
import { formatDate } from "@/lib/utils";

import type { Event as EventType } from "@/types/event";
import { useSupabase } from "@/utils/supabase/supabase-provider";
import { Edit2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";


interface Props {
  event: EventType;
}

export const EventCard = ({ event }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { supabase } = useSupabase();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!supabase) return;
    const getImagePublicUrl = async () => {
      const { data: image } = supabase.storage
        .from("event-images")
        .getPublicUrl(event.image_url);
      setImageUrl(image.publicUrl);
      console.log("supbase image", image);
    };
    getImagePublicUrl();
    console.log("Event image URL: ", imageUrl);
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

  const handleClickOutside = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', handleClickOutside);
    return () => {
      document.removeEventListener('keydown', handleClickOutside);
    }
  }, [])

  return (
    <>
      <Card className="flex flex-col w-full h-full overflow-hidden hover:shadow-md transition-all duration-300 border border-slate-200">
        <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
          <span className="absolute top-2 right-2 bg-white rounded-full p-2 cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => setOpen(true)}>
            <Edit2 />
          </span>
        </div>
        <EditEventDialog open={open} onOpenChange={setOpen} event={event} />
        {imageUrl && (
          <div className="relative w-full aspect-video overflow-hidden bg-slate-100">
            <Image
              src={imageUrl}
              alt={event.title}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
              priority
            />
          </div>
        )}
        <CardHeader className="p-4 flex-1">
          <div className="flex justify-between items-start gap-2 mb-2">
            <span className={`text-xs font-semibold px-2 py-0.5 border rounded-full uppercase tracking-wider ${getTierBadgeStyles(event.tier)}`}>
              {event.tier}
            </span>
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
