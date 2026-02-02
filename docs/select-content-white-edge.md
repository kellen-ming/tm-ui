# Select 下拉右侧白边问题

## 现象

Select 组件打开（或聚焦）时，下拉内容区域 **右侧（滚动条位置）出现一条明显的白边**，在深色主题下尤其明显。

## 原因

- `SelectContent` 使用了 `overflow-y-auto`（见 `components/ui/select.tsx` 中 SelectContent 的 className），内容超出时会出现垂直滚动条。
- 浏览器**默认滚动条**的轨道（track）多为浅色；下拉使用 `bg-popover`（深色主题下为深色背景），右侧就会露出默认的浅色滚动条轨道，视觉上呈现为「一条白边」。
- 白边来自**浏览器默认滚动条样式**，而非组件自身的 border 或 shadow。

## 解决方案（待实施）

让 SelectContent 的滚动条与下拉背景一致，避免白边：

1. **为 SelectContent 定制滚动条样式**
   - 在 `components/ui/select.tsx` 的 SelectContent 的 `className` 中，为带滚动条的区域增加与 `bg-popover` 一致的滚动条样式；或
   - 在 `app/globals.css` 中，通过 `[data-slot="select-content"]`（或为 SelectContent 增加稳定类名）编写：
     - `::-webkit-scrollbar` / `::-webkit-scrollbar-track` / `::-webkit-scrollbar-thumb`（WebKit）
     - `scrollbar-color`（Firefox）
   - 将**轨道**和**滑块**颜色设为与 `--popover`（或实际使用的 popover 背景）相近的深色，使右侧不再出现浅色轨道。

2. **可选：使用 Tailwind 滚动条插件**
   - 若项目已安装 scrollbar 相关插件，可为 SelectContent 使用如 `scrollbar-thin scrollbar-track-popover scrollbar-thumb-border` 等类，使轨道与 popover 背景一致。

## 相关文件

- `components/ui/select.tsx`：SelectContent 的 `overflow-y-auto` 及 className。
- `app/globals.css`：popover 变量（`--popover`）及可放置的滚动条全局样式。

## 状态

- **记录时间**：待补充
- **状态**：待处理
