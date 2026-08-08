"use client";

import { useState, type SyntheticEvent } from "react";

const FAQS: { q: string; a: string[] }[] = [
  {
    q: "C'est fiable à combien de pourcents ?",
    a: [
      "La bonne question, et la réponse honnête est : ça dépend de votre plan, et l'outil vous le dit. Une cote clairement inscrite est lue avec une fiabilité très élevée. Une dimension déduite de l'échelle l'est moins. Une donnée absente du plan devient une hypothèse explicitement signalée. C'est précisément pour ça que chaque ligne porte un badge : vous ne relisez pas tout, vous relisez ce qui est marqué.",
      "Le Bon Métré est un outil de métré assisté avec vérification humaine. Ce n'est pas un oracle, et je ne le vendrai jamais comme tel.",
    ],
  },
  {
    q: "Que devient mon plan une fois uploadé ?",
    a: [
      "Il est traité pour produire votre métré, puis conservé sur votre compte le temps que vous en ayez besoin. Vous pouvez le supprimer à tout moment. Aucun plan n'est partagé, revendu, ni utilisé pour entraîner un modèle public. Si votre dossier est sous accord de confidentialité, dites-le à l'inscription : je peux signer un NDA avant votre premier upload.",
    ],
  },
  {
    q: "Quel type de plan faut-il ?",
    a: [
      "Un plan côté, avec une échelle. Idéalement un PDF d'exécution, mais un scan propre ou une photo bien cadrée fonctionne. Plus votre plan est renseigné — coupes, niveaux, épaisseurs — moins l'outil aura besoin de faire des hypothèses.",
      "Si un plan est illisible, l'outil vous le dit au lieu de deviner.",
    ],
  },
  {
    q: "Les 4 minutes, c'est vraiment 4 minutes ?",
    a: [
      "C'est le temps d'analyse machine, mesuré sur des plans de maison individuelle et d'extension. Ajoutez votre relecture : comptez 10 à 20 minutes au total pour un métré que vous pouvez signer. À comparer à vos 3 à 5 heures actuelles, pas à zéro.",
    ],
  },
  {
    q: "Ça coûte quoi pendant l'alpha ?",
    a: [
      "Rien. Pas de carte, pas d'essai de 14 jours, pas de conversion automatique en abonnement. Vous entrez, vous utilisez, vous me dites ce qui cloche. Le seul engagement attendu est un retour honnête sur vos premiers métrés.",
    ],
  },
  {
    q: "Et après l'alpha, je suis obligé de payer ?",
    a: [
      "Non. À la fin de l'alpha, vous choisissez : soit vous continuez au tarif fondateur de 99 € par métré, verrouillé à vie, soit vous arrêtez. Vous gardez dans tous les cas l'export CSV de tous les métrés déjà produits.",
    ],
  },
  {
    q: "Je fais du second œuvre, ça m'intéresse quand même — je m'inscris ?",
    a: [
      "Inscrivez-vous, mais sachez que vous n'entrerez pas dans la première vague. L'alpha est concentrée sur le gros œuvre et le terrassement, parce qu'un outil de métré médiocre sur dix lots est moins utile qu'un outil précis sur quatre. Vous serez prévenu quand le second œuvre ouvrira.",
    ],
  },
  {
    q: "Qui est derrière Le Bon Métré ?",
    a: [
      "Un builder solo, en France, qui développe le produit avec des professionnels du gros œuvre plutôt qu'à leur place. Pas de levée de fonds, pas de service commercial. L'email que vous recevrez vient de moi, et vous pouvez y répondre.",
    ],
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  function handleToggle(e: SyntheticEvent<HTMLDetailsElement>, i: number) {
    const isOpen = e.currentTarget.open;
    setOpenIndex(isOpen ? i : openIndex === i ? null : openIndex);
  }

  return (
    <section id="faq" className="wrap" style={{ paddingTop: 56 }}>
      <div className="cartouche">
        <span>Lot 06</span>
        <span className="c-title">Questions</span>
        <span className="c-grow c-hide">Fiabilité · confidentialité · tarif</span>
        <span className="c-ind">Ind. A</span>
      </div>

      <h2 className="kicker">Ce qu&apos;on me demande le plus.</h2>

      <div className="faq">
        {FAQS.map((item, i) => (
          <details key={item.q} open={openIndex === i} onToggle={(e) => handleToggle(e, i)}>
            <summary>{item.q}</summary>
            {item.a.map((p, j) => (
              <p key={j}>{p}</p>
            ))}
          </details>
        ))}
      </div>
    </section>
  );
}
