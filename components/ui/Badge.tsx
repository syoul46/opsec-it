interface BadgeProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}

export default function Badge({ children, variant = "secondary" }: BadgeProps) {
  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
        variant === "primary"
          ? "bg-blue-light text-blue-primary"
          : "bg-slate-100 text-ink-secondary"
      }`}
    >
      {children}
    </span>
  );
}
