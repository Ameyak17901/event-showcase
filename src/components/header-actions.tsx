"use client";

import { useEffect, useState } from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export function HeaderActions() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Render a consistent loading skeleton or placeholder to match SSR structure
    return (
      <div className="flex gap-4 h-9 items-center justify-end">
        <div className="w-16 h-8 bg-muted rounded animate-pulse" />
        <div className="w-20 h-9 bg-muted rounded animate-pulse" />
      </div>
    );
  }

  return (
    <>
      <SignedOut>
        <SignInButton />
        <SignUpButton>
          <Button variant="outline">Sign Up</Button>
        </SignUpButton>
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </>
  );
}
