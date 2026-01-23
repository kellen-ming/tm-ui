"use client";

import * as TabsPrimitive from "@radix-ui/react-tabs";
import * as React from "react";

import { useSlidingIndicator } from "@/hooks/useSlidingIndicator";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

// 常量提取，避免每次渲染创建新数组
const DATA_STATE_SELECTOR = '[data-state="active"]';
const DATA_STATE_ATTRIBUTE_FILTER = ["data-state"];

const tabsListVariants = cva(
  "tm-tabs-list inline-flex w-fit items-center justify-center font-medium",
  {
    variants: {
      variant: {
        button: `
        bg-bgc-primary-black-default 
         p-sm rounded-md inline-flex w-fit items-center justify-center
         border border-border-tertiary-black-default
        `,
        ghost: "md:gap-6xl gap-2xl",
      },
      mode: {
        light: "",
        dark: "",
      },
    },
    defaultVariants: {
      variant: "ghost",
      mode: "dark",
    },
    compoundVariants: [
      {
        variant: "button",
        mode: "light",
        className: "bg-transparent border-border-secondary-gray-hover",
      },
      {
        variant: "button",
        mode: "dark",
        className:
          "bg-bgc-primary-black-default border-border-tertiary-black-default",
      },
    ],
  }
);

const tabsTriggerVariants = cva(
  // svg大小改[&_svg:not([class*='size-'])]:size-4 的值
  `
  tm-tabs-trigger
  box-border
  relative
  focus-visible:ring-ring/50 focus-visible:outline-ring focus-visible:ring-[1px] focus-visible:outline-[1px]  
  inline-flex items-center justify-center gap-1.5 py-md
  whitespace-nowrap 
  disabled:pointer-events-none 
  disabled:opacity-50  
  [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4
  `,
  {
    variants: {
      variant: {
        button: `
          px-lg h-4xl
          relative z-10
          transition-[color] duration-300 ease-in-out
          data-[state=active]:text-quarterary-gray-default
          text-secondary-gray-default hover:text-primary-gray-default 
          focus-visible:text-primary-gray-default
        `,
        ghost: "transition-[color,border,opacity] duration-300 ease-in-out",
      },
      mode: {
        light: "text-quarterary-gray-default",
        dark: "text-white",
      },
    },
    compoundVariants: [
      {
        variant: "ghost",
        mode: "light",
        className: ` 
        text-tertiary-gray-default hover:text-quarterary-gray-default data-[state=active]:text-quarterary-gray-default
        focus-visible:text-quarterary-gray-default 
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-bgc-primary-black-default after:opacity-0 data-[state=active]:after:opacity-100 after:transition-all after:duration-300 after:ease-in-out
        `,
      },
      {
        variant: "ghost",
        mode: "dark",
        className: ` 
        text-secondary-gray-default hover:text-primary-gray-default data-[state=active]:text-primary-gray-default 
        focus-visible:text-primary-gray-default
        after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-px after:bg-bgc-primary-gray-default after:opacity-0 data-[state=active]:after:opacity-100 after:transition-all after:duration-300 after:ease-in-out
        `,
      },
      {
        variant: "button",
        mode: "light",
        className: `
          relative z-10
          transition-[color] duration-300 ease-in-out
          data-[state=active]:text-primary-gray-default
          text-tertiary-gray-default hover:text-quarterary-gray-default
          focus-visible:text-quarterary-gray-default
        `,
      },
      {
        variant: "button",
        mode: "dark",
        className: `
          relative z-10
          transition-[color] duration-300 ease-in-out
          data-[state=active]:text-quarterary-gray-default
          text-secondary-gray-default hover:text-primary-gray-default 
          focus-visible:text-primary-gray-default
        `,
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

export interface TabsProps
  extends React.ComponentProps<typeof TabsPrimitive.Root> {
  variant?: TabsVariant;
  mode?: TabsMode;
}

function Tabs({
  className,
  variant = "ghost",
  mode = "dark",
  ...props
}: TabsProps) {
  return (
    <TabsVariantContext.Provider value={{ variant, mode }}>
      <TabsPrimitive.Root
        data-slot="tabs"
        className={cn("tm-tabs flex flex-col gap-2", className)}
        {...props}
      />
    </TabsVariantContext.Provider>
  );
}

function TabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  const { variant, mode } = React.useContext(TabsVariantContext);
  const listRef = React.useRef<HTMLDivElement | null>(null);

  // 使用滑动指示器 Hook
  const indicatorStyle = useSlidingIndicator({
    containerRef: listRef,
    enabled: variant === "button",
    selector: DATA_STATE_SELECTOR,
    attributeFilter: DATA_STATE_ATTRIBUTE_FILTER,
  });

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      className={cn(
        tabsListVariants({ variant, mode }),
        variant === "button" && "relative",
        className
      )}
      {...props}
    >
      {variant === "button" && indicatorStyle && (
        <span
          className={cn(
            "absolute left-0 top-sm h-[calc(100%-12px)] rounded-sm bg-bgc-primary-gray-default transition-[transform,width] duration-300 ease-in-out",
            {
              "bg-bgc-primary-black-default": mode === "light",
              "bg-bgc-primary-gray-default": mode === "dark",
            }
          )}
          style={{
            transform: `translateX(${indicatorStyle.left}px)`,
            width: `${indicatorStyle.width}px`,
            zIndex: 0,
          }}
          aria-hidden="true"
        />
      )}
      {props.children}
    </TabsPrimitive.List>
  );
}

function TabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  const { variant, mode } = React.useContext(TabsVariantContext);
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(tabsTriggerVariants({ variant, mode }), className)}
      {...props}
    />
  );
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("tm-tabs-content flex-1 outline-none", className)}
      {...props}
    />
  );
}

export { Tabs, TabsContent, TabsList, TabsTrigger };
