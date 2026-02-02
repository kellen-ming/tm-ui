"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

/** 单个选项：value、展示 label、可选禁用 */
export type SchemaSelectOption = {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
};

/** 基于 options 的简易 Select 的 props，支持受控/非受控 */
export type SchemaSelectProps = Omit<
  React.ComponentProps<typeof Select>,
  "children"
> & {
  /** 选项列表，用于渲染 SelectItem */
  options: SchemaSelectOption[];
  /** 未选中的占位文案 */
  placeholder?: React.ReactNode;
  /** 触发器尺寸 */
  triggerSize?: "sm" | "default";
  /** 触发器 className */
  triggerClassName?: string;
  /** 下拉内容 className */
  contentClassName?: string;
  /** 下拉内容定位方式 */
  contentPosition?: "item-aligned" | "popper";
  /** 下拉内容对齐（position 为 popper 时生效） */
  contentAlign?: "start" | "center" | "end";
};

/**
 * 简易 Select：通过 options 配置选项，支持受控/非受控（value/open）。
 * 基于 @/components/ui/select 封装。
 */
export function SchemaSelect({
  options,
  placeholder = "请选择…",
  value,
  defaultValue,
  onValueChange,
  open,
  defaultOpen,
  onOpenChange,
  disabled,
  mode = "dark",
  triggerSize = "default",
  triggerClassName,
  contentClassName,
  contentPosition = "popper",
  contentAlign = "center",
  ...rootProps
}: SchemaSelectProps) {
  return (
    <Select
      mode={mode}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
      disabled={disabled}
      {...rootProps}
    >
      <SelectTrigger size={triggerSize} className={triggerClassName}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent
        position={contentPosition}
        align={contentAlign}
        className={contentClassName}
      >
        {options.map((opt) => (
          <SelectItem
            key={opt.value}
            value={opt.value}
            disabled={opt.disabled}
          >
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
