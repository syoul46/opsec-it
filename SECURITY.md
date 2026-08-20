# Politique de signalement

Ce dépôt porte le code d'**opsec-it.fr**, un site vitrine sans compte utilisateur,
sans base de données et sans donnée client stockée. La surface est donc étroite —
mais elle n'est pas nulle, et je préfère recevoir un signalement qu'une surprise.

## Comment signaler

Écrivez à **contact@opsec-it.fr**. Indiquez ce que vous avez trouvé, comment le
reproduire, et ce que vous en tirez concrètement. Je réponds sous **72 h ouvrées**
et je vous dis franchement ce que je compte faire, y compris « rien, et voici
pourquoi ».

Si vous préférez un canal chiffré, dites-le dans un premier message : je vous
enverrai de quoi poursuivre.

Merci de **ne pas ouvrir d'issue publique** pour une faille exploitable tant qu'un
correctif n'est pas en ligne.

## Ce qui m'intéresse

- Exécution de code, injection, contournement de la limite de débit du formulaire
  de contact (`app/api/contact/route.ts`)
- Défaut de configuration exposant des données : en-têtes (`next.config.ts`),
  vhost Caddy (`deploy/opsec-it.caddy`), conteneur (`deploy/docker-compose.yml`)
- Secret laissé dans le dépôt ou dans l'historique — c'est vérifié, mais une paire
  d'yeux de plus ne fait pas de mal
- Fuite de données personnelles au regard du RGPD

## Ce qui ne m'intéresse pas

- Les rapports de scanner sans preuve d'exploitabilité
- L'absence d'en-têtes qui ne s'appliquent pas à un site statique sans session
  (pas de cookie d'authentification ici, donc pas de `Secure`/`SameSite` à auditer)
- `'unsafe-inline'` dans la CSP : c'est une contrainte de Next.js, assumée et
  documentée dans `next.config.ts`
- Le déni de service par volume

## Portée

Uniquement **opsec-it.fr** et ce dépôt. Les sites de mes clients ne sont pas
couverts : leurs propriétaires sont les seuls à pouvoir autoriser un test.

Pas de programme de récompense — je suis un artisan, pas une plateforme. En
revanche, tout signalement utile est crédité ici si son auteur le souhaite.
