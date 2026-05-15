import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Wrappers locale-aware autour des helpers de Next.js
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
