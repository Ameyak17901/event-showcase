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
import Image from "next/image";
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
      const { data: image } = supabase.storage
        .from("event-images")
        .getPublicUrl(event.image_url);
      setImageUrl(image.publicUrl);
      console.log("supbase image", image);
    };
    getImagePublicUrl();
    console.log("Event image URL: ", imageUrl);
  }, [supabase, event.image_url]);
  return (
    <Card className="flex flex-col max-w-xs w-20 border border-red-500">
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.description}</CardDescription>
      </CardHeader>
      <CardContent className="w-fit gap-y-1">
        <p className="text-sm text-slate-800">{formatDate(event.event_date)}</p>
        <p className="">
          <span className="text-sm border rounded-md text-slate-500 p-1">{event.tier}</span>
        </p>
        <Image
          src={imageUrl || "window.svg"}
          alt="Event image"
          width={300}
          height={300}
          loading={"eager"}
        />
      </CardContent>
    </Card>
  );
};
