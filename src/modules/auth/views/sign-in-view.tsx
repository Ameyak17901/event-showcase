"use client";

import { SignIn } from "@clerk/nextjs";

export const SignInView = () => {
  return (
    <div className="flex justify-center items-center">
      <SignIn routing="hash" />
    </div>
  );
};
