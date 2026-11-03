import { cn } from "@/lib/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap text-sm font-sans uppercase font-bold transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gold text-ink hover:bg-ink hover:text-cream shadow-[4px_4px_0_0_#0B0C10] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px]",
        outline: "border border-ink bg-transparent text-ink hover:bg-ink hover:text-cream",
        brutalist: "bg-orange text-cream border-2 border-ink shadow-[6px_6px_0_0_#0B0C10] hover:shadow-[2px_2px_0_0_#0B0C10] hover:translate-x-[4px] hover:translate-y-[4px]",
        ghost: "hover:bg-ink/10 text-ink",
        link: "text-ink underline-offset-4 hover:underline",
      },
      size: {
        default: "h-12 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-14 px-8 text-base",
        icon: "h-12 w-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
