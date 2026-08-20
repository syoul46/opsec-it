import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// En-têtes de sécurité applicatifs.
//
// Ils vivent ICI et non dans deploy/opsec-it.caddy pour une raison pratique :
// ce fichier part avec l'image au premier `docker compose up --build`, alors que
// le vhost Caddy demande une copie manuelle dans /etc/caddy/conf.d/. Caddy garde
// donc uniquement ce qui relève du terminateur TLS (HSTS) et de ce que Next ne
// peut pas faire (suppression de l'en-tête Server).
// Ne pas dupliquer une clé des deux côtés : Caddy écraserait silencieusement.
//
// CSP : 'unsafe-inline' sur script-src est imposé par Next, qui injecte le
// payload RSC et le bootstrap de l'hydratation en scripts inline. Passer aux
// nonces demanderait un rendu dynamique de toutes les pages — exactement ce
// qu'on vient de corriger. 'unsafe-inline' sur style-src est imposé par les
// styles inline de next/image (position/width/height sur les images `fill`).
const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const PERMISSIONS_POLICY = [
  "accelerometer=()",
  "camera=()",
  "geolocation=()",
  "gyroscope=()",
  "magnetometer=()",
  "microphone=()",
  "payment=()",
  "usb=()",
].join(", ");

const nextConfig: NextConfig = {
  output: "standalone",

  // `x-powered-by: Next.js` annonçait la stack et sa famille de versions sur
  // chaque réponse. Gratuit à retirer, et gênant sur un site qui vend du
  // durcissement.
  poweredByHeader: false,

  // Caddy compresse déjà (cf. deploy/opsec-it.caddy). Laisser Next gzipper en
  // amont fige l'encodage en gzip et empêche Caddy de négocier zstd.
  compress: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "Permissions-Policy", value: PERMISSIONS_POLICY },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
