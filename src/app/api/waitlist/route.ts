import { NextRequest, NextResponse } from "next/server";
import { notifyAdminNewSignup, notifyAdminProfileCompleted, sendWaitlistConfirmationEmail } from "@/lib/email";
import {
  completeProfile,
  getStats,
  isValidEmail,
  registerEmail,
} from "@/lib/waitlist";

// Les stats viennent de Supabase à chaque appel : jamais de cache statique.
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
  try {
    const stats = await getStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error("GET /api/waitlist a échoué :", err);
    return NextResponse.json({ error: "stats_unavailable" }, { status: 500 });
  }
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

  try {
    if (body.step === "profile") {
      const metier = body.metier ?? "";
      const volume = body.volume ?? "";
      const plans = body.plans ?? "";
      const { updated, rank } = await completeProfile(email, { metier, volume, plans });

      if (updated && rank !== null) {
        // Best-effort : un échec d'envoi ne doit jamais faire échouer l'inscription déjà enregistrée.
        try {
          await notifyAdminProfileCompleted({ email, rank, metier, volume, plans });
        } catch (err) {
          console.error("Échec de l'envoi de la notification 'profil complété' :", err);
        }
      }

      const stats = await getStats();
      return NextResponse.json({ ok: true, stats });
    }

    const { rank, alreadyRegistered } = await registerEmail(email, body.source ?? "unknown");

    if (!alreadyRegistered) {
      try {
        await Promise.all([
          sendWaitlistConfirmationEmail({ email, rank }),
          notifyAdminNewSignup({ email, rank, source: body.source ?? "unknown" }),
        ]);
      } catch (err) {
        console.error("Échec de l'envoi des emails d'inscription à l'alpha :", err);
      }
    }

    const stats = await getStats();
    return NextResponse.json({ ok: true, rank, stats });
  } catch (err) {
    console.error("POST /api/waitlist a échoué :", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
