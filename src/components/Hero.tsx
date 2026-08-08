import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="hero millim">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="flag">
              <span className="dot"></span>
              <span className="flag-txt">Alpha privée : ouverture en septembre</span>
            </div>

            <h1>
              Le métré gros œuvre de vos plans, en <em>4 minutes</em>.
            </h1>

            <div className="dim dim-draw" style={{ marginTop: 22, maxWidth: 440 }}>
              <span className="dim-arm l"></span>
              <span className="dim-val o">Dépôt du plan → feuille de minute</span>
              <span className="dim-arm r"></span>
            </div>

            <p className="hero-sub">
              Vous déposez le plan. Le Bon Métré lit les cotes, calcule les cubatures et sort une
              feuille de minute complète, avec le détail de chaque calcul et son niveau de fiabilité.
              Vous vérifiez, vous corrigez, vous chiffrez.
            </p>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
