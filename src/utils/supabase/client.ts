import { SignedInSessionResource } from "@clerk/types";
import { createClient } from "@supabase/supabase-js";

export function createSupabaseClient(
  session: SignedInSessionResource | null | undefined
) {
  // Create a supabase client on the browser with project's credentials
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      accessToken: async() => session?.getToken() || null,
    }
  );
}
