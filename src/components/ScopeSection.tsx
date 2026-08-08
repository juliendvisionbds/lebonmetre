const DONE = [
  "Lots terrassement, fondations, élévations, dallage",
  "Upload PDF d'exécution ou scan / photo de plan",
  "Détail du calcul affiché pour chaque ligne (L × l × h)",
  "Badge de fiabilité par poste et hypothèses explicites",
  "Correction des quantités en ligne, valeur IA conservée",
  "Compteur de postes vérifiés avant export",
  "Export CSV avec quantité finale, quantité IA et statut",
];

const LATER = [
  "Second œuvre (cloisons, plâtrerie, revêtements)",
  "Lecture native DWG / IFC — passez par un export PDF",
  "Prix unitaires et sortie DPGF chiffrée",
  "Recoupement automatique de plusieurs plans d'un même projet",
  "Export direct vers Batigest, Onaya, EBP",
  "Comptes multi-utilisateurs et historique partagé",
];

export default function ScopeSection() {
  return (
    <section className="wrap" style={{ paddingTop: 20 }}>
      <div className="cartouche">
        <span>Lot 04</span>
        <span className="c-title">Périmètre</span>
        <span className="c-grow c-hide">État d&apos;avancement au 08.2026</span>
        <span className="c-ind">Ind. A</span>
      </div>

      <h2 className="kicker">
        Ce que l&apos;alpha fait déjà — et ce qu&apos;elle ne fait pas encore.
      </h2>
      <p className="lede">Autant vous le dire maintenant plutôt qu&apos;après votre inscription.</p>

      <div className="scope">
        <div className="scope-card">
          <h4>
            <span className="tick">✓</span> Opérationnel aujourd&apos;hui
          </h4>
          <ul>
            {DONE.map((item) => (
              <li key={item}>
                <span className="tick">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="scope-card later-card">
          <h4>
            <span className="later-mark">→</span> Pas encore
          </h4>
          <ul className="later">
            {LATER.map((item) => (
              <li key={item}>
                <span className="later-mark">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p style={{ fontSize: 14.5, color: "var(--sub)", marginTop: 26, maxWidth: "64ch" }}>
        Et une chose qui ne changera pas :{" "}
        <strong style={{ color: "var(--ink)" }}>
          la vérification humaine reste obligatoire avant chiffrage.
        </strong>{" "}
        Aucun outil ne signera un devis à votre place.
      </p>
    </section>
  );
}
