"use client";

import type { ExternalResource } from "./types";
import ExternalButton from "./external-button";

interface ExternalResourcesProps {
  moreExamples?: ExternalResource;
  moreApiReferences?: ExternalResource;
  title?: string;
  className?: string;
}

/**
 * 外部资源区域组件
 * 用于展示组件的更多示例和 API 文档链接
 * @param moreExamples - 更多示例链接
 * @param moreApiReferences - API 文档链接
 * @param title - 自定义标题（默认为 "External Resources"）
 * @param className - 自定义容器样式
 */
export default function ExternalResources({
  moreExamples,
  moreApiReferences,
  title = "External Resources",
  className,
}: ExternalResourcesProps) {
  // 如果没有任何资源，不渲染组件
  if (!moreExamples && !moreApiReferences) {
    return null;
  }

  return (
    <div
      className={`flex flex-wrap items-center gap-2 border-b border-[#e5e5e5] bg-white px-6 py-3 dark:border-gray-600 dark:bg-gray-950 ${
        className || ""
      }`}
    >
      <span className="shrink-0 text-xs font-medium text-gray-600 dark:text-[#99a1af]">
        {title}:
      </span>
      <div className="flex flex-wrap gap-2">
        {moreExamples && <ExternalButton {...moreExamples} />}
        {moreApiReferences && <ExternalButton {...moreApiReferences} />}
      </div>
    </div>
  );
}
