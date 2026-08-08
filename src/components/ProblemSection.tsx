const PROBLEMS = [
  {
    n: "01",
    title: "Vous relevez à la main",
    text: "Échelle, cotes, report sur la feuille de minute. Une ligne oubliée et tout le poste est faux, sans que rien ne le signale.",
  },
  {
    n: "02",
    title: "Vous ressaisissez dans Excel",
    text: "Le classeur maison, celui que vous seul savez lire. Trois onglets, des formules de 2019, aucun historique de qui a modifié quoi.",
  },
  {
    n: "03",
    title: "Les plans sont incomplets",
    text: "Pas de profondeur hors gel, coupe manquante, épaisseur de dallage nulle part. Vous supposez, et vous oubliez ce que vous avez supposé.",
  },
  {
    n: "04",
    title: "Vous le faites le soir",
    text: "Parce que la journée est sur le chantier. Le métré se fait à 21 h, fatigué, la veille de la remise.",
  },
];

export default function ProblemSection() {
  return (
    <section id="probleme" className="wrap" style={{ paddingTop: 56 }}>
      <div className="cartouche">
        <span>Lot 01</span>
        <span className="c-title">Problème</span>
        <span className="c-grow c-hide">Le goulot d&apos;étranglement du chiffrage</span>
        <span className="c-ind">Ind. A</span>
      </div>

      <h2 className="kicker">
        Ce qui vous prend du temps, ce n&apos;est pas le chiffrage. C&apos;est le métré.
      </h2>
      <p className="lede">
        Sur un DCE de maison individuelle, sortir les quantités propres (déblais, semelles,
        voiles, dallage), c&apos;est trois à cinq heures. Avant même d&apos;avoir posé un prix.
        Et personne ne vous paie pour ces heures-là.
      </p>

      <div className="prob-list">
        {PROBLEMS.map((p) => (
          <div className="prob" key={p.n}>
            <div className="prob-n">{p.n}</div>
            <h4>{p.title}</h4>
            <p>{p.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
