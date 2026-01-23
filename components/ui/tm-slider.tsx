"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

const thumbVariants = cva(
  `
  focus-visible:outline-hidden
  block
  relative
  size-4
  shrink-0  rounded-full
  transition-[color,box-shadow]  
  focus-visible:outline-none
  active:outline-none 
  disabled:pointer-events-none disabled:opacity-50
  after:absolute after:content-[''] after:rounded-full
  after:top-1/2 after:left-1/2 after:-translate-x-1/2 
  after:-translate-y-1/2 after:size-2  
  `,
  {
    variants: {
      mode: {
        light: "bg-bgc-primary-gray-default",
        dark: `
        bg-bgc-primary-gray-default 
        after:bg-bgc-primary-black-default
        hover:after:bg-bgc-primary-brand-default 
        `,
      },
    },
    defaultVariants: {
      mode: "dark",
    },
  }
);

export type SliderProps = React.ComponentPropsWithoutRef<
  typeof SliderPrimitive.Root
> & {
  mode: "light" | "dark";
};

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  SliderProps
>(({ className, mode = "dark", ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "tm-slider relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track
      className={cn(
        "tm-slider-track relative h-1 w-full grow overflow-hidden rounded-full",
        {
          "bg-bgc-primary-gray-default": mode === "light",
          "bg-bgc-primary-black-default": mode === "dark",
        }
      )}
    >
      <SliderPrimitive.Range
        className={cn("tm-slider-range absolute h-full  ", {
          "bg-bgc-quarterary-black-default": mode === "light",
          "bg-bgc-primary-gray-default": mode === "dark",
        })}
      />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={thumbVariants({ mode })} />
  </SliderPrimitive.Root>
));
Slider.displayName = "TmSlider";

export { Slider };
