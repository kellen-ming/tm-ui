"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const tabsListVariants = cva("inline-flex w-fit items-center justify-center", {
  variants: {
    variant: {
      button:
        "bg-bgc-primary-black-default dark:text-text-quarterary-gray-default inline-flex h-9 w-fit items-center justify-center rounded-lg p-[3px]",
      ghost: "",
    },
    mode: {
      light: "text-white",
      dark: "text-text-quarterary-gray-default",
    },
  },
  compoundVariants: [
    {
      variant: "ghost",
      mode: "light",
      className: "md:gap-6xl gap-2xl",
    },
    {
      variant: "ghost",
      mode: "dark",
      className: "md:gap-6xl gap-2xl",
    },
  ],
  defaultVariants: {
    variant: "ghost",
    mode: "dark",
  },
});

const tabsTriggerVariants = cva(
  // svg大小改[&_svg:not([class*='size-'])]:size-4 的值
  `
  relative
  hover:font-semibold data-[state=active]:font-semibold
  focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[1px] focus-visible:outline-[1px]  
  inline-flex flex-1 items-center justify-center gap-1.5 py-md
  focus-visible:font-semibold
  whitespace-nowrap 
  transition-[color,border,opacity,font-weight] duration-300 ease-in-out
  disabled:pointer-events-none 
  disabled:opacity-50  
  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
  after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-bgc-primary-gray-default after:opacity-0 data-[state=active]:after:opacity-100 after:transition-all after:duration-300 after:ease-in-out
  `,
  {
    variants: {
      variant: {
        button:
          "data-[state=active]:bg-bgc-primary-gray-default dark:data-[state=active]:text-white focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 text-white dark:text-muted-foreground inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1 text-sm font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:shadow-sm [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ghost: "",
      },
      mode: {
        light: "text-text-quarterary-gray-default",
        dark: "text-white",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        mode: "light",
        className: ` 
        text-text-tertiary-gray-default hover:text-text-quarterary-gray-default data-[state=active]:text-text-quarterary-gray-default
        focus-visible:text-text-quarterary-gray-default 
        after:bg-bgc-primary-black-default`,
      },
      {
        variant: "ghost",
        mode: "dark",
        className: ` 
        text-text-secondary-gray-default hover:text-text-primary-gray-default data-[state=active]:text-text-primary-gray-default 
        focus-visible:text-text-primary-gray-default
        after:bg-bgc-primary-gray-default`,
      },
    ],
    defaultVariants: {
      variant: "ghost",
      mode: "dark",
    },
  }
);

type TabsVariant = "button" | "ghost";
type TabsMode = "light" | "dark";

interface TabsContext {
  variant: TabsVariant;
  mode: TabsMode;
}

const TabsVariantContext = React.createContext<TabsContext>({
  variant: "ghost",
  mode: "dark",
});

export interface TabsProps extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  mode?: TabsMode;
}

function Tabs({ className, variant = "ghost", mode = "dark", ...props }: TabsProps) {
  return (
    <TabsVariantContext.Provider value={{ variant, mode }}>
      <TabsPrimitive.Root data-slot='tabs' className={cn("flex flex-col gap-2", className)} {...props} />
    </TabsVariantContext.Provider>
  );
}

function TabsList({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant, mode } = React.useContext(TabsVariantContext);

  return (
    <TabsPrimitive.List
      data-slot='tabs-list'
      className={cn(tabsListVariants({ variant, mode }), className)}
      {...props}
    />
  );
}

function TabsTrigger({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, mode } = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot='tabs-trigger'
      className={cn(tabsTriggerVariants({ variant, mode }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot='tabs-content' className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
