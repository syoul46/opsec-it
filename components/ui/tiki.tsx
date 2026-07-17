// Généré par scripts/gen-tiki-icons.py depuis le pack opsec-assets.
//
// Le pack source vit dans docs-syoul/, qui n'est pas versionné : ce fichier est
// donc la seule copie des glyphes dans le dépôt. Le retoucher à la main est
// légitime, mais une régénération écraserait la retouche — reporter alors le
// changement dans le script, ou renoncer à régénérer.
//
// Le disque de fond et la vague décorative du pack sont retirés (illisibles
// sous 20px), et les couleurs figées remplacées par currentColor pour suivre
// les thèmes du site.
//
// viewBox "10.2 9.2 43.5 43.5" : carré mesuré à l'inkscape --query-all sur l'englobant
// commun des glyphes. Les garder en 0 0 64 64 (la taille du disque supprimé)
// les rendrait deux fois trop petits dans leur pastille.

import type { ReactNode } from "react";

export type TikiIconName =
  | "security-checkup"
  | "systems-admin"
  | "tattoo-hardening"
  | "virtualization"
  | "business-continuity"
  | "maintenance-support"
  | "star-compass"
  | "tiki-eye"
  | "tiki-incident"
  | "landing-page"
  | "multipage-site"
  | "design-branding"
  | "seo-performance"
  | "redesign"
  | "linux-systems"
  | "networking-security"
  | "monitoring"
  | "containerization"
  | "niho-encryption"
  | "certification"
  | "data-protection"
  | "tiki-guardian";

const GLYPHS: Record<TikiIconName, ReactNode> = {
  "security-checkup": (
    <>
      <path d="M32 14 L46 20 V31 C46 41 40 47 32 50 C24 47 18 41 18 31 V20 Z" /><path d="M26 32 L30 37 L39 26" />
    </>
  ),
  "systems-admin": (
    <>
      <rect x="19" y="17" width="26" height="9" rx="2" /><circle cx="25" cy="21.5" r="1.4" fill="currentColor" /><rect x="19" y="28" width="26" height="9" rx="2" /><circle cx="25" cy="32.5" r="1.4" fill="currentColor" /><rect x="19" y="39" width="26" height="9" rx="2" /><circle cx="25" cy="43.5" r="1.4" fill="currentColor" />
    </>
  ),
  "tattoo-hardening": (
    <>
      <path d="M32 14 L46 20 V32 C46 42 40 48 32 50 C24 48 18 42 18 32 V20 Z" /><path d="M24 27 L32 31 L40 27 M24 33 L32 37 L40 33 M24 39 L32 43 L40 39" />
    </>
  ),
  "virtualization": (
    <>
      <ellipse cx="32" cy="22" rx="14" ry="5" /><ellipse cx="32" cy="32" rx="14" ry="5" /><ellipse cx="32" cy="42" rx="14" ry="5" />
    </>
  ),
  "business-continuity": (
    <>
      <path d="M42 22 A14 14 0 1 1 22 20" /><path d="M42 22 L42 15 M42 22 L35 22" /><path d="M22 20 L22 27 M22 20 L29 20" />
    </>
  ),
  "maintenance-support": (
    <>
      <rect x="16" y="26" width="32" height="18" rx="3" /><path d="M24 26 V20 A8 8 0 0 1 40 20 V26" /><path d="M16 33 H48" />
    </>
  ),
  "star-compass": (
    <>
      <circle cx="32" cy="32" r="14" /><path d="M32 18 L35 29 L46 32 L35 35 L32 46 L29 35 L18 32 L29 29 Z" />
    </>
  ),
  "tiki-eye": (
    <>
      <path d="M18 32 Q32 20 46 32 Q32 44 18 32 Z" /><circle cx="32" cy="32" r="5" /><circle cx="32" cy="32" r="1.6" fill="currentColor" stroke="none" /><circle cx="32" cy="21" r="1.4" fill="currentColor" stroke="none" /><circle cx="32" cy="43" r="1.4" fill="currentColor" stroke="none" />
    </>
  ),
  "tiki-incident": (
    <>
      <path d="M32 15 C36 21 41 24 38 33 C43 31 43 26 41 24 C47 31 44 45 32 47 C21 45 19 34 26 27 C26 31 28 33 30 33 C25 27 30 20 32 15 Z" />
    </>
  ),
  "landing-page": (
    <>
      <rect x="14" y="17" width="36" height="30" rx="3" /><path d="M14 25 H50" /><circle cx="19" cy="21" r="1.2" fill="currentColor" /><circle cx="23" cy="21" r="1.2" fill="currentColor" />
    </>
  ),
  "multipage-site": (
    <>
      <rect x="24" y="14" width="22" height="26" rx="2" /><rect x="20" y="19" width="22" height="26" rx="2" fill="none" /><rect x="16" y="24" width="22" height="26" rx="2" fill="none" />
    </>
  ),
  "design-branding": (
    <>
      <path d="M18 46 L38 26 L44 20 L46 22 L40 28 L20 48 Z" /><path d="M38 26 L44 32" /><circle cx="46" cy="18" r="2.4" fill="currentColor" />
    </>
  ),
  "seo-performance": (
    <>
      <circle cx="27" cy="27" r="9" /><path d="M34 34 L43 43" /><path d="M31 21 L26 30 L30 30 L27 37" />
    </>
  ),
  "redesign": (
    <>
      <path d="M22 42 A5 5 0 1 0 22 32" /><path d="M42 22 A5 5 0 1 1 42 32" /><path d="M25 39 L39 25" />
    </>
  ),
  "linux-systems": (
    <>
      <rect x="16" y="16" width="32" height="28" rx="3" /><path d="M22 25 L28 31 L22 37" /><path d="M32 37 L41 37" />
    </>
  ),
  "networking-security": (
    <>
      <path d="M32 15 L44 20 V30 C44 39 39 44 32 47 C25 44 20 39 20 30 V20 Z" /><circle cx="26" cy="27" r="2" /><circle cx="38" cy="27" r="2" /><circle cx="32" cy="37" r="2" /><path d="M26 27 L32 37 M38 27 L32 37 M26 27 L38 27" />
    </>
  ),
  "monitoring": (
    <>
      <rect x="15" y="20" width="34" height="24" rx="3" /><polyline points="20,32 26,32 29,25 34,39 38,32 44,32" />
    </>
  ),
  "containerization": (
    <>
      <rect x="17" y="27" width="15" height="15" rx="2" /><rect x="32" y="27" width="15" height="15" rx="2" /><path d="M20 27 L20 22 L44 22 L44 27" />
    </>
  ),
  "niho-encryption": (
    <>
      <rect x="22" y="30" width="20" height="16" rx="3" /><path d="M26 30 V25 A6 6 0 0 1 38 25 V30" /><polyline points="26,35 29,40 32,35 35,40 38,35" />
    </>
  ),
  "certification": (
    <>
      <circle cx="32" cy="24" r="10" /><path d="M27 24 L31 28 L38 20" /><path d="M25 33 L21 48 L32 42 L43 48 L39 33" />
    </>
  ),
  "data-protection": (
    <>
      <path d="M20 30 A12 12 0 0 1 44 30" /><path d="M23 33 A9 9 0 0 1 41 33" /><path d="M26 36 A6 6 0 0 1 38 36" /><circle cx="32" cy="41" r="2" />
    </>
  ),
  "tiki-guardian": (
    <>
      <path d="M32 14 L46 20 V32 C46 42 40 48 32 50 C24 48 18 42 18 32 V20 Z" /><path d="M25 27 L28 25 M39 27 L36 25" /><circle cx="28" cy="30" r="2" fill="currentColor" stroke="none" /><circle cx="36" cy="30" r="2" fill="currentColor" stroke="none" /><polyline points="27,38 30,42 33,38 36,42 39,38" />
    </>
  ),
};

export function TikiIcon({ name, className }: { name: TikiIconName; className?: string }) {
  return (
    <svg
      viewBox="10.2 9.2 43.5 43.5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {GLYPHS[name]}
    </svg>
  );
}

export function TileSecurity({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 240" fill="none" stroke="currentColor" strokeWidth={3}
      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      <path d="M110 22 L182 48 V126 C182 176 154 208 110 226 C66 208 38 176 38 126 V48 Z" />
      <path d="M56 80 L63.7 71 L71.4 80 L79.10000000000001 71 L86.80000000000001 80 L94.50000000000001 71 L102.20000000000002 80 L109.90000000000002 71 L117.60000000000002 80 L125.30000000000003 71 L133.00000000000003 80 L140.70000000000002 71 L148.40000000000003 80 L156.10000000000002 71 L163.80000000000004 80 L171.50000000000003 71 L179.20000000000005 80" />
      <path d="M64 128 Q110 104 156 128 Q110 152 64 128 Z" />
      <circle cx="110" cy="128" r="12" /><circle cx="110" cy="128" r="4" />
      <path d="M56 172 L63.7 163 L71.4 172 L79.10000000000001 163 L86.80000000000001 172 L94.50000000000001 163 L102.20000000000002 172 L109.90000000000002 163 L117.60000000000002 172 L125.30000000000003 163 L133.00000000000003 172 L140.70000000000002 163 L148.40000000000003 172 L156.10000000000002 163 L163.80000000000004 172 L171.50000000000003 163 L179.20000000000005 172" />
      <path d="M74 150 m0 -9 a9 9 0 1 1 -6.3 2.6999999999999997 a4.95 4.95 0 1 0 3.6 -1.8" /> <path d="M146 150 m0 -9 a9 9 0 1 1 -6.3 2.6999999999999997 a4.95 4.95 0 1 0 3.6 -1.8" />
    </svg>
  );
}
