# SchemaSelect 简易选择器

基于 `@/components/ui/select` 封装的简易 Select：通过 `options` 配置选项，支持受控/非受控，适合表单或配置场景。命名为 schema-select 便于与「基于 schema 的配置/表单」统一；若仅作简易用法，也可理解为「选项式 Select」。

## 使用方式

```tsx
import { SchemaSelect } from "@/components/feature/schema-select";
```

## 非受控

不传 `value` / `open`，用 `defaultValue`、`defaultOpen` 和回调即可：

```tsx
<SchemaSelect
  options={[
    { value: "apple", label: "苹果" },
    { value: "banana", label: "香蕉", disabled: true },
    { value: "orange", label: "橙子" },
  ]}
  placeholder="选一个水果"
  defaultValue="apple"
  onValueChange={(v) => console.log("选中", v)}
/>
```

## 受控

同时传 `value` + `onValueChange`、或 `open` + `onOpenChange`：

```tsx
const [value, setValue] = useState("");
const [open, setOpen] = useState(false);

<SchemaSelect
  options={[{ value: "a", label: "A" }, { value: "b", label: "B" }]}
  value={value}
  onValueChange={setValue}
  open={open}
  onOpenChange={setOpen}
  placeholder="请选择…"
/>
```

## 常用 props

| 说明       | 类型 / 示例 |
|------------|-------------|
| 选项列表   | `options: { value, label, disabled? }[]` |
| 占位文案   | `placeholder?: ReactNode`，默认「请选择…」 |
| 默认选中值 | `defaultValue?: string`（非受控） |
| 当前选中值 | `value?: string`（受控需配合 `onValueChange`） |
| 主题       | `mode?: "light" \| "dark"`，默认 `"dark"` |
| 触发器尺寸 | `triggerSize?: "sm" \| "default"` |
| 下拉定位   | `contentPosition?: "item-aligned" \| "popper"`，默认 `"popper"` |

其他 Root 级 props（如 `disabled`、`name`、`required` 等）会透传给底层 Select。
