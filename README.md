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

| Variable         | Rôle                                                    | Obligatoire       |
|------------------|---------------------------------------------------------|-------------------|
| `RESEND_API_KEY` | Clé API Resend pour l'envoi des emails contact           | Oui en production |
| `CONTACT_TO`     | Destinataire des messages du formulaire                  | Oui en production |
| `CONTACT_FROM`   | Expéditeur, sur un domaine vérifié chez Resend           | Non (voir plus bas) |

Sans `RESEND_API_KEY` **ou** sans `CONTACT_TO`, le formulaire écrit la soumission
dans les logs **et répond quand même « message envoyé » au visiteur**
(`app/api/contact/route.ts`). Acceptable en dev, silencieux et coûteux en prod :
les messages sont dans `docker compose logs`, pas dans la boîte mail.

`CONTACT_TO` n'est pas en dur dans le code parce que ce dépôt est public et que le
destinataire est une boîte personnelle. Les trois variables sont lues au runtime —
les renseigner dans `deploy/.env` puis
`docker compose -f deploy/docker-compose.yml up -d` suffit, sans rebuild.

## E-mail — passer du bac à sable à son propre domaine

Tant que `CONTACT_FROM` est vide, les messages partent de
`onboarding@resend.dev` : l'expéditeur bac à sable de Resend, qui **ne sait livrer
qu'au titulaire du compte** et atterrit très souvent en indésirables. Pour envoyer
depuis `contact@opsec-it.fr`, dans cet ordre — l'inverse casse les envois :

1. **Resend** → *Domains* → ajouter `opsec-it.fr`, en choisissant la région
   **eu-west-1 (Irlande)**. La région se fige à la création : en changer impose de
   supprimer le domaine, le recréer et refaire tout le DNS, nouvelle clé DKIM
   comprise. Hors EEE, il faudrait en plus déclarer le transfert et sa base
   juridique dans la politique de confidentialité (RGPD art. 13-1-f).

2. Resend génère **trois enregistrements** — une clé DKIM sur le domaine racine,
   et deux CNAME d'infrastructure. Ce n'est plus un MX et un TXT posés à la main
   sur `send`, comme dans l'ancien schéma :

   | Type  | Nom                 | Valeur                                   |
   |-------|---------------------|------------------------------------------|
   | TXT   | `resend._domainkey` | `p=…` (clé générée, propre au domaine)   |
   | CNAME | `send`              | `send.forge.rmta.net.`                   |
   | CNAME | `rsend`             | `rsend-euw1.forge.rmta.net.`             |

   `send` porte le Return-Path (MTA propre à Resend), `rsend` le chemin SES
   régional — c'est lui qui mène à `feedback-smtp.eu-west-1.amazonses.com`.

3. **Publier ces trois enregistrements** dans la zone DNS (Hetzner,
   `ns1.your-server.de`, syntaxe BIND). Deux pièges :
   - **les points finaux sur les cibles CNAME sont obligatoires**, sinon Hetzner
     résout `send.forge.rmta.net.opsec-it.fr.` ;
   - la valeur DKIM ne doit contenir **ni espace ni retour à la ligne** — le
     dashboard la replie à l'affichage. Elle fait 218 caractères, donc elle tient
     dans une seule chaîne TXT (pas de découpage à 255).

   Le SPF de la racine — `v=spf1 mx ~all` — **n'est pas à toucher ici** : Resend
   signe l'enveloppe depuis `send.opsec-it.fr`, et le DMARC du domaine étant en
   alignement relâché (`aspf=r`, `adkim=r`), le sous-domaine s'aligne tout seul.
   Ne pas passer `adkim`/`aspf` en strict : ça casserait cet alignement.

4. **Attendre la vérification** côté Resend (quelques minutes à quelques heures).
5. Alors seulement, poser dans `deploy/.env` :
   `CONTACT_FROM=OPSEC-IT <contact@opsec-it.fr>` puis relancer le conteneur.
   L'expéditeur est bien sur le domaine **racine** : `send` et `rsend` ne sont que
   l'infrastructure de bounce, jamais une adresse d'envoi.

Contrôler avant et après avec `scripts/check-email-dns.sh`.

### Durcissement DMARC, une fois les envois stabilisés

Le SPF racine est en `~all` (softfail) et le DMARC en `p=none` (observation) :
aucune usurpation n'est donc réellement bloquée aujourd'hui. La montée se fait
dans cet ordre, jamais l'inverse :

1. Vérifier que la boîte Hetzner sort en `spf=pass` **et** `dkim=pass` — envoi de
   test vers une adresse Gmail, puis « Afficher l'original », en-tête
   `Authentication-Results`. C'est le cas : l'IP sortante est celle du MX, donc
   couverte par `mx`, et Hetzner signe déjà avec le sélecteur `default2607`.
2. Passer le SPF racine en `v=spf1 mx -all`.
3. Relire les rapports `rua` pour confirmer l'inventaire des expéditeurs
   légitimes — c'est l'unique source fiable, et elle est déjà alimentée.
4. `p=quarantine; sp=quarantine; pct=25` → `pct=100` → `p=reject; sp=reject`, une
   marche toutes les une à deux semaines. Ne pas oublier `sp=` : sans lui, les
   sous-domaines restent usurpables quand la racine est verrouillée.

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
