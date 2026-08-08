import WaitlistForm from "./WaitlistForm";

export default function Hero() {
  return (
    <section className="hero millim">
      <div className="wrap">
        <div className="hero-grid">
          <div>
            <div className="flag">
              <span className="dot"></span>
              <span className="flag-txt">L&apos;alpha privée ouvre en septembre</span>
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
              feuille de minute complète — avec le détail de chaque calcul et son niveau de fiabilité.
              Vous vérifiez, vous corrigez, vous chiffrez.
            </p>

            <div className="dim" style={{ marginTop: 32 }}>
              <span className="dim-val">30 entreprises</span>
              <span className="dim-arm l" style={{ opacity: 0.2 }}></span>
              <span className="dim-val">pas une de plus</span>
            </div>

            <p className="hero-note">
              L&apos;alpha est volontairement petite : chaque retour passe directement dans le
              produit, chaque semaine.{" "}
              <strong>Ce n&apos;est pas une bêta déguisée en liste d&apos;attente.</strong>
            </p>
          </div>

          <WaitlistForm />
        </div>
      </div>
    </section>
  );
}
