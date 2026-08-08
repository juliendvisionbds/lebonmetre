"use client";

import { useStats } from "./StatsContext";

export default function Footer() {
  const { stats } = useStats();

  return (
    <footer className="wrap">
      <div className="foot-cart">
        <div className="foot-id">
          <div>
            <div className="logo" style={{ fontSize: 15 }}>
              <span className="logo-mark" style={{ width: 22, height: 22 }}></span>
              Le&nbsp;Bon&nbsp;Métré
            </div>
            <p className="foot-note">
              Métré assisté par IA pour le gros œuvre et le terrassement. Vérification humaine
              requise avant chiffrage. Les quantités produites n&apos;engagent pas la
              responsabilité de l&apos;éditeur.
            </p>
          </div>
          <div className="foot-links">
            <a href="#form">Rejoindre l&apos;alpha</a>
            <a href="#faq">Questions</a>
          </div>
        </div>
        <dl className="foot-meta">
          <div className="foot-cell">
            <dt>Document</dt>
            <dd>Pré-lancement</dd>
          </div>
          <div className="foot-cell">
            <dt>Indice</dt>
            <dd>A</dd>
          </div>
          <div className="foot-cell">
            <dt>Lots couverts</dt>
            <dd>Gros œuvre · Terrassement</dd>
          </div>
          <div className="foot-cell">
            <dt>Statut</dt>
            <dd style={{ color: "var(--orange)" }}>
              Alpha {stats.total}/{stats.capacity}
            </dd>
          </div>
        </dl>
      </div>

      <p className="foot-credit">
        Fait avec 🧡 en France. Propulsé par{" "}
        <a href="https://visionbds.com" target="_blank" rel="noopener noreferrer">
          Visionbds.com
        </a>
      </p>
    </footer>
  );
}
