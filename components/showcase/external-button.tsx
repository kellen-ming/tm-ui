"use client";

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ExternalResource } from "./types";

interface ExternalButtonProps extends ExternalResource {
  className?: string;
  variant?: "default" | "primary";
}

/**
 * 外部资源链接按钮组件
 * @param title - 按钮标题
 * @param url - 外部链接 URL
 * @param className - 自定义样式类
 * @param variant - 按钮变体样式
 */
export default function ExternalButton({
  title,
  url,
  className,
  variant = "default",
}: ExternalButtonProps) {
  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200",
        {
          "bg-[#f3f4f6] text-gray-700 hover:bg-[#e8eaef] dark:bg-gray-800 dark:text-[#d1d5dc] dark:hover:bg-gray-700":
            variant === "default",
          "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30":
            variant === "primary",
        },
        className
      )}
      aria-label={`打开外部链接: ${title}`}
    >
      {title}
      <ExternalLink className="h-3 w-3 shrink-0" aria-hidden="true" />
    </Link>
  );
}
