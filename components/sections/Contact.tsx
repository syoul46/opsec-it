"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Send, ExternalLink, Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";

const schema = z.object({
  nom:     z.string().min(2, "Nom requis").max(100),
  societe: z.string().min(2, "Organisation requise").max(150),
  email:   z.string().email("Email invalide").max(200),
  objet:   z.enum(["audit", "administration", "cloud", "creation-web", "urgence", "autre"]),
  message: z.string().min(20, "Message trop court (20 caractères minimum)").max(5000),
  website: z.string().max(0).optional(),
});
type FormData = z.infer<typeof schema>;

const subjects = [
  { value: "audit",          label: "Audit de sécurité" },
  { value: "administration", label: "Administration systèmes & réseaux" },
  { value: "cloud",          label: "Cloud & virtualisation" },
  { value: "creation-web",   label: "Création de site web" },
  { value: "urgence",        label: "Urgence / Incident en cours" },
  { value: "autre",          label: "Autre demande" },
];

const inputBase =
  "w-full bg-surf border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-dim " +
  "focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/20 transition-all duration-150";

const labelBase = "block text-xs font-semibold text-ink-soft uppercase tracking-wider mb-1.5";

export default function Contact() {
  const [status, setStatus] = useState<"idle"|"loading"|"success"|"error">("idle");
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error();
      setStatus("success"); reset();
    } catch { setStatus("error"); }
  };

  return (
    <SectionWrapper id="contact" className="pt-32 pb-28 bg-surf">
      <div className="wrap">
        <div className="mb-14">
          <span className="inline-block text-amber text-sm font-semibold uppercase tracking-widest mb-3">Contact</span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">Discutons de vos besoins</h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Réponse sous 24h. Pour les urgences (incident en cours), précisez-le dans l&apos;objet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 bg-surf-mid rounded-2xl border border-border p-8 shadow-card">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-16 gap-5">
                <div className="w-16 h-16 rounded-full bg-green-soft flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-ink mb-1">Message envoyé !</p>
                  <p className="text-sm text-ink-soft">Je vous répondrai dans les 24h ouvrées.</p>
                </div>
                <button onClick={() => setStatus("idle")} className="text-sm text-blue font-medium hover:underline">
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
                {/* Honeypot — invisible pour l'humain, piège à bots */}
                <div aria-hidden="true" className="absolute left-[-9999px] top-auto w-px h-px overflow-hidden">
                  <label htmlFor="website">Ne pas remplir</label>
                  <input
                    id="website"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register("website")}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-nom" className={labelBase}>Nom *</label>
                    <input
                      id="contact-nom"
                      autoComplete="name"
                      aria-invalid={!!errors.nom}
                      aria-describedby={errors.nom ? "err-nom" : undefined}
                      placeholder="Jean Dupont"
                      className={inputBase}
                      {...register("nom")}
                    />
                    {errors.nom && <p id="err-nom" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label htmlFor="contact-societe" className={labelBase}>Organisation / Société *</label>
                    <input
                      id="contact-societe"
                      autoComplete="organization"
                      aria-invalid={!!errors.societe}
                      aria-describedby={errors.societe ? "err-societe" : undefined}
                      placeholder="ACME SAS"
                      className={inputBase}
                      {...register("societe")}
                    />
                    {errors.societe && <p id="err-societe" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.societe.message}</p>}
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-email" className={labelBase}>Email *</label>
                  <input
                    id="contact-email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "err-email" : undefined}
                    placeholder="contact@entreprise.fr"
                    className={inputBase}
                    {...register("email")}
                  />
                  {errors.email && <p id="err-email" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-objet" className={labelBase}>Objet *</label>
                  <select
                    id="contact-objet"
                    aria-invalid={!!errors.objet}
                    aria-describedby={errors.objet ? "err-objet" : undefined}
                    defaultValue=""
                    className={inputBase}
                    {...register("objet")}
                  >
                    <option value="" disabled>Sélectionner un objet</option>
                    {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  {errors.objet && <p id="err-objet" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.objet.message}</p>}
                </div>
                <div>
                  <label htmlFor="contact-message" className={labelBase}>Message *</label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={errors.message ? "err-message" : undefined}
                    placeholder="Décrivez votre besoin, votre contexte..."
                    className={inputBase + " resize-none"}
                    {...register("message")}
                  />
                  {errors.message && <p id="err-message" className="text-xs text-red-400 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message.message}</p>}
                </div>
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-300 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Erreur lors de l&apos;envoi. Contactez-moi directement par email.
                  </div>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <button type="submit" disabled={status === "loading"}
                          className="flex items-center gap-2 rounded-xl bg-blue text-surf font-semibold text-sm hover:bg-blue/90 disabled:opacity-60 transition-all shadow-md hover:shadow-lg hover:shadow-blue/30 min-h-11 px-5 py-2.5">
                    {status === "loading"
                      ? <><div className="w-4 h-4 border-2 border-surf/30 border-t-surf rounded-full animate-spin" />Envoi...</>
                      : <><Send className="w-4 h-4" />Envoyer</>}
                  </button>
                  <p className="text-xs text-ink-dim flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />Réponse sous 24h ouvrées
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-dim mb-5">Contacts directs</p>

            <a href="mailto:contact@opsec-it.fr"
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surf-mid hover:border-blue/40 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">Email</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">contact@opsec-it.fr</p>
              </div>
            </a>

            <a href="https://www.linkedin.com/in/sylvestre-mignot-261a7461/" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-surf-mid hover:border-blue/40 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">LinkedIn</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">Sylvestre MIGNOT</p>
              </div>
            </a>

            {/* Dispo */}
            <div className="mt-6 p-5 rounded-xl border border-green/30 bg-green/10">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
                </span>
                <p className="text-sm font-bold text-ink">Disponible</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                Nouvelles missions acceptées.<br />
                Réponse sous 24h ouvrées — première intervention planifiée sous 48-72h.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
