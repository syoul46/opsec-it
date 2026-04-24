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

Sans clé, le formulaire loggue simplement les soumissions en console (mode dev).

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

Build production :

```bash
npm run build
npm start
```

Ou via Docker (`docker-compose.prod.yml`).

## Contact

<contact@opsec-it.fr>
