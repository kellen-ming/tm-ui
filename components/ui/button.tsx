import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "tm-button inline-flex items-center justify-center gap-xs rounded-sm font-semibold ring-offset-background  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-bgc-primary-brand-default hover:bg-bgc-primary-brand-hover text-white",
        "primary-white":
          "bg-bgc-primary-gray-default hover:bg-bgc-primary-gray-hover text-quarterary-gray-default",
        secondary:
          "border border-border-primary-brand-default text-primary-brand-default hover:border-border-primary-brand-hover hover:text-primary-brand-hover bg-transparent",
        "secondary-white":
          "border border-border-primary-gray-default text-primary-gray-default hover:border-border-secondary-gray-hover hover:text-secondary-gray-default bg-transparent",
        text: "text-primary-brand-default hover:text-primary-brand-hover",
        "text-white":
          "text-primary-gray-default hover:text-primary-brand-default",
        link: "underline-offset-4 hover:underline hover:decoration-primary-brand-hover text-primary-brand-default hover:text-primary-brand-hover",
        "link-white":
          "underline-offset-4 hover:underline text-primary-gray-default hover:text-primary-brand-default",
        linear: "bg-linear-button hover:bg-linear-button-hover text-white",
      },
      size: {
        sm: "px-lg py-sm text-sm",
        lg: "px-xl py-md text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export type ButtonProps = Omit<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  "color"
> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
