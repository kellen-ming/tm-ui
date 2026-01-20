"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SliderProps extends Omit<React.ComponentProps<typeof SliderPrimitive.Root>, "onValueChange"> {
  showTooltip?: boolean
  formatTooltip?: (value: number) => React.ReactNode
  onValueChange?: (value: number[]) => void
}

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  showTooltip = false,
  formatTooltip,
  onValueChange,
  ...props
}: SliderProps) {
  // 内部状态：受控/非受控
  const [internalValue, setInternalValue] = React.useState<number[]>(() => {
    if (Array.isArray(value)) return value
    if (Array.isArray(defaultValue)) return defaultValue
    return [min]
  })

  // 跟踪拖动状态
  const [isDragging, setIsDragging] = React.useState<boolean[]>([])
  const dragTimeoutRef = React.useRef<NodeJS.Timeout | undefined>(undefined)

  // 同步外部 value 变化
  React.useEffect(() => {
    if (Array.isArray(value)) {
      setInternalValue(value)
    }
  }, [value])

  // 计算当前值
  const currentValues = React.useMemo(
    () => (Array.isArray(value) ? value : internalValue),
    [value, internalValue]
  )

  // 处理值变化
  const handleValueChange = React.useCallback(
    (newValue: number[]) => {
      // 更新内部状态（非受控模式）
      if (!Array.isArray(value)) {
        setInternalValue(newValue)
      }

      // 标记所有 thumb 为拖动状态
      setIsDragging(Array(newValue.length).fill(true))

      // 调用外部回调
      onValueChange?.(newValue)

      // 延迟关闭 tooltip
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current)
      }
      dragTimeoutRef.current = setTimeout(() => {
        setIsDragging(Array(newValue.length).fill(false))
      }, 500)
    },
    [value, onValueChange]
  )

  // 清理定时器
  React.useEffect(() => {
    return () => {
      if (dragTimeoutRef.current) {
        clearTimeout(dragTimeoutRef.current)
      }
    }
  }, [])

  // 格式化显示值
  const getTooltipContent = React.useCallback(
    (val: number) => {
      return formatTooltip ? formatTooltip(val) : val
    },
    [formatTooltip]
  )

  return (
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <SliderPrimitive.Root
        data-slot="slider"
        defaultValue={defaultValue}
        value={value}
        min={min}
        max={max}
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track
          data-slot="slider-track"
          className={cn(
            "bg-bgc-primary-black-default relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
          )}
        >
          <SliderPrimitive.Range
            data-slot="slider-range"
            className={cn(
              "bg-bgc-primary-gray-default absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
            )}
          />
        </SliderPrimitive.Track>
        {currentValues.map((val, index) =>
          showTooltip ? (
            <Tooltip key={index} open={isDragging[index] || undefined}>
              <TooltipTrigger asChild>
                <SliderPrimitive.Thumb
                  data-slot="slider-thumb"
                  className={`
                    block
                    size-2
                    transition-[color,box-shadow]
                    ring-bgc-primary-gray-default  ring-4 shrink-0 rounded-full  bg-bgc-primary-black-default 
                    hover:bg-bgc-primary-brand-default focus-visible:bg-bgc-primary-brand-default focus-visible:outline-hidden 
                    disabled:pointer-events-none disabled:opacity-50
                  `}
                />
              </TooltipTrigger>
              <TooltipContent>{getTooltipContent(val)}</TooltipContent>
            </Tooltip>
          ) : (
            <SliderPrimitive.Thumb
              key={index}
              data-slot="slider-thumb"
              className={`
                block
                size-2
                transition-[color,box-shadow]
                ring-bgc-primary-gray-default  ring-4 shrink-0 rounded-full  bg-bgc-primary-black-default 
                hover:bg-bgc-primary-brand-default focus-visible:bg-bgc-primary-brand-default focus-visible:outline-hidden 
                disabled:pointer-events-none disabled:opacity-50
              `}
            />
          )
        )}
      </SliderPrimitive.Root>
    </TooltipProvider>
  )
}

export { Slider }
