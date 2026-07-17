#!/usr/bin/env python3
"""Régénère components/ui/tiki.tsx depuis le pack d'illustrations opsec-assets.

    python3 scripts/gen-tiki-icons.py > components/ui/tiki.tsx

⚠ Le pack source est dans docs-syoul/, qui n'est PAS versionné (.gitignore). Ce script
ne tourne donc que sur une machine qui a le pack en local. Sans lui, components/ui/tiki.tsx
est la seule copie des glyphes : le modifier à la main est alors légitime, mais il faut
savoir que la prochaine régénération écraserait ces retouches. Ce script est versionné
pour documenter la provenance des glyphes, pas parce qu'il tourne en CI.

Ce qu'il fait : les 40 icônes du pack partagent un squelette strictement identique,
vérifié avant écriture :
  <circle r="30" fill="#132743">   -> disque de fond, retiré
  <path ... opacity="0.35">        -> vague décorative, retirée (illisible sous 20px)
  <g fill="none" stroke="#ef7f2f"> -> le glyphe, seul conservé
Les couleurs figées deviennent currentColor pour suivre les thèmes du site.

Dépendance : inkscape, pour mesurer l'englobant des glyphes (cf. common_viewbox).
"""
import re, sys, pathlib

SRC = pathlib.Path("/home/syoul/opsec-it/docs-syoul/assets/opsec-assets")
STROKE_COLORS = ["#ef7f2f", "#2ecfa5"]
DARK_FILLS = ["#0d1b2e", "#132743"]

ATTR_MAP = {
    "stroke-width": "strokeWidth", "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin", "fill-rule": "fillRule",
    "clip-rule": "clipRule", "stroke-dasharray": "strokeDasharray",
    "stroke-opacity": "strokeOpacity", "fill-opacity": "fillOpacity",
}


def to_jsx(frag: str) -> str:
    for a, b in ATTR_MAP.items():
        frag = frag.replace(f"{a}=", f"{b}=")
    for c in STROKE_COLORS:
        frag = frag.replace(c, "currentColor")
    # Les aplats sombres servaient à trouer le disque : sans disque, ils n'ont plus
    # d'objet et masqueraient le glyphe. On les rend transparents.
    for c in DARK_FILLS:
        frag = frag.replace(f'fill="{c}"', 'fill="none"')
    frag = re.sub(r"<(\w+)([^>]*?)></\1>", r"<\1\2 />", frag)
    frag = re.sub(r"<(\w+)([^>]*[^/])>", r"<\1\2 />", frag)
    return frag.strip()


def extract_icon(name: str) -> str:
    raw = (SRC / "icons" / f"{name}.svg").read_text()
    m = re.search(r"<g\b[^>]*>(.*?)</g>", raw, re.S)
    if not m:
        sys.exit(f"ERREUR {name}: pas de <g> glyphe")
    inner = m.group(1)
    if "#132743" in inner:
        print(f"  ! {name}: le disque semble dans le <g>, à vérifier", file=sys.stderr)
    return to_jsx(inner)


def extract_art(folder: str, name: str):
    raw = (SRC / folder / f"{name}.svg").read_text()
    vb = re.search(r'viewBox="([^"]+)"', raw).group(1)
    body = re.sub(r"<svg[^>]*>", "", raw)
    body = body.replace("</svg>", "")
    return vb, to_jsx(body)


ICONS = [
    # Services
    "security-checkup", "systems-admin", "tattoo-hardening",
    "virtualization", "business-continuity", "maintenance-support",
    # Méthodologie
    "star-compass", "tiki-eye", "tiki-incident",
    # Création web
    "landing-page", "multipage-site", "design-branding", "seo-performance", "redesign",
    # Parcours
    "linux-systems", "networking-security", "monitoring", "containerization",
    "niho-encryption", "certification",
    # data-protection (pictogramme wifi) gardé en réserve : About utilise
    # niho-encryption (cadenas niho) pour « Protection des données », plus juste.
    "data-protection",
    # Marque (navbar, footer)
    "tiki-guardian",
]
ART = [("illustrations-bd", "tile-security")]


def common_viewbox(names: list[str]) -> str:
    """viewBox carré couvrant tous les glyphes, mesuré et non deviné.

    Les glyphes étaient dessinés au centre d'un disque de fond, retiré ici : garder
    0 0 64 64 laisserait ~50% de vide autour et rendrait les icônes deux fois trop
    petites dans leur pastille. Un viewBox commun (et non un par glyphe) est
    indispensable pour qu'elles restent optiquement de la même taille entre elles.
    """
    import subprocess, tempfile
    x0 = y0 = 1e9
    x1 = y1 = -1e9
    with tempfile.TemporaryDirectory() as td:
        for n in names:
            raw = (SRC / "icons" / f"{n}.svg").read_text()
            g = re.search(r"<g\b[^>]*>.*?</g>", raw, re.S).group(0)
            p = pathlib.Path(td) / f"{n}.svg"
            p.write_text(f'<svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">{g}</svg>')
            out = subprocess.run(["inkscape", "--query-all", str(p)],
                                 capture_output=True, text=True).stdout
            for line in out.strip().splitlines():
                f = line.split(",")
                if len(f) == 5 and f[0].startswith("g"):
                    x, y, w, h = map(float, f[1:])
                    x0, y0 = min(x0, x), min(y0, y)
                    x1, y1 = max(x1, x + w), max(y1, y + h)
                    break
    # Carré centré sur l'englobant commun, avec 1.5u de marge pour que le trait
    # (2.5u de large, débordant de 1.25u) ne soit pas rogné au bord.
    cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
    side = max(x1 - x0, y1 - y0) + 3
    print(f"  englobant commun x {x0:.2f}..{x1:.2f} y {y0:.2f}..{y1:.2f} -> côté {side:.1f}",
          file=sys.stderr)
    return f"{cx - side / 2:.1f} {cy - side / 2:.1f} {side:.1f} {side:.1f}"

VIEWBOX = common_viewbox(ICONS)

out = ['// Généré par scripts/gen-tiki-icons.py depuis le pack opsec-assets.',
       '//',
       '// Le pack source vit dans docs-syoul/, qui n\'est pas versionné : ce fichier est',
       '// donc la seule copie des glyphes dans le dépôt. Le retoucher à la main est',
       '// légitime, mais une régénération écraserait la retouche — reporter alors le',
       '// changement dans le script, ou renoncer à régénérer.',
       '//',
       '// Le disque de fond et la vague décorative du pack sont retirés (illisibles',
       '// sous 20px), et les couleurs figées remplacées par currentColor pour suivre',
       '// les thèmes du site.',
       '//',
       f'// viewBox "{VIEWBOX}" : carré mesuré à l\'inkscape --query-all sur l\'englobant',
       '// commun des glyphes. Les garder en 0 0 64 64 (la taille du disque supprimé)',
       '// les rendrait deux fois trop petits dans leur pastille.',
       '', 'import type { ReactNode } from "react";', '',
       'export type TikiIconName =']
out += [f'  | "{n}"' for n in ICONS]
out[-1] += ";"
out += ["", "const GLYPHS: Record<TikiIconName, ReactNode> = {"]
for n in ICONS:
    out.append(f'  "{n}": (')
    out.append("    <>")
    for line in extract_icon(n).splitlines():
        out.append("      " + line.strip())
    out.append("    </>")
    out.append("  ),")
out.append("};")
out += ["", """
export function TikiIcon({ name, className }: { name: TikiIconName; className?: string }) {
  return (
    <svg
      viewBox="__VIEWBOX__"
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
""".strip()]

for folder, name in ART:
    vb, body = extract_art(folder, name)
    comp = "".join(p.capitalize() for p in name.replace("-", " ").split())
    out += ["", f'export function {comp}({{ className }}: {{ className?: string }}) {{', "  return (",
            f'    <svg viewBox="{vb}" fill="none" stroke="currentColor" strokeWidth={{3}}',
            '      strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">']
    for line in body.splitlines():
        if line.strip():
            out.append("      " + line.strip())
    out += ["    </svg>", "  );", "}"]

print("\n".join(out).replace("__VIEWBOX__", VIEWBOX))
