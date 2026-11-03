import { cn } from "@/lib/utils/cn";
import * as React from "react";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  as?: React.ElementType;
}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, as: Component = "div", children, ...props }, ref) => {
    return (
      <Component
        ref={ref}
        className={cn(
          "mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 border-x border-ink/10",
          className
        )}
        {...props}
      >
        {children}
      </Component>
    );
  }
);
Container.displayName = "Container";
