interface SectionWrapperProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ id, children, className = "" }: SectionWrapperProps) {
  // header fixe h-20 (80px) + pt-32 (128px) interne : -scroll-mt-6 pose le titre ~24px sous le header
  return (
    <section id={id} className={`-scroll-mt-6 ${className}`}>
      {children}
    </section>
  );
}
