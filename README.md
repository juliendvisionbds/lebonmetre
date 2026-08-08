# Le Bon Métré — page de pré-lancement

Landing page de pré-lancement pour Le Bon Métré, construite avec Next.js (App Router,
TypeScript) et une vraie API route pour gérer l'inscription à l'alpha.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **better-sqlite3** pour la persistance de la liste d'attente (fichier local, aucun service externe requis)
- Polices **Sora / Inter / IBM Plex Mono** via `next/font/google`
- CSS "vanilla" (pas de framework) — reprend fidèlement le design fourni (identité "jeu de plans")

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

La base SQLite est créée automatiquement dans `data/waitlist.db` au premier lancement
(ce fichier est ignoré par git).

## Architecture

```
src/
  app/
    page.tsx              # Assemble toutes les sections de la page
    layout.tsx            # Polices + métadonnées SEO
    globals.css           # Design system complet (variables, cartouches, cotes, etc.)
    api/waitlist/route.ts # API route : GET (stats) / POST (inscription email + profil)
  components/
    StatsContext.tsx       # Contexte React partagé (compteur de places en temps réel)
    WaitlistForm.tsx        # Formulaire d'inscription en 2 étapes (hero)
    FinalCta.tsx             # Formulaire d'inscription simplifié (CTA de fin de page)
    Footer.tsx               # Affiche le statut dynamique de l'alpha
    Header.tsx, Hero.tsx, ProblemSection.tsx, ... # Sections statiques du contenu
  lib/
    db.ts        # Connexion SQLite (singleton, survit au hot-reload)
    waitlist.ts  # Logique métier : validation email, calcul de rang, stats de places
```

## API

### `GET /api/waitlist`

Retourne l'état courant de la liste d'attente :

```json
{ "capacity": 30, "total": 13, "remaining": 17, "percent": 43, "full": false }
```

### `POST /api/waitlist`

**Étape 1 — email :**

```json
{ "email": "prenom@entreprise.fr", "step": "email", "source": "hero" }
```

Réponse : `{ "ok": true, "rank": 14, "stats": { ... } }`

**Étape 2 — profil (optionnelle, complète l'inscription) :**

```json
{
  "email": "prenom@entreprise.fr",
  "step": "profile",
  "metier": "Gros œuvre",
  "volume": "4 à 10",
  "plans": "PDF d'exécution côtés"
}
```

## Notes

- Le compteur de places (« 13/30 ») part d'une base de 13 places déjà réservées (reprise de
  la maquette d'origine) à laquelle s'ajoutent les vraies inscriptions stockées en base.
- Chaque inscription email est unique (contrainte SQL) : une même adresse renvoie toujours le
  même rang si elle est soumise plusieurs fois.
- Pour la prod, il suffit de remplacer `better-sqlite3` par la base de votre choix (Postgres,
  Supabase, etc.) dans `src/lib/db.ts` et `src/lib/waitlist.ts` — le reste de l'app n'a pas à changer.
