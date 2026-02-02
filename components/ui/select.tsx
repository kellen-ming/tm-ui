"use client"

import * as React from "react"
import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"



const selectTriggerVariants = cva(
  `
    tm-select-trigger
    aria-invalid:ring-destructive/20 
    aria-invalid:border-destructive 

    flex items-center justify-between gap-2 
    border 
    bg-transparent px-3 py-2 w-fit rounded-sm 
    text-sm whitespace-nowrap 
    transition-[color,box-shadow,border] outline-none  

    disabled:cursor-not-allowed 
    disabled:opacity-50 
    data-[size=default]:h-11 
    data-[size=sm]:h-8 
    data-[state=open]:[&>svg]:rotate-180
    data-placeholder:*:data-[slot=select-value]:text-tertiary-gray-default 

    *:data-[slot=select-value]:line-clamp-1 
    *:data-[slot=select-value]:flex 
    *:data-[slot=select-value]:items-center 
    *:data-[slot=select-value]:gap-2 

    [&_svg]:pointer-events-none 
    [&_svg]:shrink-0 
    [&_svg:not([class*='size-'])]:size-4
    [&_svg:not([class*='text-'])]:text-tertiary-gray-default
  `,
  {
    variants: {
      mode: {
        light: `
          bg-bgc-secondary-gray-default
          border-border-secondary-gray-default
          text-tertiary-gray-default
          focus-visible:border-tertiary-gray-hover
          data-[state=open]:border-tertiary-gray-hover
          *:data-[slot=select-value]:text-quarterary-gray-default
        `,
        dark: `
          bg-bgc-secondary-black-default
          border-border-tertiary-black-default
          text-tertiary-gray-default
          focus-visible:border-tertiary-gray-default
          data-[state=open]:border-tertiary-gray-default
          *:data-[slot=select-value]:text-primary-gray-default
        `,
      }
    },
    defaultVariants: {  
      mode: "dark",
    },
  }
)

const selectContentVariants = cva(
  `
    tm-select-content
    
    data-[state=open]:animate-in 
    data-[state=closed]:animate-out 
    data-[state=closed]:fade-out-0 
    data-[state=open]:fade-in-0 
    data-[state=closed]:zoom-out-95 
    data-[state=open]:zoom-in-95 
    data-[side=bottom]:slide-in-from-top-2 
    data-[side=left]:slide-in-from-right-2 
    data-[side=right]:slide-in-from-left-2 
    data-[side=top]:slide-in-from-bottom-2 

    relative z-50 
    max-h-(--radix-select-content-available-height) min-w-32
    origin-(--radix-select-content-transform-origin) 
    overflow-x-hidden overflow-y-auto 
    rounded-sm border shadow-md
  `,
  {
    variants: {
      mode: {
        light: `
          bg-bgc-secondary-gray-default
          border-tertiary-gray-default
          text-tertiary-gray-default
          
        `,
        dark: `
        bg-bgc-tertiary-black-default
        border-border-tertiary-black-default
        text-secondary-gray-default
        `,
      }
    },
    defaultVariants: {
      mode: "dark"
    }
  }
)

const selectItemVariants = cva(
  `
    tm-select-item

    relative 
    flex items-center gap-2
    w-full rounded-sm py-1.5 pr-8 pl-2
    cursor-default  text-sm outline-hidden 
    select-none 
    data-disabled:pointer-events-none 
    data-disabled:opacity-50 
    
    [&_svg]:pointer-events-none 
    [&_svg]:shrink-0 
    [&_svg:not([class*='size-'])]:size-4 
    [&_svg:not([class*='text-'])]:text-muted-foreground 

    *:[span]:last:flex 
    *:[span]:last:items-center 
    *:[span]:last:gap-2
  `,
  {
    variants: {
      mode: {
        light: `
        focus:text-quarterary-gray-default
        data-[state=checked]:text-quarterary-gray-default
        data-[state=checked]:[&_svg:not([class*='text-'])]:text-quarterary-gray-default
        `,
        dark: `
        focus:text-primary-gray-default
        data-[state=checked]:text-primary-gray-default
        data-[state=checked]:[&_svg:not([class*='text-'])]:text-primary-gray-default
        `,
      }
    },
    defaultVariants: {
      mode: "dark"
    }
  }
)



interface SelectContext {
  mode?: "light" | "dark";
}

const SelectContext = React.createContext<SelectContext>({
  mode: "dark",
})

export type SelectProps = React.ComponentProps<typeof SelectPrimitive.Root> & SelectContext;

function Select({
  mode = "dark",
  ...props
}: SelectProps) {
  return (
    <SelectContext.Provider value={{ mode }}>
      <SelectPrimitive.Root data-slot="select" {...props} />
    </SelectContext.Provider>
  )
}

function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: "sm" | "default"
}) {
  const { mode } = React.useContext(SelectContext);

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(selectTriggerVariants({ mode }), className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="size-4 opacity-50 transition-transform duration-200" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}

function SelectContent({
  className,
  children,
  position = "item-aligned",
  align = "center",
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  const { mode } = React.useContext(SelectContext);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          selectContentVariants({ mode }),
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            "tm-select-viewport p-1",
            position === "popper" &&
              "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1"
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn("text-muted-foreground px-2 py-1.5 text-xs", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  const { mode } = React.useContext(SelectContext);

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(selectItemVariants({ mode }), className)}
      {...props}
    >
      <span
        data-slot="select-item-indicator"
        className="tm-select-item-indicator absolute right-2 flex size-3.5 items-center justify-center"
      >
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="size-4"  />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn("tm-select-separator bg-border pointer-events-none -mx-1 my-1 h-px", className)}
      {...props}
    />
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        "tm-select-scroll-up-button flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        "tm-select-scroll-down-button flex cursor-default items-center justify-center py-1",
        className
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
