const PERKS = [
  {
    tag: "Accès",
    title: "Gratuit, sans limite, pendant toute l'alpha",
    text: "Autant de métrés que vous voulez, sur vos vrais dossiers. Pas de carte bancaire, pas de crédits, pas de compte à rebours.",
  },
  {
    tag: "Tarif",
    title: "Prix fondateur verrouillé après l'alpha",
    text: "Le tarif public sera de 199 € par métré. Les alpha-testeurs gardent 99 € par métré, définitivement, sur tous leurs dossiers.",
  },
  {
    tag: "Influence",
    title: "Vos corrections entraînent le moteur",
    text: "Chaque quantité que vous rectifiez nous dit où l'IA se trompe et sur quel poste concentrer le travail. Vos dossiers façonnent le produit.",
  },
  {
    tag: "Contact",
    title: "Ligne directe, pas de support ticket",
    text: "Une petite équipe, pas un centre d'appels. Vous répondez à notre email, on vous répond directement. Un point de 20 minutes par visio si vous le souhaitez.",
  },
];

export default function AlphaSection() {
  return (
    <section id="alpha" className="wrap" style={{ paddingTop: 56 }}>
      <div className="cartouche">
        <span>Lot 05</span>
        <span className="c-title">L&apos;alpha</span>
        <span className="c-grow c-hide">30 places · ouverture 09.2026</span>
        <span className="c-ind">Ind. A</span>
      </div>

      <h2 className="kicker">Ce que vous obtenez en entrant maintenant.</h2>
      <p className="lede">
        Trente entreprises, une vague d&apos;ouverture par semaine. En échange de vos retours,
        vous ne payez rien et vous gardez un avantage durable.
      </p>

      <div style={{ marginTop: 28 }}>
        <a href="#form" className="cta" style={{ display: "inline-block", width: "auto", marginTop: 0 }}>
          Réserver ma place
        </a>
      </div>

      <div className="perks">
        {PERKS.map((perk) => (
          <div className="perk" key={perk.tag}>
            <div className="tag">{perk.tag}</div>
            <h4>{perk.title}</h4>
            <p>{perk.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
