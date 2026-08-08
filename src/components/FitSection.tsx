const YES = [
  "Vous êtes en gros œuvre, terrassement ou maçonnerie générale",
  "Vous chiffrez vous-même, ou vous êtes deux à le faire",
  "Vous travaillez sur des plans PDF ou des scans, pas en BIM complet",
  "Vous laissez passer des DCE faute de temps",
  "Vous acceptez de relire une sortie IA au lieu de la croire",
];

const NO = [
  "Vous attendez un métré fiable à 100 % sans aucune vérification",
  "Votre activité est en second œuvre uniquement",
  "Vous travaillez déjà en IFC avec extraction de quantités automatisée",
  "Vous avez besoin d'une sortie DPGF chiffrée dès maintenant",
  "Vous cherchez un outil déjà stable, pas un produit en construction",
];

export default function FitSection() {
  return (
    <section className="wrap" style={{ paddingTop: 20 }}>
      <h2 className="kicker" style={{ marginTop: 0 }}>
        Pour qui c&apos;est fait — et pour qui ça ne l&apos;est pas.
      </h2>

      <div className="fit">
        <div className="fit-card yes">
          <h4>Vous êtes exactement la bonne personne si…</h4>
          <ul>
            {YES.map((item) => (
              <li key={item}>
                <span className="tick">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="fit-card no">
          <h4>Passez votre tour si…</h4>
          <ul>
            {NO.map((item) => (
              <li key={item}>
                <span className="later-mark">→</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
