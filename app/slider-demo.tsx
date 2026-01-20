"use client"

import { cn } from "@/lib/utils"
import { Slider } from "@/components/ui/slider"

type SliderProps = React.ComponentProps<typeof Slider>

export function SliderDemo({ className, ...props }: SliderProps) {
  return (
    <div className="space-y-8 p-8">
      <div className="space-y-2">
        <h3 className="text-sm font-medium">单 Thumb - 带 Tooltip</h3>
        <Slider
          defaultValue={[50]}
          showTooltip
          onValueChange={(value) => {
            console.log("Single thumb value:", value)
          }}
          max={100}
          step={1}
          className={cn("w-[60%]", className)}
          {...props}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">单 Thumb - 自定义格式化（百分比）</h3>
        <Slider
          defaultValue={[30]}
          showTooltip
          formatTooltip={(val) => `${val}%`}
          max={100}
          step={5}
          className={cn("w-[60%]", className)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">双 Thumb - 范围选择</h3>
        <Slider
          defaultValue={[20, 80]}
          showTooltip
          onValueChange={(value) => {
            console.log("Range value:", value)
          }}
          max={100}
          step={1}
          className={cn("w-[60%]", className)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">双 Thumb - 自定义格式化（价格）</h3>
        <Slider
          defaultValue={[100, 500]}
          showTooltip
          formatTooltip={(val) => `$${val}`}
          min={0}
          max={1000}
          step={10}
          className={cn("w-[60%]", className)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">无 Tooltip（默认）</h3>
        <Slider
          defaultValue={[50]}
          onValueChange={(value) => {
            console.log("No tooltip value:", value)
          }}
          max={100}
          step={10}
          className={cn("w-[60%]", className)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium">受控模式 - 带 Tooltip</h3>
        <ControlledSlider className={cn("w-[60%]", className)} />
      </div>
    </div>
  )
}

function ControlledSlider({ className }: { className?: string }) {
  const [value, setValue] = React.useState([25])

  return (
    <div className="space-y-2">
      <p className="text-xs text-gray-400">当前值: {value[0]}</p>
      <Slider
        value={value}
        onValueChange={setValue}
        showTooltip
        formatTooltip={(val) => `${val}°C`}
        min={0}
        max={100}
        step={1}
        className={className}
      />
    </div>
  )
}

import * as React from "react"
