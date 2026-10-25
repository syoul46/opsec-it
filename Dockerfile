# Image de base epinglee par digest, et non sur le tag flottant `node:22-alpine`.
#
# Deux raisons. D'abord la release de securite Node du 21 octobre 2026 (10 CVE sur
# la ligne 22.x, dont CVE-2026-111497, ecriture hors bornes dans le decodeur Brotli
# de node:zlib) : la correction est 22.23.4, et l'image construite en aout tournait
# encore sur un 22.x anterieur. Ensuite la reproductibilite — avec un tag flottant,
# deux `docker compose up --build` a deux semaines d'ecart produisent deux runtimes
# differents sans que rien dans le depot ne change.
#
# Le digest est celui de la MANIFEST LIST, pas de l'image amd64 : epingler le digest
# d'une seule architecture casserait un build ailleurs que sur x86.
#
# Pour monter de version : relever le nouveau digest puis remplacer les trois stages
# d'un coup (ils doivent rester identiques, sinon le build et le runtime divergent).
#   curl -s https://hub.docker.com/v2/repositories/library/node/tags/<version>-alpine \
#     | python3 -c 'import sys,json; print(json.load(sys.stdin)["digest"])'

# ─── Stage 1: deps ───────────────────────────────────────────────────────────
FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

# ─── Stage 2: builder ─────────────────────────────────────────────────────────
FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ─── Stage 3: runner (minimal) ────────────────────────────────────────────────
FROM node:22.23.4-alpine@sha256:fe4f6d74e20370acb04ad889077d14d0f64a9c8ea6a42bc60cddf1e844699914 AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
