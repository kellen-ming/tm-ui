"use client"

import * as React from "react"
import { cva } from "class-variance-authority"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.ComponentProps<"input"> {
  /** 主题模式，默认dark */
  mode?: "light" | "dark"
  /** 是否可清除 */
  clearable?: boolean
}

const inputVariants = cva(
  `
    tm-input
  placeholder:text-tertiary-gray-default
    file:text-foreground file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium
    disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50
    selection:bg-primary selection:text-primary-foreground  
    text-base transition-[color,border] outline-none 
    px-3 py-2 h-11 w-full min-w-0 rounded-sm 
    border
    aria-invalid:border-destructive
    `,
  {
    variants: {
      mode: {
        light: `
        text-quarterary-gray-default 
        bg-bgc-secondary-gray-default
        border-border-secondary-gray-default
        focus-visible:border-border-tertiary-black-default
        selection:text-primary-gray-default selection:bg-bgc-primary-black-default
        `,
        dark: `
        text-primary-gray-default 
        border-border-tertiary-black-default
        bg-bgc-secondary-black-default
        focus-visible:border-border-tertiary-black-hover
        selection:text-quarterary-gray-default selection:bg-bgc-secondary-gray-default
        `,
      },
    },
    defaultVariants: {
      mode: "dark",
    },
  }
)

function ClearButton(props: { onClick: () => void, mode: "light" | "dark" }) {
  const { mode, onClick } = props

  return (
    <button
      type="button"
      aria-label="Clear"
      onClick={onClick}
      className={cn(
        "hover:text-foreground absolute right-2 top-1/2 -translate-y-1/2 rounded-sm p-1 outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-4",
        mode === "light" ? "text-quarterary-gray-default hover:text-quarterary-gray-default/50" : "text-primary-gray-default hover:text-primary-gray-default/50"
      )} 
    >
      <X />
    </button>
  )
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref
) {
  const {
    mode = "dark",
    className,
    type,
    clearable = false,
    value,
    defaultValue,
    onChange,
    disabled,
    name,
    ...rest
  } = props

  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const setRef = React.useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el
      if (typeof ref === "function") {
        ref(el)
      } else if (ref) {
        ref.current = el
      }
    },
    [ref]
  )

  const isControlled = value !== undefined
  const controlledHasValue =
    value != null ? String(value).length > 0 : false
  const [uncontrolledHasValue, setUncontrolledHasValue] = React.useState(
    () => (defaultValue != null ? String(defaultValue).length > 0 : false)
  )
  const hasValue = isControlled ? controlledHasValue : uncontrolledHasValue

  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled && clearable) {
        setUncontrolledHasValue((e.target.value?.length ?? 0) > 0)
      }
      onChange?.(e)
    },
    [onChange, isControlled, clearable]
  )

  const handleClear = React.useCallback(() => {
    if (disabled) return
    if (isControlled) {
      const synthetic = {
        target: { value: "", name },
      } as React.ChangeEvent<HTMLInputElement>
      onChange?.(synthetic)
      return
    }
    const el = inputRef.current
    if (el) {
      el.value = ""
      el.dispatchEvent(new Event("input", { bubbles: true }))
      setUncontrolledHasValue(false)
    }
  }, [disabled, isControlled, onChange, name])

  const showClearButton =
    clearable && hasValue && !disabled ? (
      <ClearButton onClick={handleClear} mode={mode} />
    ) : null

  const inputEl = (
    <input
      ref={setRef}
      type={type}
      data-slot="input"
      value={value}
      defaultValue={defaultValue}
      onChange={handleChange}
      disabled={disabled}
      name={name}
      className={cn(
        inputVariants({ mode }),
        clearable ? "pr-9" : "",
        className
      )}
      {...rest}
    />
  )

  if (!clearable) {
    return inputEl
  }

  return (
    <div className="tm-input-container relative flex w-full items-center">
      {inputEl}
      {showClearButton}
    </div>
  )
})

Input.displayName = "Input"

export { Input }
