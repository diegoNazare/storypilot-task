interface SectionProps {
  title: string;
  children: React.ReactNode;
  pattern?: "diagonal" | "dots" | "grid" | "crosshatch" | "none";
}

export default function Section({ title, children, pattern = "none" }: SectionProps) {
  const patternClass = pattern !== "none" ? `pattern-${pattern}` : "";
  
  return (
    <section className="mb-12">
      <h2 className="font-headline text-3xl uppercase tracking-[0.04em] mb-6 border-b border-mist pb-4">
        {title}
      </h2>
      <div className={`${patternClass} ${patternClass ? "p-6 rounded border border-mist" : ""}`}>
        {children}
      </div>
    </section>
  );
}
