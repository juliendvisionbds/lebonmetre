"use client";

import { useState } from "react";
import { useStats } from "./StatsContext";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

const INVALID_EMAIL_MESSAGE = "Entrez une adresse email valide pour continuer.";
const SERVER_ERROR_MESSAGE = "Une erreur est survenue, réessayez dans quelques instants.";

export default function FinalCta() {
  const { stats, setStats } = useStats();
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
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
        body: JSON.stringify({ email, step: "email", source: "footer" }),
      });
      const data = await res.json();
      if (res.ok && data.ok) {
        if (data.stats) setStats(data.stats);
        setDone(true);
      } else {
        setErrorMessage(SERVER_ERROR_MESSAGE);
      }
    } catch {
      setErrorMessage(SERVER_ERROR_MESSAGE);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="final millim">
      <div className="wrap">
        <div className="dim">
          <span className="dim-val o">Ouverture septembre 2026</span>
          <span className="dim-arm r"></span>
        </div>

        <h2>Votre prochain DCE peut partir demain matin.</h2>
        <p className="lede">
          Trente places. Accès gratuit pendant toute l&apos;alpha, tarif fondateur ensuite. Il
          vous faut une adresse email et dix secondes.
        </p>

        <div className="final-form">
          {!done ? (
            <div id="step1b">
              <div className="inline-form">
                <input
                  id="email2"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="prenom@votre-entreprise.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                />
                <button className="cta" onClick={handleSubmit} disabled={submitting}>
                  {submitting ? "…" : "Réserver ma place"}
                </button>
              </div>
              <p className={`err${errorMessage ? " show" : ""}`}>{errorMessage}</p>
              <p style={{ fontSize: 13, color: "var(--sub)", marginTop: 14 }}>
                Un email à l&apos;ouverture, un autre si le produit change vraiment. Rien
                d&apos;autre. Désinscription en un clic.
              </p>
            </div>
          ) : (
            <div id="done2" className="success show">
              <div className="success-mark">✓</div>
              <h3>C&apos;est noté.</h3>
              <p>
                Votre place est tenue. Vous recevrez le lien d&apos;accès à l&apos;ouverture de
                votre vague.
              </p>
            </div>
          )}
        </div>

        <div className="dim" style={{ marginTop: 48 }}>
          <span className="dim-arm l"></span>
          <span className="dim-val">
            {stats.total} attribuées · {stats.remaining} restantes
          </span>
          <span className="dim-arm r"></span>
        </div>
      </div>
    </section>
  );
}
