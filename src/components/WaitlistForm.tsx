"use client";

import { useState } from "react";
import { useStats } from "./StatsContext";

const METIERS = [
  "Gros œuvre",
  "Terrassement / VRD",
  "Gros œuvre + terrassement",
  "Maçonnerie générale",
  "Économiste / bureau d'études",
  "Maître d'œuvre",
  "Autre",
];

const VOLUMES = ["1 à 3", "4 à 10", "11 à 25", "Plus de 25"];

const PLAN_FORMATS = [
  "PDF d'exécution côtés",
  "Scans / photos de plans papier",
  "Les deux",
  "DWG / fichiers CAO",
];

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

const INVALID_EMAIL_MESSAGE = "Entrez une adresse email valide pour continuer.";
const SERVER_ERROR_MESSAGE = "Une erreur est survenue, réessayez dans quelques instants.";

type Step = "email" | "profile" | "done";

export default function WaitlistForm() {
  const { stats, setStats } = useStats();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [metier, setMetier] = useState(METIERS[0]);
  const [volume, setVolume] = useState(VOLUMES[0]);
  const [planFormat, setPlanFormat] = useState(PLAN_FORMATS[0]);
  const [rank, setRank] = useState<number | null>(null);

  async function handleEmailSubmit() {
    if (!isEmail(email)) {
      setErrorMessage(INVALID_EMAIL_MESSAGE);
      return;
    }
    setErrorMessage(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, step: "email", source: "hero" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        setRank(data.rank);
        if (data.stats) setStats(data.stats);
        setStep("profile");
      } else {
        setErrorMessage(SERVER_ERROR_MESSAGE);
      }
    } catch {
      setErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleProfileSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, step: "profile", metier, volume, plans: planFormat }),
      });
      const data = await res.json();
      if (data?.stats) setStats(data.stats);
    } finally {
      setSubmitting(false);
      setStep("done");
    }
  }

  const ratio = stats.capacity > 0 ? stats.total / stats.capacity : 0;
  const blockCount = 6;
  const filledBlocks = Math.min(blockCount, Math.floor(ratio * blockCount));
  const hasHalfBlock = ratio * blockCount - filledBlocks >= 0.4 && filledBlocks < blockCount;

  return (
    <div id="form" className="form-card">
      <div className="form-head">
        <span>Inscription alpha</span>
        <span className="mono">IND. A</span>
      </div>

      <div className="form-body">
        {step === "email" && (
          <div id="step1">
            <h3>Réservez votre place</h3>
            <p className="hint">Accès gratuit pendant toute l&apos;alpha.</p>

            <div className="field">
              <label htmlFor="email">Votre email professionnel</label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="prenom@votre-entreprise.fr"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleEmailSubmit();
                }}
              />
            </div>

            <button className="cta" onClick={handleEmailSubmit} disabled={submitting}>
              {submitting ? "…" : "Réserver ma place"}
            </button>
            <p className={`err${errorMessage ? " show" : ""}`}>{errorMessage}</p>

            <div className="scale">
              <div className="scale-head">
                <span>Places attribuées</span>
                <strong className="mono">
                  {stats.total} / {stats.capacity}
                </strong>
              </div>
              <div className="scale-bar" aria-hidden="true">
                {Array.from({ length: blockCount }).map((_, i) => (
                  <i key={i} className={i < filledBlocks ? "f" : hasHalfBlock && i === filledBlocks ? "h" : ""} />
                ))}
              </div>
              <div className="scale-ticks">
                <span>0</span>
                <span>10</span>
                <span>20</span>
                <span>30</span>
              </div>
            </div>
          </div>
        )}

        {step === "profile" && (
          <div id="step2">
            <span className="step-n">Étape 02 / 02</span>
            <h3 style={{ marginTop: 11 }}>Sur quoi vous chiffrez ?</h3>
            <p className="hint">Ça détermine l&apos;ordre d&apos;entrée dans l&apos;alpha. 15 secondes.</p>

            <div className="field">
              <label htmlFor="metier">Votre activité principale</label>
              <select id="metier" value={metier} onChange={(e) => setMetier(e.target.value)}>
                {METIERS.map((m) => (
                  <option key={m}>{m}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="volume">Devis chiffrés par mois</label>
              <select id="volume" value={volume} onChange={(e) => setVolume(e.target.value)}>
                {VOLUMES.map((v) => (
                  <option key={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="plans">Vos plans arrivent sous quelle forme ?</label>
              <select id="plans" value={planFormat} onChange={(e) => setPlanFormat(e.target.value)}>
                {PLAN_FORMATS.map((p) => (
                  <option key={p}>{p}</option>
                ))}
              </select>
            </div>

            <button className="cta dark" onClick={handleProfileSubmit} disabled={submitting}>
              {submitting ? "…" : "Valider mon inscription"}
            </button>
            <p className="microcopy">Vous pouvez répondre plus tard, votre place est déjà tenue.</p>
          </div>
        )}

        {step === "done" && (
          <div id="done" className="success show">
            <div className="success-mark">✓</div>
            <h3>Votre place est réservée.</h3>
            <p>
              Vous recevrez un email dès l&apos;ouverture de votre accès, avec un plan de test
              et le lien direct vers l&apos;outil. Rien d&apos;autre entre-temps.
            </p>
            <div className="rank">
              Position : <b>#{rank ?? "…"}</b> · vague 01
            </div>
            <p style={{ marginTop: 16 }}>
              Une question d&apos;ici là ? Répondez simplement à l&apos;email de confirmation,
              c&apos;est nous qui lisons.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
