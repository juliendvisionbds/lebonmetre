import { getSupabase } from "./db";

const TABLE = "waitlist_entries";

/** Nombre total de places de l'alpha. */
export const ALPHA_CAPACITY = 30;

/**
 * Places déjà réservées avant la mise en place de ce backend (reprend le
 * "13/30" de la maquette statique). Les inscriptions réelles s'additionnent
 * à cette base pour donner le compteur et le rang affichés.
 */
const BASELINE_RESERVED = 13;

export type WaitlistStats = {
  capacity: number;
  total: number;
  remaining: number;
  percent: number;
  full: boolean;
};

function statsFromCount(count: number): WaitlistStats {
  const total = BASELINE_RESERVED + count;
  const remaining = Math.max(ALPHA_CAPACITY - total, 0);
  const percent = Math.min(Math.round((total / ALPHA_CAPACITY) * 100), 100);

  return {
    capacity: ALPHA_CAPACITY,
    total,
    remaining,
    percent,
    full: total >= ALPHA_CAPACITY,
  };
}

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export async function getStats(): Promise<WaitlistStats> {
  const supabase = getSupabase();
  const { count, error } = await supabase
    .from(TABLE)
    .select("*", { count: "exact", head: true });

  if (error) {
    throw error;
  }

  return statsFromCount(count ?? 0);
}

/**
 * Variante best-effort pour le rendu serveur de la page : ne doit jamais
 * faire planter l'affichage si Supabase est momentanément inaccessible.
 */
export async function getStatsOrDefault(): Promise<WaitlistStats> {
  try {
    return await getStats();
  } catch (err) {
    console.error("Impossible de récupérer les stats de la waitlist :", err);
    return statsFromCount(0);
  }
}

export type RegisterResult = {
  rank: number;
  alreadyRegistered: boolean;
};

export async function registerEmail(email: string, source: string): Promise<RegisterResult> {
  const supabase = getSupabase();
  const normalized = email.trim().toLowerCase();

  const { data: inserted, error: insertError } = await supabase
    .from(TABLE)
    .insert({ email: normalized, source })
    .select("id")
    .single();

  if (!insertError && inserted) {
    return { rank: BASELINE_RESERVED + inserted.id, alreadyRegistered: false };
  }

  // Email déjà inscrit (contrainte unique en base) : on retrouve son rang existant
  // plutôt que de faire échouer la requête.
  const { data: existing, error: selectError } = await supabase
    .from(TABLE)
    .select("id")
    .eq("email", normalized)
    .single();

  if (selectError || !existing) {
    throw insertError ?? selectError ?? new Error("Impossible d'enregistrer l'inscription.");
  }

  return { rank: BASELINE_RESERVED + existing.id, alreadyRegistered: true };
}

export type ProfileInput = {
  metier: string;
  volume: string;
  plans: string;
};

export type CompleteProfileResult = {
  updated: boolean;
  rank: number | null;
};

export async function completeProfile(
  email: string,
  profile: ProfileInput
): Promise<CompleteProfileResult> {
  const supabase = getSupabase();
  const normalized = email.trim().toLowerCase();

  const { data, error } = await supabase
    .from(TABLE)
    .update({
      metier: profile.metier,
      volume: profile.volume,
      plans: profile.plans,
      profile_completed_at: new Date().toISOString(),
    })
    .eq("email", normalized)
    .select("id")
    .maybeSingle();

  if (error || !data) {
    return { updated: false, rank: null };
  }

  return { updated: true, rank: BASELINE_RESERVED + data.id };
}
