"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "secondary";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
        {
          "bg-primary text-white": variant === "default",
          "border border-ink/20 bg-transparent text-ink dark:text-paper":
            variant === "outline",
          "bg-ink/10 text-ink dark:bg-paper/10 dark:text-paper":
            variant === "secondary",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };
