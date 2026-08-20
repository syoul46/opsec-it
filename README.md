# opsec-it.fr

Site vitrine de Sylvestre MIGNOT — **OPSEC-IT**.
Sécurité, administration d'infrastructures et création web pour associations et PME.

**Le code de ce site est public, sous licence AGPL-3.0.** C'est cohérent avec ce que
je vends : un site livré à un client lui appartient, s'héberge où il veut et se
reprend par n'importe quel prestataire. Un consultant qui parle d'auditabilité et
garde son propre code fermé demande qu'on le croie sur parole — celui-ci est
lisible, y compris ses défauts.

Ce dépôt sert aussi de référence de ce que je livre : Docker non-root, en-têtes de
sécurité, RGPD sans traceur, bilingue, sans dépendance à un service tiers.

## Stack

- Next.js 16 (App Router) — React 19
- TypeScript 5
- Tailwind CSS 4
- next-intl (FR/EN)
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
  [locale]/            — toutes les pages du site vivent sous ce segment
    layout.tsx         — metadata + JSON-LD + police Inter (next/font)
    page.tsx           — landing one-page
    opengraph-image.tsx — carte de partage social, générée par locale
    mentions-legales/  — page légale
    politique-confidentialite/ — RGPD
  robots.ts sitemap.ts manifest.ts
components/
  layout/              — Navbar, Footer, SkipLink
  sections/            — Hero, Services, CreationWeb, About, Methodology, Contact
  theme/               — thèmes (polynesian-dark par défaut), anti-flash
  ui/                  — ServiceCard, SectionWrapper, Badge, TerminalLine, tiki, Watermark
i18n/                  — routing, navigation et chargement des messages
messages/              — fr.json, en.json (tout le contenu éditorial du site)
```

Tout le texte visible est dans `messages/` : une correction de contenu ne touche
jamais un composant.

## Sécurité

- En-têtes applicatifs (CSP, Permissions-Policy, X-Frame-Options, nosniff,
  Referrer-Policy, COOP) : `headers()` dans `next.config.ts`. Ils partent avec
  l'image Docker, donc ils suivent le code plutôt que la configuration du serveur.
- HSTS et suppression de l'en-tête `Server` : `deploy/opsec-it.caddy`, parce que
  ce sont des politiques du terminateur TLS.
- Le conteneur tourne en utilisateur non privilégié et n'écoute que sur
  `127.0.0.1` — Caddy est le seul processus exposé.
- Aucun cookie de suivi, aucun analytics tiers, aucune requête sortante depuis les
  pages. La CSP est en `default-src 'self'` et le reste tient dedans.
- `'unsafe-inline'` sur `script-src` et `style-src` est imposé par Next (payload
  RSC inline, styles inline de `next/image`). Documenté dans `next.config.ts`.

## Déploiement

Le site tourne sur un CX23 Hetzner (Nuremberg). Caddy assure la terminaison TLS et
le certificat Let's Encrypt ; le conteneur n'écoute que sur `127.0.0.1:3000` et
n'est jamais exposé directement.

Redéployer (le serveur suit `main`) :

```bash
ssh root@<serveur>
cd /opt/opsec-it && git pull && docker compose -f deploy/docker-compose.yml up -d --build
```

Tout est dans `deploy/` : `docker-compose.yml` (le conteneur), `opsec-it.caddy` (le
vhost, à installer dans `/etc/caddy/conf.d/`) et `.env` (non commité, `RESEND_API_KEY`).

En local, `npm run dev` suffit ; pour tester l'image telle qu'elle tourne en prod :

```bash
docker compose -f deploy/docker-compose.yml up --build
```

## Licence

Le **code source** est sous [AGPL-3.0](LICENSE). Vous pouvez le lire, le reprendre
et le modifier ; si vous en exploitez une version modifiée comme service en ligne,
vous devez en publier les sources.

Ne sont **pas** couverts par cette licence et restent tous droits réservés :

- la marque **OPSEC-IT**, son logo (`public/logo.webp`) et le nom Sylvestre MIGNOT ;
- le portrait `public/sylvestre.jpg` et les images d'arrière-plan `public/bg/` ;
- les glyphes tiki de `components/ui/tiki.tsx`, dérivés d'un pack graphique privé ;
- les contenus éditoriaux de `messages/` — en particulier les témoignages clients,
  publiés avec l'accord des personnes citées et qui ne les engagent que pour ce site.

Autrement dit : reprenez le squelette, pas l'identité.

## Contact

<contact@opsec-it.fr>
