// Liste des thèmes disponibles — source de vérité unique.
// Pour ajouter un thème : créer le bloc CSS dans `app/theme.css`
// puis l'ajouter ici. Le ThemeProvider et un éventuel sélecteur
// récupèrent dynamiquement cette liste.

export const THEMES = [
  { id: "polynesian-dark", label: "Polynesian Dark" },
  { id: "sand-light",      label: "Sand Light"      },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"];

export const DEFAULT_THEME: ThemeId = "polynesian-dark";

export const THEME_STORAGE_KEY = "opsec-it.theme";
