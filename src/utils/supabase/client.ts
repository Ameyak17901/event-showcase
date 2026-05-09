import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export function createServerSupabaseClient() {
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY;

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    supabaseKey!,
    {
      async accessToken() {
        return (await auth()).getToken({ template: "supabase" });
      },
    },
  );
}
