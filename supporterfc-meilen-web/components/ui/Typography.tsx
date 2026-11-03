import { cn } from "@/lib/utils/cn";
import * as React from "react";

const typographyVariants = {
  h1: "font-sans text-5xl md:text-7xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.85]",
  h2: "font-sans text-4xl md:text-6xl font-bold uppercase tracking-tight",
  h3: "font-sans text-2xl md:text-4xl font-bold uppercase",
  h4: "font-sans text-xl md:text-2xl font-bold uppercase",
  p: "font-serif text-lg md:text-xl leading-relaxed text-ink/80",
  subtext: "font-sans text-sm md:text-base font-medium text-ink/60 uppercase tracking-widest",
};

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  variant?: keyof typeof typographyVariants;
  as?: React.ElementType;
}

export const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant = "p", as, children, ...props }, ref) => {
    const Component = as || (variant === "subtext" ? "span" : variant);
    return (
      <Component
        ref={ref as any}
        className={cn(typographyVariants[variant], className)}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Typography.displayName = "Typography";
