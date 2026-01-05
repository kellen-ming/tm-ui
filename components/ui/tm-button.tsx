import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-xs rounded-sm font-semibold ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "border",
        text: "",
        link: "underline-offset-4 hover:underline",
      },
      size: {
        sm: "px-lg py-sm text-sm",
        lg: "px-xl py-md text-base",
        icon: "h-10 w-10",
      },
      color: {
        brand: "",
        white: "",
        linear: "",
      },
    },
    defaultVariants: {
      color: "brand",
      variant: "primary",
      size: "lg",
    },
    compoundVariants: [
      // ============ PRIMARY ============
      {
        variant: "primary",
        color: "brand",
        className: "bg-bgc-primary-brand-default hover:bg-bgc-primary-brand-hover text-white",
      },
      {
        variant: "primary",
        color: "white",
        className: "bg-bgc-primary-gray-default hover:bg-bgc-primary-gray-hover text-quarterary-gray-default",
      },
      {
        variant: "primary",
        color: "linear",
        className: "bg-linear-button hover:bg-linear-button-hover text-white",
      },

      // ============ SECONDARY ============
      {
        variant: "secondary",
        color: "brand",
        className:
          "border-border-primary-brand-default text-primary-brand-default hover:border-border-primary-brand-hover hover:text-primary-brand-hover bg-transparent",
      },
      {
        variant: "secondary",
        color: "white",
        className:
          "border-border-primary-gray-default text-primary-gray-default hover:border-border-primary-gray-hover hover:text-primary-gray-hover bg-transparent",
      },
      // ============ LINK ============
      {
        variant: "link",
        color: "brand",
        className: "text-primary-brand-default hover:text-primary-brand-hover",
      },
      {
        variant: "link",
        color: "white",
        className: "text-primary-gray-default hover:text-primary-brand-default",
      },

      // ============ TEXT ============
      {
        variant: "text",
        color: "brand",
        className: "text-primary-brand-default hover:text-primary-brand-hover",
      },
      {
        variant: "text",
        color: "white",
        className: "text-primary-gray-default hover:text-primary-brand-default",
      },
    ],
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  color?: "brand" | "white" | "linear";
  variant?: "primary" | "secondary" | "text" | "link";
  size?: "sm" | "lg" | "icon";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, color, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, color, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
