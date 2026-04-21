import { cn } from "@/lib/utils";

interface CodeTagProps {
  children: React.ReactNode;
  className?: string;
}

export function CodeTag({ children, className }: CodeTagProps) {
  return (
    <span className={cn("code-tag", className)}>
      {"<"}
      {children}
      {" />"}
    </span>
  );
}
