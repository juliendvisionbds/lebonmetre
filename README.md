# Le Bon Métré — page de pré-lancement

Landing page de pré-lancement pour Le Bon Métré, construite avec Next.js (App Router,
TypeScript) et une vraie API route pour gérer l'inscription à l'alpha.

## Stack

- **Next.js 16** (App Router, Turbopack) + **TypeScript**
- **Supabase (Postgres)** pour la persistance de la liste d'attente (fonctionne en serverless sur Vercel)
- **Resend** pour les emails transactionnels (confirmation inscrit + notifications internes)
- Polices **Sora / Inter / IBM Plex Mono** via `next/font/google`
- CSS "vanilla" (pas de framework) — reprend fidèlement le design fourni (identité "jeu de plans")

## Démarrer en local

```bash
npm install
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000).

### Configuration requise (`.env.local`)

Copiez `.env.local.example` vers `.env.local` et renseignez :

```bash
RESEND_API_KEY=            # https://resend.com/api-keys
SUPABASE_URL=               # Project Settings > API
SUPABASE_SERVICE_ROLE_KEY=  # Project Settings > API (clé privée, jamais exposée au client)
```

### Créer la table Supabase

Dans l'éditeur SQL de votre projet Supabase (Dashboard > SQL Editor), exécutez :

```sql
create table if not exists waitlist_entries (
  id bigint generated always as identity primary key,
  email text not null unique,
  source text,
  metier text,
  volume text,
  plans text,
  profile_completed_at timestamptz,
  created_at timestamptz not null default now()
);
```

La clé `service_role` utilisée côté serveur contourne le Row Level Security (RLS) : pas besoin
d'activer de policy pour que l'API fonctionne, mais gardez cette clé strictement privée
(jamais de préfixe `NEXT_PUBLIC_`, jamais commit).

## Déploiement (Vercel)

Sur Vercel, ajoutez les mêmes variables d'environnement (`Project > Settings > Environment
Variables`) : `RESEND_API_KEY`, `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`.

> Le système de fichiers des fonctions serverless de Vercel est en lecture seule : toute
> persistance doit passer par un service externe (ici Supabase), jamais par un fichier local.

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
    db.ts        # Client Supabase (singleton, clé service_role)
    waitlist.ts  # Logique métier : validation email, calcul de rang, stats de places
    email.ts     # Emails transactionnels via Resend
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

Déclenche l'envoi de deux emails (best-effort, n'échoue jamais la requête) :
- confirmation à l'inscrit (récap + rang)
- notification interne à `juliend@visionbds.com`

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

Déclenche une notification interne enrichie (métier, volume, format de plans).

## Notes

- Le compteur de places (« 13/30 ») part d'une base de 13 places déjà réservées (reprise de
  la maquette d'origine) à laquelle s'ajoutent les vraies inscriptions stockées en base.
- Chaque inscription email est unique (contrainte SQL) : une même adresse renvoie toujours le
  même rang si elle est soumise plusieurs fois.
