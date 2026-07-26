"use client";

import { useEffect, useState } from "react";
import { EventsView } from "@/modules/event/views/events-view";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isSignedIn, isLoaded } = useUser();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted && isLoaded && !isSignedIn) {
      router.push("/sign-in");
    }
  }, [hasMounted, isLoaded, isSignedIn, router]);

  if (!hasMounted || !isLoaded) {
    return (
      <div className="flex w-full h-full items-center justify-center min-h-[50vh]">
        <span className="animate-spin text-2xl">⏳</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="flex px-4 w-full h-full">
      <EventsView />
    </div>
  );
}

