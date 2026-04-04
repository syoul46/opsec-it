import { LucideIcon } from "lucide-react";

interface ServiceCardProps {
  Icon: LucideIcon;
  title: string;
  description: string;
  tags?: string[];
}

export default function ServiceCard({ Icon, title, description, tags }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-border p-8 shadow-card hover:shadow-card-md hover:-translate-y-1 transition-all duration-200 flex flex-col">
      <div className="w-12 h-12 rounded-xl bg-blue/10 border border-blue/25 flex items-center justify-center mb-6 flex-shrink-0 group-hover:bg-blue group-hover:border-blue transition-colors duration-200">
        <Icon className="w-5 h-5 text-blue group-hover:text-white transition-colors duration-200" />
      </div>
      <h3 className="text-base font-bold text-ink mb-3">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed mb-5 flex-1">{description}</p>
      {tags && (
        <div className="flex flex-wrap gap-2 mt-auto pt-1">
          {tags.map(t => (
            <span key={t} className="text-xs px-3 py-1 rounded-full bg-blue/6 font-medium text-blue border border-blue/20">
              {t}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
