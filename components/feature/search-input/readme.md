# SearchInput 搜索框

基于 `@/components/ui/input-group` 封装的搜索输入框：左侧固定搜索图标 + 输入框，透传 Input 的 props（含 `clearable`、`mode` 等），适合搜索、筛选等场景。

## 使用方式

```tsx
import { SearchInput } from "@/components/feature/search-input";
```

## 基础用法

```tsx
<SearchInput placeholder="Search" />
<SearchInput placeholder="搜索…" mode="light" />
```

## 可清除

与 Input 一致，支持 `clearable`（需配合受控或非受控 value）：

```tsx
<SearchInput placeholder="Search" clearable />
<SearchInput placeholder="Search" clearable={false} />
```

## 常用 props

| 说明     | 类型 / 示例 |
|----------|-------------|
| 占位文案 | `placeholder?: string`，默认 `"Search"` |
| 主题     | `mode?: "light" \| "dark"`，默认 `"dark"` |
| 可清除   | `clearable?: boolean` |
| 禁用     | `disabled?: boolean` |

其他原生 input 及 Input 的 props（如 `value`、`onChange`、`className` 等）会透传给底层 Input。
