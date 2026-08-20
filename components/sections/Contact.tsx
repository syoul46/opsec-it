"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Watermark from "@/components/ui/Watermark";
import { Send, ExternalLink, Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";

const inputBase =
  "w-full bg-surf border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-dim " +
  "focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-150";

const labelBase = "block text-xs font-semibold text-ink-soft uppercase tracking-wider mb-1.5";

type Subject = { value: string; label: string };

export default function Contact() {
  const t = useTranslations("contact");
  const tForm = useTranslations("contact.form");
  const tErr  = useTranslations("contact.errors");
  const tOk   = useTranslations("contact.success");
  const tSide = useTranslations("contact.sidebar");
  const subjects = t.raw("subjects") as Subject[];

  const schema = useMemo(
    () =>
      z.object({
        nom:     z.string().min(2, tErr("name")).max(100),
        societe: z.string().min(2, tErr("org")).max(150),
        email:   z.string().email(tErr("email")).max(200),
        objet:   z.enum(["audit", "administration", "cloud", "creation-web", "urgence", "autre"]),
        message: z.string().min(20, tErr("message")).max(5000),
        website: z.string().max(0).optional(),
      }),
    [tErr],
  );
  type FormData = z.infer<typeof schema>;

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success"); reset();
    } catch { setStatus("error"); }
  };

  const req = tForm("required");

  return (
    <SectionWrapper id="contact" className="relative overflow-hidden pt-32 pb-28 bg-surf">
      <Watermark preset="shield-corner" />
      <div className="wrap relative">
        <div className="mb-14">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">{t("kicker")}</span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">{t("title")}</h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">{t("intro")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 bg-surf-mid rounded-2xl border border-border p-8 shadow-card">
            {status === "success" ? (
              // role="status" : à la soumission le formulaire disparaît et ce bloc
              // le remplace. Sans région live, un lecteur d'écran ne signalait rien —
              // l'utilisateur restait devant un contenu remplacé en silence.
              <div role="status" className="flex flex-col items-center justify-center py-16 gap-5">
                <div className="w-16 h-16 rounded-full bg-green-soft flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-ink mb-1">{tOk("title")}</p>
                  <p className="text-sm text-ink-soft">{tOk("description")}</p>
                </div>
                <button onClick={() => setStatus("idle")} className="text-sm text-blue font-medium hover:underline">
                  {tOk("again")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                  <label htmlFor="website">{tForm("honeypotLabel")}</label>
                  <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-nom" className={labelBase}>{tForm("labelName")} {req}</label>
                    <input id="contact-nom" autoComplete="name" aria-invalid={!!errors.nom}
                      aria-describedby={errors.nom ? "err-nom" : undefined}
                      placeholder={tForm("placeholderName")} className={inputBase} {...register("nom")} />
                    {errors.nom && <p id="err-nom" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-societe" className={labelBase}>{tForm("labelOrg")} {req}</label>
                    <input id="contact-societe" autoComplete="organization" aria-invalid={!!errors.societe}
                      aria-describedby={errors.societe ? "err-societe" : undefined}
                      placeholder={tForm("placeholderOrg")} className={inputBase} {...register("societe")} />
                    {errors.societe && <p id="err-societe" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.societe.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelBase}>{tForm("labelEmail")} {req}</label>
                  <input id="contact-email" type="email" autoComplete="email" aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    placeholder={tForm("placeholderEmail")} className={inputBase} {...register("email")} />
                  {errors.email && <p id="err-email" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-objet" className={labelBase}>{tForm("labelSubject")} {req}</label>
                  <select id="contact-objet" aria-invalid={!!errors.objet}
                    aria-describedby={errors.objet ? "err-objet" : undefined}
                    defaultValue="" className={inputBase} {...register("objet")}>
                    <option value="" disabled>{tForm("placeholderSelect")}</option>
                    {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  {errors.objet && <p id="err-objet" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.objet.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelBase}>{tForm("labelMessage")} {req}</label>
                  <textarea id="contact-message" rows={5} aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    placeholder={tForm("placeholderMessage")} className={inputBase + " resize-none"} {...register("message")} />
                  {errors.message && <p id="err-message" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message.message}</p>}
                </div>
                {status === "error" && (
                  <div role="alert" className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {tErr("send")}
                  </div>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <button type="submit" disabled={status === "loading"}
                          className="flex items-center gap-2 rounded-xl bg-blue text-surf font-semibold text-sm hover:bg-blue/90 disabled:opacity-60 transition-all shadow-md hover:shadow-lg hover:shadow-blue/30 min-h-11 px-5 py-2.5">
                    {status === "loading"
                      ? <><div className="w-4 h-4 border-2 border-surf/30 border-t-surf rounded-full animate-spin" />{tForm("submitting")}</>
                      : <><Send className="w-4 h-4" />{tForm("submit")}</>}
                  </button>
                  <p className="text-xs text-ink-dim flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />{tForm("responseTime")}
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-5">{tSide("title")}</p>

            <a href="mailto:contact@opsec-it.fr"
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surf-mid hover:border-blue/40 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">{tSide("emailLabel")}</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">contact@opsec-it.fr</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/sylvestre-mignot-261a7461/" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surf-mid hover:border-blue/40 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">{tSide("linkedinLabel")}</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">{tSide("linkedinName")}</p>
              </div>
            </a>

            <div className="mt-6 p-5 rounded-xl border border-green/30 bg-green/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
                </span>
                <p className="text-sm font-bold text-ink">{tSide("availableTitle")}</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed whitespace-pre-line">
                {tSide("availableText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
