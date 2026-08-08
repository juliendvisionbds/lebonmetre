const STEPS = [
  {
    n: "Étape 01",
    title: "Déposez le plan",
    text: "PDF d'exécution ou simple scan. Vous ajoutez ce que vous savez déjà : profondeur hors gel, épaisseur de dallage, type d'ouvrage.",
  },
  {
    n: "Étape 02",
    title: "L'IA lit et calcule",
    text: "Cotes, échelle, cubatures. Chaque poste sort avec son détail L × l × h et un badge de fiabilité : cote lue, déduit de l'échelle, ou hypothèse.",
  },
  {
    n: "Étape 03",
    title: "Vérifiez et exportez",
    text: "Vous corrigez une quantité en un clic, vous cochez les postes contrôlés, vous exportez la feuille de minute en CSV — prête pour votre chiffrage.",
  },
];

const ROWS = [
  {
    label: "Béton de propreté sous semelles",
    calc: "38,40 × 0,60 × 0,05",
    qty: "1,15 m³",
    badge: "b-green",
    badgeLabel: "Cote lue",
  },
  {
    label: "Semelles filantes armées",
    calc: "38,40 × 0,60 × 0,25",
    qty: "5,76 m³",
    badge: "b-green",
    badgeLabel: "Cote lue",
  },
  {
    label: "Fouilles en rigole",
    calc: "38,40 × 0,80 × 0,90",
    qty: "27,65 m³",
    badge: "b-amber",
    badgeLabel: "Déduit échelle",
  },
  {
    label: "Hérisson concassé 0/31,5",
    calc: "92,00 × 0,20",
    qty: "18,40 m³",
    badge: "b-red",
    badgeLabel: "Hypothèse",
  },
];

export default function SolutionSection() {
  return (
    <section id="solution" className="wrap">
      <div className="cartouche">
        <span>Lot 03</span>
        <span className="c-title">Solution</span>
        <span className="c-grow c-hide">Métré assisté · vérification humaine</span>
        <span className="c-ind">Ind. A</span>
      </div>

      <h2 className="kicker">Un métré assisté, vérifiable ligne par ligne.</h2>
      <p className="lede">
        Le Bon Métré ne prétend pas remplacer votre œil. Il fait le travail de relevé et de
        calcul, puis vous montre <strong>exactement</strong> ce sur quoi il s&apos;est appuyé —
        pour que vous contrôliez en minutes ce qui vous prenait des heures.
      </p>

      <div className="steps">
        {STEPS.map((s) => (
          <div className="step" key={s.n}>
            <div className="step-n">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 54 }}>
        <div className="dim" style={{ marginBottom: 16 }}>
          <span className="dim-val">Extrait d&apos;une sortie réelle</span>
          <span className="dim-arm r"></span>
        </div>

        <div className="sheet">
          <div className="sheet-top">
            <span>Feuille de minute — Lot 02 · Fondations</span>
            <span>Plan_EXE_02.pdf</span>
          </div>
          <table>
            <thead>
              <tr>
                <th>Poste</th>
                <th>Quantité</th>
                <th>Fiabilité</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td>
                    {row.label}
                    <span className="calc">{row.calc}</span>
                  </td>
                  <td className="q">{row.qty}</td>
                  <td>
                    <span className={`badge ${row.badge}`}>{row.badgeLabel}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sheet-foot">
            <span>Hypothèse retenue : profondeur hors gel 0,90 m (zone H1)</span>
            <span className="mono">3 / 4 postes vérifiés</span>
          </div>
          <div className="stamp">
            Bon pour chiffrage<b>après votre relecture</b>
          </div>
        </div>

        <p style={{ fontSize: 13.5, color: "var(--sub)", marginTop: 16, maxWidth: "64ch" }}>
          Les trois badges sont le cœur du produit. Une quantité marquée{" "}
          <strong>Hypothèse</strong> vous dit où regarder en premier. C&apos;est ce qui distingue
          un outil utilisable d&apos;une boîte noire.
        </p>
      </div>
    </section>
  );
}
