import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/**
 * Client Supabase côté serveur uniquement (clé service_role : accès complet,
 * ne doit jamais être exposée au navigateur ni préfixée par NEXT_PUBLIC_).
 */
export function getSupabase(): SupabaseClient {
  if (!client) {
    const url = process.env.SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!url || !serviceRoleKey) {
      throw new Error(
        "SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définis (voir .env.local.example)."
      );
    }

    client = createClient(url, serviceRoleKey, {
      auth: { persistSession: false },
    });
  }

  return client;
}
