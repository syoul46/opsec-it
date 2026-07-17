import { TikiIcon, type TikiIconName } from "@/components/ui/tiki";

interface ServiceCardProps {
  glyph: TikiIconName;
  title: string;
  description: string;
  tags?: string[];
}

export default function ServiceCard({ glyph, title, description, tags }: ServiceCardProps) {
  return (
    <div className="group bg-surf-mid rounded-2xl border border-border p-8 shadow-card hover:shadow-card-md hover:-translate-y-1 hover:border-blue/40 transition-all duration-200 flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-blue group-hover:border-blue transition-colors duration-200">
        <TikiIcon name={glyph} className="w-6 h-6 text-blue group-hover:text-surf transition-colors duration-200" />
      </div>
      <h3 className="text-base font-bold text-ink mb-3">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {tags.map(t => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue/10 font-medium text-blue border border-blue/25">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
