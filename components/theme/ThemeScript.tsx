// Charge `public/theme-init.js` AVANT le rendu pour appliquer le thème
// stocké et éviter le flash. Le `<script src>` synchrone (sans defer/async)
// dans <head> bloque le parsing — exactement ce qu'on veut ici.
//
// Important : les constantes DEFAULT_THEME et THEME_STORAGE_KEY sont
// dupliquées dans `public/theme-init.js`. Si elles changent, modifier
// les deux fichiers.
export default function ThemeScript() {
  return <script src="/theme-init.js" />;
}
