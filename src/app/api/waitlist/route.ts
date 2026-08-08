import { NextRequest, NextResponse } from "next/server";
import {
  completeProfile,
  getStats,
  isValidEmail,
  registerEmail,
} from "@/lib/waitlist";

// La DB SQLite est lue/écrite à chaque appel : jamais de cache statique.
export const dynamic = "force-dynamic";

type WaitlistBody = {
  step?: "email" | "profile";
  email?: string;
  source?: string;
  metier?: string;
  volume?: string;
  plans?: string;
};

export async function GET() {
  return NextResponse.json(getStats());
}

export async function POST(request: NextRequest) {
  let body: WaitlistBody;
  try {
    body = (await request.json()) as WaitlistBody;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email : "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  if (body.step === "profile") {
    completeProfile(email, {
      metier: body.metier ?? "",
      volume: body.volume ?? "",
      plans: body.plans ?? "",
    });
    return NextResponse.json({ ok: true, stats: getStats() });
  }

  const { rank } = registerEmail(email, body.source ?? "unknown");
  return NextResponse.json({ ok: true, rank, stats: getStats() });
}
