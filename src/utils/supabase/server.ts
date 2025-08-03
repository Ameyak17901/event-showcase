import { auth } from "@clerk/nextjs/server";
import { createClient } from "@supabase/supabase-js";

export const createSupabaseClient = async () => {
  const { getToken } = await auth();
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_ANON_KEY!,
    {
      accessToken: async () => getToken(),
    }
  );
};
