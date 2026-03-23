# ComparisonTable 对比表格

基于 schema 配置的对比表格组件，支持 sticky 表头、分组行、多种单元格内容类型。

## 使用示例

```tsx
import { ComparisonTable } from "@/components/feature/comparison-table";

<ComparisonTable
  labelWidth={200}
  columns={[
    { key: "free", header: "Free", align: "center" },
    { key: "pro", header: "Pro", align: "center" },
  ]}
  groups={[
    {
      title: "功能对比",
      rows: [
        {
          label: "基础功能",
          cells: {
            free: { type: "check" },
            pro: { type: "check" },
          },
        },
        {
          label: "高级分析",
          cells: {
            free: { type: "check", checked: false },
            pro: { type: "check", color: "#7A5AF8" },
          },
        },
        {
          label: "某行需单独样式",
          rowClassName: "bg-muted/30",
          cells: { free: { type: "text", value: "—" }, pro: { type: "text", value: "✓" } },
        },
      ],
    },
  ]}
/>
```

## 单元格类型

| type     | 说明                   | 属性                          |
| -------- | ---------------------- | ----------------------------- |
| `text`   | 纯文本                 | `value: string`               |
| `check`  | 勾选/未勾选            | `checked?: boolean` (默认 true)、`color?: string`（图标颜色，如 `#7A5AF8`） |
| `link`   | 链接                   | `text: string`, `href: string` |
| `copy`   | 可复制文本             | `value: string`               |
| `custom` | 自定义渲染             | `render: () => ReactNode`     |

## Props

| 属性           | 类型                  | 默认值 | 说明               |
| -------------- | --------------------- | ------ | ------------------ |
| `columns`      | `ComparisonColumn[]`  | -      | 列配置             |
| `groups`       | `ComparisonGroup[]`   | -      | 分组数据           |
| `stickyHeader` | `boolean`             | `true` | 表头是否 sticky    |
| `labelHeader`  | `ReactNode`           | -      | 标签列表头         |
| `labelWidth`   | `number \| string`    | -      | 标签列宽度         |
| `className`    | `string`              | -      | 容器 className     |
| `tableClassName` | `string`            | -      | table className    |
