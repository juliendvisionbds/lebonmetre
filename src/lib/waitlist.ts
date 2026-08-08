import { getDb } from "./db";

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

export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

export function getStats(): WaitlistStats {
  const db = getDb();
  const { count } = db
    .prepare("SELECT COUNT(*) as count FROM waitlist_entries")
    .get() as { count: number };

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

export type RegisterResult = {
  rank: number;
  alreadyRegistered: boolean;
};

export function registerEmail(email: string, source: string): RegisterResult {
  const db = getDb();
  const normalized = email.trim().toLowerCase();

  const existing = db
    .prepare("SELECT id FROM waitlist_entries WHERE email = ?")
    .get(normalized) as { id: number } | undefined;

  if (existing) {
    return { rank: BASELINE_RESERVED + existing.id, alreadyRegistered: true };
  }

  const info = db
    .prepare("INSERT INTO waitlist_entries (email, source) VALUES (?, ?)")
    .run(normalized, source);

  return { rank: BASELINE_RESERVED + Number(info.lastInsertRowid), alreadyRegistered: false };
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

export function completeProfile(email: string, profile: ProfileInput): CompleteProfileResult {
  const db = getDb();
  const normalized = email.trim().toLowerCase();

  const info = db
    .prepare(
      `UPDATE waitlist_entries
       SET metier = ?, volume = ?, plans = ?, profile_completed_at = datetime('now')
       WHERE email = ?`
    )
    .run(profile.metier, profile.volume, profile.plans, normalized);

  if (info.changes === 0) {
    return { updated: false, rank: null };
  }

  const row = db
    .prepare("SELECT id FROM waitlist_entries WHERE email = ?")
    .get(normalized) as { id: number } | undefined;

  return { updated: true, rank: row ? BASELINE_RESERVED + row.id : null };
}
