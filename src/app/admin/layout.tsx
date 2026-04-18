"use client";

import { useEffect } from "react";
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

  useEffect(() => {
    if (!isLoaded) return;

    // Check if user is admin (you can set this role in Clerk)
    // For now, we'll just check if user exists
    if (!user) {
      router.push("/sign-in");
    }
  }, [user, isLoaded, router]);

  if (!isLoaded || !user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-slate-600">Loading...</div>
      </div>
    );
  }

  return <>{children}<Toaster position="top-center" /></>;
}
