# opsec-it.fr

Site vitrine de Sylvestre MIGNOT — **OPSEC-IT**.
Sécurité, administration d'infrastructures et création web pour associations et PME.

## Stack

- Next.js 16 (App Router) — React 19
- TypeScript 5
- Tailwind CSS 4
- react-hook-form + zod (formulaire contact)
- Resend (envoi email du formulaire)

## Développement

```bash
npm install
npm run dev
```

Le site est accessible sur [http://localhost:3000](http://localhost:3000).

## Variables d'environnement

| Variable         | Rôle                                           | Obligatoire      |
|------------------|------------------------------------------------|------------------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des emails contact | Oui en production |

Sans clé, le formulaire écrit la soumission dans les logs **et répond quand même
« message envoyé » au visiteur** (`app/api/contact/route.ts`). Acceptable en dev,
silencieux et coûteux en prod : les messages sont dans `docker compose logs`, pas
dans la boîte mail. La variable est lue au runtime — la renseigner dans
`deploy/.env` puis `docker compose -f deploy/docker-compose.yml up -d` suffit,
sans rebuild.

## Structure

```
app/
  api/contact          — endpoint POST avec anti-spam (honeypot + rate-limit)
  api/health           — ping /api/health → { ok: true }
  mentions-legales     — page légale
  politique-confidentialite — RGPD
  layout.tsx           — metadata + JSON-LD + police Inter (next/font)
  page.tsx             — landing one-page
components/
  layout/              — Navbar, Footer
  sections/            — Hero, Services, CreationWeb, About, Methodology, Contact
  ui/                  — ServiceCard, SectionWrapper, Badge, TerminalLine
```

## Déploiement

Le site tourne sur le **CX23 Hetzner** (`5.75.151.116`, Nuremberg), en cohabitation
avec `maeva-runner`. Caddy assure la terminaison TLS et le certificat Let's Encrypt ;
le conteneur n'écoute que sur `127.0.0.1:3000` et n'est jamais exposé directement.

Redéployer (le serveur suit `main`) :

```bash
ssh root@5.75.151.116
cd /opt/opsec-it && git pull && docker compose -f deploy/docker-compose.yml up -d --build
```

Tout est dans `deploy/` : `docker-compose.yml` (le conteneur), `opsec-it.caddy` (le
vhost, à installer dans `/etc/caddy/conf.d/`) et `.env` (non commité, `RESEND_API_KEY`).

En local, `npm run dev` suffit ; pour tester l'image telle qu'elle tourne en prod :

```bash
docker compose -f deploy/docker-compose.yml up --build
```

## Contact

<contact@opsec-it.fr>
