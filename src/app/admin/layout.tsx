"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted || !isLoaded) return;

    if (!user) {
      router.push("/sign-in");
    }
  }, [user, isLoaded, hasMounted, router]);

  if (!hasMounted || !isLoaded || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  return <>{children}<Toaster position="top-center" /></>;
}

