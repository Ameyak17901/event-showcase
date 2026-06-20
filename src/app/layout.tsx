import type { Metadata } from "next";
import localFont from "next/font/local";
import { Goldman } from "next/font/google";

import { Button } from "@/components/ui/button";

import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import SupabaseProvider from "@/utils/supabase/supabase-provider";
import { HeaderActions } from "@/components/header-actions";

const goldman = Goldman({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-goldman",
});
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Event Showcase",
  description: "Your Event Showcase",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${goldman.variable} antialiased`}
      >
        <ClerkProvider>
          <SupabaseProvider>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
              <HeaderActions />
            </header>
            <main className="flex w-full justify-center">{children}</main>
          </SupabaseProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
