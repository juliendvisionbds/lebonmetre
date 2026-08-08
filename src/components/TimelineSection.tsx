const STEPS = [
  {
    when: "Août 2026 · en cours",
    title: "Constitution de la liste",
    text: "Le moteur tourne, testé sur des plans réels de maison individuelle et d'extension. On sélectionne les 30 premières entreprises.",
    active: true,
  },
  {
    when: "Septembre 2026",
    title: "Ouverture de l'alpha",
    text: "Accès par vagues hebdomadaires, dans l'ordre d'inscription et de pertinence du profil. Un plan de test fourni pour démarrer.",
    active: false,
  },
  {
    when: "Octobre 2026",
    title: "Itérations sur vos corrections",
    text: "Une mise à jour par semaine, priorisée sur les postes où vous rectifiez le plus. Recoupement multi-plans en chantier.",
    active: false,
  },
  {
    when: "Fin 2026",
    title: "Bêta ouverte et sortie DPGF",
    text: "Prix unitaires, export DPGF chiffré, tarif public à 199 € par métré. Les alpha-testeurs restent à 99 €.",
    active: false,
  },
];

export default function TimelineSection() {
  return (
    <section className="wrap" style={{ paddingTop: 20 }}>
      <div className="dim">
        <span className="dim-val">Calendrier</span>
        <span className="dim-arm r"></span>
      </div>
      <h2 className="kicker">Où on en est, où on va.</h2>

      <div className="tl">
        {STEPS.map((step) => (
          <div className={`tl-row${step.active ? " active" : ""}`} key={step.title}>
            <div className="tl-rail">
              <div className="tl-dot"></div>
              <div className="tl-line"></div>
            </div>
            <div className="tl-body">
              <div className="tl-when">{step.when}</div>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
