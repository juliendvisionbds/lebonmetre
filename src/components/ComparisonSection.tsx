const ROWS = [
  { label: "Délai", manual: "3 à 5 h de votre temps", external: "3 à 10 jours", ours: "4 minutes + relecture" },
  { label: "Coût", manual: "Une soirée, tous les soirs", external: "400 à 1 200 €", ours: "Gratuit pendant l'alpha" },
  { label: "Traçabilité", manual: "Dans votre tête", external: "Selon le prestataire", ours: "Chaque ligne détaillée" },
  { label: "Hypothèses", manual: "Rarement notées", external: "Parfois", ours: "Systématiquement" },
  { label: "Dimanche 21 h", manual: "Oui, malheureusement", external: "Non", ours: "Oui" },
];

export default function ComparisonSection() {
  return (
    <section className="wrap" style={{ paddingTop: 20 }}>
      <div className="dim">
        <span className="dim-val">Ordre de grandeur</span>
        <span className="dim-arm r"></span>
      </div>
      <h2 className="kicker">Trois façons de sortir un métré.</h2>

      <div className="cmp">
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Vous, à la main</th>
              <th>Métreur externe</th>
              <th className="hi">Le Bon Métré</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((row) => (
              <tr key={row.label}>
                <td className="lab">{row.label}</td>
                <td>{row.manual}</td>
                <td>{row.external}</td>
                <td className="hi">{row.ours}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
