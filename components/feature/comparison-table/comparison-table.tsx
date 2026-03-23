"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";

import { cn } from "@/lib/utils";
import { ClassValue } from "class-variance-authority/types";

/** 列定义 */
export type ComparisonColumn = {
  /** 列唯一标识，用于映射单元格数据 */
  key: string;
  /** 表头内容，支持文本、logo 等 */
  header: React.ReactNode;
  /** 列宽度 */
  width?: number | string;
  /** 对齐方式 */
  align?: "left" | "center" | "right";
};

/** 单元格内容类型 */
export type CellContent =
  | { type: "text"; value: string }
  | { type: "check"; checked?: boolean; color?: string }
  | { type: "link"; text: string; href: string }
  | { type: "copy"; value: string }
  | { type: "custom"; render: () => React.ReactNode };

/** 数据行 */
export type ComparisonRow = {
  /** 行标签（最左侧列） */
  label: React.ReactNode;
  /** 各列单元格内容，key 对应 ComparisonColumn.key */
  cells: Record<string, CellContent>;
  /** 可选行 className */
  rowClassName?: ClassValue;
};

/** 分组 */
export type ComparisonGroup = {
  /** 分组标题 */
  title: React.ReactNode;
  /** 分组内的数据行 */
  rows: ComparisonRow[];
  /** 分组标题 className */
  titleClassName?: ClassValue;
};

/** ComparisonTable 组件属性 */
export type ComparisonTableProps = {
  /** 边框颜色 */
  borderColor?: React.CSSProperties["borderColor"];
  /** 列配置 */
  columns: ComparisonColumn[];
  /** 分组数据 */
  groups: ComparisonGroup[];
  /** 表头是否 sticky，默认 true */
  stickyHeader?: boolean;
  /** 表头偏移量 */
  stickyHeaderOffset?: number | string;
  /** 标签列表头文字 */
  labelHeader?: React.ReactNode;
  /** 标签列宽度 */
  labelWidth?: number | string;
  /** 容器 className */
  className?: string;
  /** table className */
  tableClassName?: string;
  /** table header className */
  tableHeaderClassName?: string;
};

/** 复制按钮 */
function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [value]);

  return (
    <button
      type='button'
      onClick={handleCopy}
      className='inline-flex items-center gap-1.5 text-sm hover:opacity-80 transition-opacity'>
      <span className='font-mono'>{value}</span>
      {copied ? <Check size={24} color='#FFFFFF' /> : <Copy size={24} color='#FFFFFF' />}
    </button>
  );
}

/** 渲染单元格内容 */
function renderCellContent(content: CellContent | undefined): React.ReactNode {
  if (!content) return null;

  switch (content.type) {
    case "text": return content.value;

    case "check": {
      const checkColor = content.color ?? (content.checked !== false ? "#7A5AF8" : "#FFFFFF");
      return <Check size={24} color={checkColor} className="inline-block align-middle" />;
    }

    case "link":
      return (
        <a href={content.href} className='text-blue-400 hover:underline' target='_blank' rel='noopener noreferrer'>
          {content.text}
        </a>
      );

    case "copy":
      return (
        <span className='inline-block'>
          <CopyButton value={content.value} />
        </span>
      );

    case "custom":
      return content.render();

    default:
      return null;
  }
}

/**
 * 对比表格：通过 schema 配置列和分组数据，支持 sticky 表头、分组标题行、多种单元格内容类型。
 */
export function ComparisonTable({
  columns,
  groups,
  stickyHeader,
  stickyHeaderOffset = 0,
  borderColor = "#232a40",
  labelHeader,
  labelWidth,
  className,
  tableClassName,
  tableHeaderClassName,
}: ComparisonTableProps) {
  const totalColumns = columns.length + 1;
  const equalWidthPercent = labelWidth == null ? `${100 / totalColumns}%` : undefined;

  // 自定义样式变量
  const containerStyle: React.CSSProperties = {
    ["--comparison-table-border" as string]: borderColor,
    ["--sticky-header-offset" as string]:
      typeof stickyHeaderOffset === "number" ? `${stickyHeaderOffset}px` : stickyHeaderOffset,
  };

  return (
    <div
      data-slot='comparison-table-container'
      style={containerStyle}
      className={cn(
        "relative w-full h-full overflow-clip",
        // stickyHeader && "max-h-[80vh]",
        borderColor && "border border-(--comparison-table-border)",
        className,
      )}>
      <table
        data-slot='comparison-table'
        className={cn(
          "w-full caption-bottom text-sm border-collapse bg-inherit",
          equalWidthPercent && "table-fixed",
          borderColor && "border-(--comparison-table-border) [&_tr]:border-(--comparison-table-border)",
          tableClassName,
        )}>
        <thead
          data-slot='comparison-table-header'
          className={cn(
            "[&_tr]:border-b border-inherit z-10 bg-inherit",
            stickyHeader && "shadow-[0_1px_0_0_var(--comparison-table-border)]",
            stickyHeader && "sticky top-(--sticky-header-offset)",
            tableHeaderClassName,
          )}>
          <tr>
            <th
              className='min-h-6 py-3xl text-center align-middle font-semibold'
              style={{ width: labelWidth ?? equalWidthPercent }}>
              {labelHeader}
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                className={cn(
                  "xs:px-3 md:px-6 py-3xl align-middle font-medium",
                  col.align === "center" && "text-center",
                  col.align === "right" && "text-right",
                )}
                style={{ width: col.width ?? equalWidthPercent }}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody data-slot='comparison-table-body' className='[&_tr:last-child]:border-0'>
          {groups.map((group, groupIndex) => (
            <React.Fragment key={groupIndex}>
              {/* 分组标题行 */}
              <tr data-slot='comparison-table-group-title' className='border-b'>
                <td colSpan={totalColumns} className={cn('xs:px-3 md:px-6 py-3 font-semibold', group.titleClassName)}>
                  {group.title}
                </td>
              </tr>
              {/* 分组内的数据行 */}
              {group.rows.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={cn("border-b border-inherit transition-colors", row.rowClassName)}>
                  <td className='py-3 xs:px-3 md:px-6 '>{row.label}</td>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={cn(
                        "py-3 xs:px-3 md:px-6",
                        col.align === "center" && "text-center",
                        col.align === "right" && "text-right",
                      )}>
                      {renderCellContent(row.cells[col.key])}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
