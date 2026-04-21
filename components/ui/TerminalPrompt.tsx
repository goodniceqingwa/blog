import { cn } from "@/lib/utils";

interface TerminalPromptProps {
  children?: React.ReactNode;
  command?: string;
  className?: string;
}

export function TerminalPrompt({
  children,
  command,
  className,
}: TerminalPromptProps) {
  return (
    <span className={cn("font-mono text-sm", className)}>
      <span className="text-term-green font-bold">$ </span>
      {command && (
        <span className="text-text-secondary">{command}</span>
      )}
      {children}
    </span>
  );
}
