# TM-UI 开发交接（2026-04-10）

这份文档用于在换电脑或中断开发后，快速恢复当前上下文。

## 当前项目状态

### 已完成

- 已接入 `Fumadocs + Next.js App Router`
- docs 信息架构已收敛为：
  - `/docs`
  - `/docs/components/button`
  - `/docs/components/card`
- 组件库首页已改为“组件库介绍”而不是 Fumadocs 教学页
- `Button` 文档已升级为正式模板
- `Button` 的示例已改为 **直接内联在 MDX 中**
- docs 页面的标题层级已规范，`Preview / Code` 使用辅助标签而不是抢占标题层级
- 之前调研阶段生成的无关文稿已清理

### 当前未完成

- `Card` 文档还是占位内容
- 搜索功能尚未接入
- AI Search 还停留在方案讨论阶段
- 更多基础组件文档尚未开始迁移

## 当前 docs 结构

```text
app/
  docs/
    [[...slug]]/page.tsx
    layout.tsx

content/docs/
  index.mdx
  meta.json
  components/
    button.mdx
    card.mdx
    meta.json

lib/
  source.ts

source.config.ts
mdx-components.tsx
```

## 关键文件说明

- [source.config.ts](/Users/channelwill-kellen/study_code/tm-ui/source.config.ts)
  定义 Fumadocs 内容源，当前扫描 `content/docs`

- [lib/source.ts](/Users/channelwill-kellen/study_code/tm-ui/lib/source.ts)
  使用 `.source/server` 导出的 `docs`，通过 `loader()` 生成运行时 source

- [app/docs/layout.tsx](/Users/channelwill-kellen/study_code/tm-ui/app/docs/layout.tsx)
  docs 布局壳子，负责侧边栏和导航

- [app/docs/[[...slug]]/page.tsx](/Users/channelwill-kellen/study_code/tm-ui/app/docs/[[...slug]]/page.tsx)
  渲染 docs 页面，当前 TOC 使用 `clerk` 风格

- [content/docs/index.mdx](/Users/channelwill-kellen/study_code/tm-ui/content/docs/index.mdx)
  组件库首页

- [content/docs/components/button.mdx](/Users/channelwill-kellen/study_code/tm-ui/content/docs/components/button.mdx)
  当前最完整的组件文档模板，后续可以作为其它组件页面的复制基准

- [app/globals.css](/Users/channelwill-kellen/study_code/tm-ui/app/globals.css)
  当前包含 docs 标题层级样式和 `docs-example-*` 相关样式

## Button 文档的当前约定

当前 `Button` 文档采用：

- 示例直接写在 MDX 里
- 结构参考 shadcn 文档节奏：
  - `Installation`
  - `Usage`
  - `Examples`
  - `API Reference`
  - `Notes`
- 示例展示采用：
  - 上方 `Preview`
  - 下方代码块
- 不再单独维护 `examples/button/*`

如果后续要继续补其它组件，建议复用这套方式，避免引入额外示例目录。

## 下一步开发优先级

### P0

1. 补齐 [content/docs/components/card.mdx](/Users/channelwill-kellen/study_code/tm-ui/content/docs/components/card.mdx)
2. 选定下一个基础组件文档目标：`Input` 或 `Select`
3. 统一更多组件文档的章节结构

### P1

1. 接入 Fumadocs 内建搜索
2. 新增 `/app/api/search/route.ts`
3. 基于 `source` 构建搜索索引
4. 处理中文搜索 tokenizer

### P2

1. 评估 AI Search / semantic search
2. 对比官方推荐方案：
   - 内建搜索（Orama）
   - Mixedbread
   - Trieve
3. 决定是否把搜索升级为语义检索或问答式入口

## 搜索接入建议

当前最稳的顺序是：

1. 先接 **Fumadocs 内建搜索**
2. 跑通关键词搜索和组件页召回
3. 补 tag / 分类过滤
4. 最后再评估 AI Search

原因：

- 现阶段文档内容量还不大
- 先把基础搜索跑通，能更快验证内容结构是否合理
- AI Search 更依赖稳定的文档内容和索引策略

## 验证命令

本地继续开发时，优先用这些命令：

```bash
pnpm lint
pnpm exec next build --webpack
```

说明：

- 当前环境里 `pnpm exec next build --webpack` 已验证通过
- 默认 `pnpm build` 在之前的沙箱环境里遇到过 Turbopack 相关环境问题
- 如果你换电脑后本地环境正常，可以再直接试一次 `pnpm build`

## 当前遗留 warning

这两个 warning 是仓库里原本就存在的，还没处理：

- [app/page.tsx](/Users/channelwill-kellen/study_code/tm-ui/app/page.tsx#L11)
  `FormValidationExample` 未使用

- [components/showcase/props-controls.tsx](/Users/channelwill-kellen/study_code/tm-ui/components/showcase/props-controls.tsx#L49)
  `propKey` 未使用

## 一句话接手建议

换电脑后直接从 [content/docs/components/card.mdx](/Users/channelwill-kellen/study_code/tm-ui/content/docs/components/card.mdx) 开始，按 `Button` 的 MDX 结构补齐；补完后再开始接 `/api/search`。
