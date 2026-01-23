"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { ChevronDown } from "lucide-react";

const accordionItemVariants = cva(
  "tm-accordion-item text-primary-gray-default bg-transparent",
  {
    variants: {
      variant: {
        default: `
        border-b last:border-b-0 border-border-tertiary-black-default
        text-primary-gray-default
        hover:text-secondary-gray-default
      `,
        outline: `
        rounded-md 
        border border-border-tertiary-black-default  
        hover:border-border-primary-brand-hover
        hover:text-primary-gray-hover  
        data-[state=open]:border-border-primary-brand-hover 
        data-[state=open]:bg-bgc-primary-black-default 
        data-[state=open]:text-primary-brand-default
      `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const accordionTriggerVariants = cva(
  `
    tm-accordion-trigger 
    flex flex-1 items-center justify-between 
    transition-all 
    disabled:pointer-events-none disabled:opacity-50
  `,
  {
    variants: {
      variant: {
        default: `
          focus-visible:border-ring focus-visible:ring-ring/50 
          gap-4 rounded-md py-4 text-left 
          font-medium transition-all 
          focus-visible:ring-[3px] 
          disabled:pointer-events-none 
          disabled:opacity-50 
          data-[state=open]>svg]:rotate-180 data-[state=open]:pb-md
        `,
        outline: `
          p-2xl md:p-3xl text-xl font-semibold data-[state=open]:pb-md
        `,
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AccordionContext {
  /** 目前支持两种变体 */
  variant?: "default" | "outline";
}
const AccordionVariantContext = React.createContext<AccordionContext>({
  variant: "default",
});

export type AccordionProps = React.ComponentPropsWithoutRef<
  typeof AccordionPrimitive.Root
> &
  AccordionContext;

const Accordion = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root> &
    AccordionContext
>(({ className, children, variant = "default", ...props }, ref) => {
  return (
    <AccordionVariantContext.Provider value={{ variant }}>
      <AccordionPrimitive.Root
        ref={ref}
        className={cn("tm-accordion", className)}
        {...props}
      >
        {children}
      </AccordionPrimitive.Root>
    </AccordionVariantContext.Provider>
  );
});
Accordion.displayName = AccordionPrimitive.Root.displayName;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const { variant } = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Item
      ref={ref}
      className={cn(accordionItemVariants({ variant }), className)}
      {...props}
    />
  );
});
AccordionItem.displayName = AccordionPrimitive.Item.displayName;

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Header asChild className="flex">
      <div>
        <AccordionPrimitive.Trigger
          ref={ref}
          className={cn(accordionTriggerVariants({ variant }), className)}
          {...props}
        >
          {children}
          {variant === "default" && (
            <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
          )}
        </AccordionPrimitive.Trigger>
      </div>
    </AccordionPrimitive.Header>
  );
});
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { variant } = React.useContext(AccordionVariantContext);

  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div
        className={cn(
          "pb-2xl pt-none md:pb-3xl",
          {
            "text-secondary-gray-default": variant === "default",
            "px-2xl pb-2xl pt-none md:px-3xl md:pb-3xl": variant === "outline",
          },
          className
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Content>
  );
});

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
