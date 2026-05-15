// Next.js 16 — fichier `proxy.ts` (anciennement `middleware.ts`).
// next-intl 4.x expose toujours `next-intl/middleware`, mais la
// fonction renvoyée est une middleware standard `(req) => res`,
// compatible avec la convention `proxy` de Next 16.
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Skip Next internals, API routes, et tous les assets statiques
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
