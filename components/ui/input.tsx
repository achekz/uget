"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, dir = "rtl", ...props }, ref) => {
    return (
      <input
        type={type}
        dir={dir}
        className={cn(
          "flex h-10 w-full rounded-full border border-ink/10 bg-white dark:bg-ink/50 px-4 py-2 text-sm",
          "placeholder:text-ink/40 dark:placeholder:text-paper/40",
          "transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-paper dark:focus:ring-offset-ink",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "[&:-webkit-autofill]:bg-white dark:[&:-webkit-autofill]:bg-ink/50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
