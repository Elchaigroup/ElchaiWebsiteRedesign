/**
 * SectionBox — wraps section content in a subtle bordered box.
 *
 * Use inside a section's content container to give each piece of content
 * a clear visual boundary against the animated backdrop.
 */

import { type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionBoxProps {
  children: ReactNode;
  className?: string;
}

export function SectionBox({ children, className }: SectionBoxProps) {
  return (
    <div className={cn("section-box p-8 sm:p-10 lg:p-14", className)}>
      {children}
    </div>
  );
}
