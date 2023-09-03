import { type VariantProps, cva } from "class-variance-authority";
import { InputHTMLAttributes, forwardRef } from "react";

import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error: string | undefined;
}

const inputVariants = cva(
  "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      error: {
        default: "border-input focus-visible:ring-ring",
        hasError: "border-destructive focus-visible:!ring-destructive",
      },
    },
    defaultVariants: {
      error: "default",
    },
  }
);

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          className={cn(
            inputVariants({
              error: error ? "hasError" : "default",
              className,
            })
          )}
          ref={ref}
          {...props}
        />
        {error ? <p className="italic text-destructive">{error}</p> : null}
      </>
    );
  }
);
Input.displayName = "Input";

export { Input };
