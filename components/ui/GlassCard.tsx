import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  lineNumber?: boolean;
  fileTag?: string;
}

export function GlassCard({
  children,
  className,
  hover = true,
  lineNumber,
  fileTag,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "glass rounded-xl p-6 relative",
        hover && "glass-hover",
        lineNumber && "line-number",
        className
      )}
    >
      {fileTag && (
        <span className="absolute top-2 right-3 text-xs font-mono text-text-muted/50 select-none">
          {fileTag}
        </span>
      )}
      {children}
    </div>
  );
}
