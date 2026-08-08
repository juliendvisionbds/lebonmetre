const ITEMS = [
  {
    num: "−12 %",
    title: "La cubature sous-estimée",
    text: "Douze pour cent de béton de fondation en moins sur le papier. En réalité, c'est la marge du chantier qui part dans les toupies, et vous ne le découvrez qu'au troisième bon de livraison.",
  },
  {
    num: "48 h",
    title: "Le concurrent qui répond avant vous",
    text: "Il a rendu en deux jours. Vous en six. Le maître d'ouvrage avait déjà un chiffre en tête quand le vôtre est arrivé. On ne vous dira jamais que c'est ça qui a compté.",
  },
  {
    num: "0",
    title: "La trace de vos hypothèses",
    text: "Réunion de litige, dix-huit mois plus tard. On vous demande sur quelle base vous avez chiffré les déblais. Le fichier a été écrasé quatre fois. Vous n'avez rien à sortir.",
  },
  {
    num: "7 / 10",
    title: "Les DCE que vous ne chiffrez pas",
    text: "Sur dix dossiers reçus, vous en traitez trois. Pas par manque d'envie — par manque d'heures. Ceux que vous laissez passer, vous ne les compterez jamais dans vos pertes.",
  },
];

export default function AgitationSection() {
  return (
    <section className="agit hatch">
      <div className="wrap">
        <div className="cartouche on-plan">
          <span>Lot 02</span>
          <span className="c-title">Conséquences</span>
          <span className="c-grow c-hide">Ce que coûte un métré approximatif</span>
          <span className="c-ind" style={{ color: "var(--orange)" }}>
            Ind. A
          </span>
        </div>

        <h2>
          Un métré approximatif ne se paie pas au bureau. <span>Il se paie sur le chantier.</span>
        </h2>

        <div className="agit-items">
          {ITEMS.map((item) => (
            <div className="agit-item" key={item.title}>
              <div className="num">{item.num}</div>
              <h4>{item.title}</h4>
              <p>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="dim on-plan" style={{ marginTop: 48, maxWidth: 620 }}>
          <span className="dim-arm l"></span>
          <span className="dim-val">Marge · carnet de commandes</span>
          <span className="dim-arm r"></span>
        </div>

        <p className="agit-close">
          Le métré n&apos;est pas une tâche administrative. C&apos;est l&apos;endroit exact où
          votre marge et votre carnet de commandes se décident.
        </p>
      </div>
    </section>
  );
}
