import { createClient } from "@supabase/supabase-js"

// Client-side Supabase client (uses anon key, subject to RLS)
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.")
}

export const createBrowserClient = () => createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client (uses service role key, bypasses RLS)
// Use this with caution and only on the server (e.g., API routes, Server Actions)
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export const createServerClient = () => {
  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables for server client.",
    )
  }
  return createClient(supabaseUrl, supabaseServiceRoleKey)
}
