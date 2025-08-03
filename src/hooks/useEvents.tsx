"use client";

import { useEffect, useState } from "react";
import type { Event as EventType } from "@/types/event";
import { useSession, useUser } from "@clerk/nextjs";
import { useSupabase } from "@/utils/supabase/supabase-provider";

export const useEvents = () => {
  const [events, setEvents] = useState<EventType[]>([]);
  const { user } = useUser();
  const tier = user?.publicMetadata.tier;
  const { session } = useSession();
  const { supabase, isLoaded } = useSupabase()
  useEffect(() => {
    if (!session || !supabase) return;
    
    const fetchEvents = async () => {
      const { data: eventsData, error } = await supabase
        .from("events")
        .select("*");
      if (error) {
        throw error;
      }
      setEvents(eventsData);
    };

    fetchEvents();
  }, [tier, session, supabase]);

  return { events, isLoaded };
};
