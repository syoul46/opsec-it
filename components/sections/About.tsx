import Image from "next/image";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { CheckCircle, Award, Terminal, Network, Activity, Layers, Package, Lock, Quote, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

// L'ordre doit correspondre à messages.about.skills
const SKILL_ICONS: LucideIcon[] = [Terminal, Network, Activity, Layers, Package, Lock];

type Experience   = { period: string; role: string; company: string; description: string };
type Skill        = { label: string; sub: string };
type Value        = { title: string; description: string };
type Testimonial  = { quote: string; author: string; initials: string; structure: string; url: string; display: string };

export default function About() {
  const t = useTranslations("about");
  const experience   = t.raw("experience")    as Experience[];
  const skills       = t.raw("skills")        as Skill[];
  const values       = t.raw("values")        as Value[];
  const testimonials = t.raw("testimonials")  as Testimonial[];

  return (
    <SectionWrapper id="parcours" className="relative pt-32 pb-28 bg-surf-mid overflow-hidden">
      <Image
        src="/bg/about-sunset.png"
        alt=""
        aria-hidden="true"
        fill
        sizes="100vw"
        className="object-cover object-center pointer-events-none select-none opacity-60"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-surf-mid via-surf-mid/40 to-surf-mid pointer-events-none" />
      <div aria-hidden="true" className="absolute inset-0 bg-surf-mid/35 pointer-events-none" />
      <div className="relative wrap">
        <div className="mb-14 flex items-center gap-6">
          <Image
            src="/sylvestre.jpg"
            alt={t("portraitAlt")}
            width={80}
            height={80}
            priority={false}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue/40 shadow-md flex-shrink-0"
          />
          <div>
            <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">
              {t("kicker")}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-ink leading-tight">
              {t("title")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Timeline */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-8">{t("experienceTitle")}</h3>
            <ol className="space-y-0">
              {experience.map((e, i) => (
                <li key={i} className="flex gap-5">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <span className="w-4 h-4 rounded-full bg-blue border-2 border-surf-mid ring-2 ring-blue/40 mt-0.5 flex-shrink-0" />
                    {i < experience.length - 1 && (
                      <div className="w-0.5 bg-blue-mid flex-1 mt-1.5 mb-0" />
                    )}
                  </div>
                  <div className="pb-10">
                    <p className="text-xs font-semibold text-blue uppercase tracking-wider mb-1">{e.period}</p>
                    <p className="text-base font-bold text-ink">{e.role}</p>
                    <p className="text-sm text-blue font-medium mb-1.5">{e.company}</p>
                    <p className="text-sm text-ink-soft leading-relaxed">{e.description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-2.5 space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-6">{t("approachTitle")}</h3>
              {values.map(v => (
                <div key={v.title} className="flex gap-3">
                  <CheckCircle className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-ink">{v.title}</p>
                    <p className="text-sm text-ink-soft">{v.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certification + Compétences */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-4">{t("certificationTitle")}</h3>
            <div className="mb-8">
              <div className="flex items-center gap-4 p-4 rounded-xl border bg-blue/10 border-blue/30 shadow-sm">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue">
                  <Award className="w-4 h-4 text-surf" />
                </div>
                <div>
                  <p className="text-sm font-bold text-blue">{t("certification.label")}</p>
                  <p className="text-xs text-ink-soft">{t("certification.sub")}</p>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-semibold uppercase tracking-widest text-ink-dim mb-4">{t("skillsTitle")}</h3>
            <div className="space-y-3">
              {skills.map((s, i) => {
                const Icon = SKILL_ICONS[i];
                return (
                  <div key={s.label}
                       className="flex items-center gap-4 p-4 rounded-xl border bg-surf border-border hover:border-blue/40 hover:bg-blue/5 transition-all">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 bg-blue/10 border border-blue/25">
                      <Icon className="w-4 h-4 text-blue" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-ink">{s.label}</p>
                      <p className="text-xs text-ink-soft">{s.sub}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Témoignages clients */}
            <div className="mt-8">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue mb-4">{t("testimonialsTitle")}</p>
              <div className="space-y-4">
                {testimonials.map(tm => (
                  <div key={tm.author} className="p-6 rounded-xl border border-border bg-surf">
                    <div className="relative">
                      <Quote className="w-6 h-6 text-amber/40 absolute -top-1 -left-1" />
                      <blockquote className="pl-8">
                        <p className="text-sm text-ink-soft leading-relaxed italic mb-4">
                          « {tm.quote} »
                        </p>
                        <footer className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-blue/10 border border-blue/20 flex items-center justify-center flex-shrink-0">
                            <span className="text-xs font-bold text-blue">{tm.initials}</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold text-ink">{tm.author}</p>
                            <a href={tm.url} target="_blank" rel="noopener noreferrer" className="text-xs text-ink-soft hover:text-blue transition-colors">
                              {tm.structure} — {tm.display}
                            </a>
                          </div>
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
