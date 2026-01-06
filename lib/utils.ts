import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 生成组件 props 字符串的工具函数
 * @param props - 当前 props 值
 * @param defaultValues - 默认值对象
 * @param excludeKeys - 需要排除的 key 数组
 * @returns props 字符串，如 'gap="sm" justify="center"'
 */
export function generatePropsStr<T extends Record<string, any>>(
  props: T,
  defaultValues: T,
  excludeKeys: (keyof T)[] = []
): string {
  // 过滤掉需要排除的属性和默认值
  const filteredEntries = Object.entries(props).filter(([key, value]) => {
    if (excludeKeys.includes(key as keyof T)) {
      return false;
    }
    return value !== defaultValues[key];
  });

  // 将每个属性转换为字符串格式
  const propStrings = filteredEntries.map(([key, value]) => {
    if (typeof value === "string") {
      return `${key}="${value}"`;
    }
    if (typeof value === "boolean") {
      // boolean 类型：true 时只显示 key，false 时显示 key={false}
      return value ? key : `${key}={false}`;
    }
    if (typeof value === "number") {
      return `${key}={${value}}`;
    }
    // 对象、数组等复杂类型使用 JSON.stringify
    return `${key}={${JSON.stringify(value)}}`;
  });

  // 过滤掉空字符串（如 boolean false 的情况）
  const validPropStrings = propStrings.filter(Boolean);

  // 用空格连接所有属性字符串
  return validPropStrings.join(" ");
}
