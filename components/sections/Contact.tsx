"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { Send, ExternalLink, Mail, CheckCircle, AlertCircle, Clock } from "lucide-react";

const schema = z.object({
  nom:     z.string().min(2, "Nom requis"),
  societe: z.string().min(2, "Société requise"),
  email:   z.string().email("Email invalide"),
  objet:   z.enum(["audit", "administration", "cloud", "urgence", "autre"]),
  message: z.string().min(20, "Message trop court (20 caractères minimum)"),
});
type FormData = z.infer<typeof schema>;

const subjects = [
  { value: "audit",          label: "Audit de sécurité" },
  { value: "administration", label: "Administration systèmes & réseaux" },
  { value: "cloud",          label: "Cloud & virtualisation" },
  { value: "urgence",        label: "Urgence / Incident en cours" },
  { value: "autre",          label: "Autre demande" },
];

const inputBase =
  "w-full bg-white border border-border rounded-xl px-4 py-3 text-sm text-ink placeholder-ink-dim " +
  "focus:outline-none focus:border-blue focus:ring-2 focus:ring-blue/10 transition-all duration-150";

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
    <SectionWrapper id="contact" className="py-24 bg-white">
      <div className="wrap">
        <div className="mb-14">
          <span className="inline-block text-blue text-sm font-semibold uppercase tracking-widest mb-3">Contact</span>
          <h2 className="text-3xl md:text-4xl font-black text-ink mb-4 leading-tight">Discutons de vos besoins</h2>
          <p className="text-ink-soft max-w-lg leading-relaxed">
            Réponse sous 24h. Pour les urgences (incident en cours), précisez-le dans l&apos;objet.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Form */}
          <div className="lg:col-span-2 bg-surf rounded-2xl border border-border p-8 shadow-card">
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
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className={labelBase}>Nom *</label>
                    <input {...register("nom")} placeholder="Sylvestre MIGNOT" className={inputBase} />
                    {errors.nom && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.nom.message}</p>}
                  </div>
                  <div>
                    <label className={labelBase}>Société *</label>
                    <input {...register("societe")} placeholder="ACME SAS" className={inputBase} />
                    {errors.societe && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.societe.message}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelBase}>Email *</label>
                  <input {...register("email")} type="email" placeholder="contact@entreprise.fr" className={inputBase} />
                  {errors.email && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.email.message}</p>}
                </div>
                <div>
                  <label className={labelBase}>Objet *</label>
                  <select {...register("objet")} className={inputBase} defaultValue="">
                    <option value="" disabled>Sélectionner un objet</option>
                    {subjects.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                  </select>
                  {errors.objet && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.objet.message}</p>}
                </div>
                <div>
                  <label className={labelBase}>Message *</label>
                  <textarea {...register("message")} rows={5} placeholder="Décrivez votre besoin, votre contexte..." className={inputBase + " resize-none"} />
                  {errors.message && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{errors.message.message}</p>}
                </div>
                {status === "error" && (
                  <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl p-3">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    Erreur lors de l&apos;envoi. Contactez-moi directement par email.
                  </div>
                )}
                <div className="flex items-center gap-4 pt-1">
                  <button type="submit" disabled={status === "loading"}
                          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-blue text-white font-semibold text-sm hover:bg-blue/90 disabled:opacity-60 transition-all shadow-md hover:shadow-lg hover:shadow-blue/20">
                    {status === "loading"
                      ? <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Envoi...</>
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
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:border-blue/30 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <Mail className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">Email</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">contact@opsec-it.fr</p>
              </div>
            </a>

            <a href="https://linkedin.com/in/" target="_blank" rel="noopener noreferrer"
               className="flex items-center gap-4 p-4 rounded-xl border border-border bg-white hover:border-blue/30 hover:shadow-card transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center flex-shrink-0">
                <ExternalLink className="w-4 h-4 text-blue" />
              </div>
              <div>
                <p className="text-xs text-ink-dim">LinkedIn</p>
                <p className="text-sm font-semibold text-ink group-hover:text-blue transition-colors">Sylvestre MIGNOT</p>
              </div>
            </a>

            {/* Dispo */}
            <div className="mt-6 p-5 rounded-xl border border-green/20 bg-green-soft">
              <div className="flex items-center gap-2 mb-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-60" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green" />
                </span>
                <p className="text-sm font-bold text-ink">Disponible</p>
              </div>
              <p className="text-xs text-ink-soft leading-relaxed">
                Nouvelles missions acceptées<br />Délai d&apos;intervention : 48-72h
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
