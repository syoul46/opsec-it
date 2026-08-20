import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { routing, type AppLocale } from "@/i18n/routing";

const BASE_URL = "https://opsec-it.fr";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "legal.privacy" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
    alternates: { canonical: `${BASE_URL}/${locale}/politique-confidentialite` },
    robots: { index: true, follow: true },
  };
}

export default async function PolitiqueConfidentialite({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale as AppLocale);

  const t = await getTranslations({ locale, namespace: "legal.privacy" });

  const SecTitle = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-xl font-bold text-ink mb-3">{children}</h2>
  );

  const linkifyEmail = (s: string) =>
    s.replace(/<a>([^<]+)<\/a>/g, '<a href="mailto:contact@opsec-it.fr" class="text-blue hover:underline">$1</a>');
  const linkifyResend = (s: string) =>
    s.replace(/<a>([^<]+)<\/a>/g, '<a href="https://resend.com" target="_blank" rel="noopener noreferrer" class="text-blue hover:underline">$1</a>');
  const linkifyCnil = (s: string) =>
    s.replace(/<a>([^<]+)<\/a>/g, '<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" class="text-blue hover:underline">$1</a>');

  const dataItems     = t.raw("sections.data.items") as string[];
  const purposeItems  = t.raw("sections.purpose.items") as string[];
  const retentionItems = t.raw("sections.retention.items") as string[];
  const rightsItems   = t.raw("sections.rights.items") as string[];

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
              <SecTitle>{t("sections.controller.title")}</SecTitle>
              <p>{t("sections.controller.p1")}</p>
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: linkifyEmail(t.raw("sections.controller.p2") as string) }} />
            </section>

            <section>
              <SecTitle>{t("sections.data.title")}</SecTitle>
              <p>{t("sections.data.intro")}</p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                {dataItems.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
              <p className="mt-3">{t("sections.data.note")}</p>
            </section>

            <section>
              <SecTitle>{t("sections.purpose.title")}</SecTitle>
              <p>{t("sections.purpose.intro")}</p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                {purposeItems.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: t.raw("sections.purpose.note") as string}} />
            </section>

            <section>
              <SecTitle>{t("sections.recipients.title")}</SecTitle>
              <p>{t("sections.recipients.p1")}</p>
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: linkifyResend(t.raw("sections.recipients.p2") as string) }} />
            </section>

            <section>
              <SecTitle>{t("sections.retention.title")}</SecTitle>
              <ul className="list-disc pl-6 space-y-1">
                {retentionItems.map((it, i) => <li key={i} dangerouslySetInnerHTML={{ __html: it }} />)}
              </ul>
            </section>

            <section>
              <SecTitle>{t("sections.rights.title")}</SecTitle>
              <p>{t("sections.rights.intro")}</p>
              <ul className="mt-3 list-disc pl-6 space-y-1">
                {rightsItems.map((it, i) => <li key={i}>{it}</li>)}
              </ul>
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: linkifyEmail(t.raw("sections.rights.contact") as string) }} />
              <p className="mt-3" dangerouslySetInnerHTML={{ __html: linkifyCnil(t.raw("sections.rights.cnil") as string) }} />
            </section>

            <section>
              <SecTitle>{t("sections.cookies.title")}</SecTitle>
              <p dangerouslySetInnerHTML={{ __html: t.raw("sections.cookies.body") as string}} />
            </section>

            <section>
              <SecTitle>{t("sections.security.title")}</SecTitle>
              <p>{t("sections.security.body")}</p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
