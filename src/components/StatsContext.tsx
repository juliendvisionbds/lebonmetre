"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import type { WaitlistStats } from "@/lib/waitlist";

type StatsContextValue = {
  stats: WaitlistStats;
  setStats: (stats: WaitlistStats) => void;
  refreshStats: () => Promise<void>;
};

const StatsContext = createContext<StatsContextValue | null>(null);

export function StatsProvider({
  initialStats,
  children,
}: {
  initialStats: WaitlistStats;
  children: ReactNode;
}) {
  const [stats, setStats] = useState<WaitlistStats>(initialStats);

  const refreshStats = useCallback(async () => {
    try {
      const res = await fetch("/api/waitlist", { cache: "no-store" });
      if (res.ok) {
        setStats(await res.json());
      }
    } catch {
      // Silencieux : le compteur reste sur sa dernière valeur connue.
    }
  }, []);

  return (
    <StatsContext.Provider value={{ stats, setStats, refreshStats }}>
      {children}
    </StatsContext.Provider>
  );
}

export function useStats(): StatsContextValue {
  const ctx = useContext(StatsContext);
  if (!ctx) {
    throw new Error("useStats doit être utilisé à l'intérieur d'un <StatsProvider>.");
  }
  return ctx;
}
