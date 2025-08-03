"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

import type { Event as EventType } from "@/types/event";
import { useSupabase } from "@/utils/supabase/supabase-provider";
import { useEffect, useState } from "react";

interface Props {
  event: EventType;
}

export const EventCard = ({ event }: Props) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const { supabase } = useSupabase();
  useEffect(() => {
    if (!supabase) return;
    const getImagePublicUrl = async () => {
      const { data: image } = await supabase.storage
        .from("event-images")
        .getPublicUrl(event.image_url);
      setImageUrl(image.publicUrl);
    };
    getImagePublicUrl();
  }, [supabase, event.image_url]);
  return (
    <Card className="flex flex-col w-full">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="w-full">
        <p>{formatDate(event.event_date)}</p>
        <p>
          <span>{event.tier}</span>
        </p>
        <img src={imageUrl || ""} alt="Event image" width={22} height={22} />
      </CardContent>
    </Card>
  );
};
