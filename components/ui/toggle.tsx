"use client";

import * as TogglePrimitive from "@radix-ui/react-toggle";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const toggleVariants = cva(
  `
  inline-flex items-center justify-center 
  rounded-sm text-sm font-medium 
  transition-colors 
  focus-visible:outline-none 
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 gap-xs
  [&[data-state=on]>svg]:rotate-180 
  `,
  {
    variants: {
      variant: {
        outline: "border bg-transparent",
        text: "border-none bg-transparent",
      },
      size: {
        default: "py-sm px-lg min-w-10",
      },
      mode: {
        light: `
          text-quarterary-gray-default border-border-primary-black-default
          hover:text-tertiary-gray-default hover:border-border-tertiary-black-hover
          [&[data-state=on]]:text-tertiary-gray-default [&[data-state=on]]:border-border-tertiary-black-hover
        `,
        dark: `
          text-primary-gray-default border-border-primary-gray-default
          hover:text-secondary-gray-default hover:border-border-secondary-gray-hover
          [&[data-state=on]]:text-secondary-gray-default [&[data-state=on]]:border-border-secondary-gray-hover
        `,
      },
    },
    defaultVariants: {
      size: "default",
      mode: "dark",
    },
  }
);

export type ToggleProps = React.ComponentPropsWithoutRef<
  typeof TogglePrimitive.Root
> &
  VariantProps<typeof toggleVariants> & {
    mode: "light" | "dark";
  };

const Toggle = React.forwardRef<
  React.ElementRef<typeof TogglePrimitive.Root>,
  ToggleProps
>(({ className, variant, size, mode, children, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, mode, className }))}
    {...props}
  >
    {children}
    <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
  </TogglePrimitive.Root>
));

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
