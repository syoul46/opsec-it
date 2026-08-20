import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { routing, type AppLocale } from "@/i18n/routing";
import { REPO_URL, LICENSE_URL } from "@/lib/site";

const BASE_URL = "https://opsec-it.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "legal.mentions" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${BASE_URL}/${locale}/mentions-legales` },
    robots: { index: true, follow: true },
  };
}

export default async function MentionsLegales({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations({ locale, namespace: "legal.mentions" });

  const SecTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-ink mb-3">{children}</h2>
  );

  const editorItems = t.raw("sections.editor.items") as string[];

  return (
    <>
      <Navbar />
      <div className="h-20" aria-hidden="true" />
      <main id="contenu" className="bg-surf pt-20 pb-28">
        <div className="wrap max-w-3xl">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
            {t("kicker")}
          </span>
          <h1 className="text-3xl md:text-4xl font-black text-ink mb-10 leading-tight">
            {t("title")}
          </h1>

          <div className="space-y-10 text-ink-soft leading-relaxed">
            <section>
              <SecTitle>{t("sections.editor.title")}</SecTitle>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sections.editor.intro") as string }} />
              <ul className="mt-3 space-y-1">
                {editorItems.map((html, i) => (
                  <li key={i}
                      dangerouslySetInnerHTML={{
                        __html: html.replace(
                          /<a>([^<]+)<\/a>/g,
                          '<a href="mailto:contact@opsec-it.fr" class="text-blue hover:underline">$1</a>',
                        ),
                      }} />
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-dim">{t("sections.editor.note")}</p>
            </section>

            <section>
              <SecTitle>{t("sections.director.title")}</SecTitle>
              <p>{t("sections.director.body")}</p>
            </section>

            <section>
              <SecTitle>{t("sections.hosting.title")}</SecTitle>
              <p dangerouslySetInnerHTML={{
                __html: (t.raw("sections.hosting.body") as string).replace(
                  /<a>([^<]+)<\/a>/g,
                  '<a href="mailto:contact@opsec-it.fr" class="text-blue hover:underline">$1</a>',
                ),
              }} />
            </section>

            <section>
              <SecTitle>{t("sections.ip.title")}</SecTitle>
              <p>{t("sections.ip.p1")}</p>
              {/* Le code source est sous AGPL-3.0 et le reste tous droits réservés :
                  affirmer les deux dans un seul paragraphe rendait la page fausse
                  dès la publication du dépôt. */}
              <p className="mt-3">
                {t.rich("sections.ip.p2", {
                  repo: (chunks) => (
                    <a href={REPO_URL} target="_blank" rel="noopener noreferrer"
                       className="text-blue hover:underline">{chunks}</a>
                  ),
                  licence: (chunks) => (
                    <a href={LICENSE_URL} target="_blank" rel="noopener noreferrer"
                       className="text-blue hover:underline">{chunks}</a>
                  ),
                })}
              </p>
              <p className="mt-3">{t("sections.ip.p3")}</p>
            </section>

            <section>
              <SecTitle>{t("sections.liability.title")}</SecTitle>
              <p>{t("sections.liability.p1")}</p>
              <p className="mt-3">{t("sections.liability.p2")}</p>
            </section>

            <section>
              <SecTitle>{t("sections.personal.title")}</SecTitle>
              <p dangerouslySetInnerHTML={{
                __html: (t.raw("sections.personal.body") as string).replace(
                  /<a>([^<]+)<\/a>/g,
                  `<a href="/${locale}/politique-confidentialite" class="text-blue hover:underline">$1</a>`,
                ),
              }} />
            </section>

            <section>
              <SecTitle>{t("sections.law.title")}</SecTitle>
              <p>{t("sections.law.body")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
