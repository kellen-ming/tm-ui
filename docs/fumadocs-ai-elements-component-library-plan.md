# TM-UI 组件库站点方案

更新时间：2026-03-23

## 背景

当前仓库已经具备一个可运行的组件展示站雏形：

- 技术栈是 `Next.js 16 + React 19 + TypeScript + Tailwind CSS 4`
- 已有一批 `components/ui/*` 组件
- 已有 `showcase-config` 驱动的组件展示、Props 调节、代码片段生成能力
- 当前首页更像一个“组件 demo/showcase 页面”，还不是完整的“组件库文档站”

目标是把它逐步演进成一个更完整的组件库网站，具备：

- 文档结构清晰
- 每个组件有独立文档页
- 支持搜索
- 支持交互式预览
- 后续可加入 AI 助手帮助用户查文档、解释组件 API、生成使用示例

## 推荐组合是否合适

推荐组合：

- `Fumadocs`
- `Vercel AI Elements / Chatbot`
- `Next.js`
- `shadcn/ui`
- `motion`

结论：这套组合是合适的，但不建议一次性全部重构接入，最好按阶段推进。

建议定位如下：

- `Next.js`：承载整个站点的路由、渲染和 API
- `Fumadocs`：负责文档站框架、MDX 内容层、侧边栏、面包屑、搜索体系
- `shadcn/ui`：负责基础 UI 外壳和通用交互组件
- `motion`：负责少量高质量动效，用于增强体验
- `AI Elements + AI SDK`：负责第二阶段的 AI 文档助手，而不是第一阶段核心能力

## 为什么不建议一上来先做 Chatbot

如果在文档内容、组件元数据、信息架构还没整理好之前就接入聊天助手，会有几个问题：

- AI 没有稳定的数据来源，回答容易空泛
- 文档站结构尚未成形，用户问题无法被很好地映射到组件页面
- 工程复杂度会明显升高，包括模型调用、上下文构造、权限与成本控制
- 前期投入大，但对组件库“基础可用性”的提升不如文档和搜索直接

所以更合理的顺序是：

1. 先完成 docs 站点骨架
2. 再完成内容组织和搜索
3. 最后接入 AI 聊天助手

## 当前项目的优势

现有项目已经有非常好的迁移基础，尤其是下面这几个点：

- `app/page.tsx` 已经有组件展示首页
- `lib/showcase-config.tsx` 已经有组件元数据和默认值配置
- `components/showcase/*` 已经有预览卡片、Props 控制、代码展示
- `components.json` 已经存在，说明项目已具备 `shadcn/ui` 基础配置

这意味着我们并不是从零开始，而是已经有了：

- 组件源码
- demo 预览能力
- props 调节能力
- 代码生成能力

缺的是：

- 文档层
- 结构化导航
- 搜索
- 每个组件的独立页面
- 后续 AI 助手接入点

## 核心判断

### 1. Fumadocs 不替代你现有的展示系统

它更适合作为“文档框架层”，而不是把现有组件展示逻辑全部推翻重写。

更好的方式是：

- `Fumadocs` 管内容、路由、导航、搜索
- 你现有的 `showcase-config` 和 preview 逻辑管交互式 demo

换句话说，二者是组合关系，不是替代关系。

### 2. 现有配置需要拆成“文档数据”和“运行时 demo”

现在的 `ShowcaseComponent` 同时包含：

- 文档信息
- props 控制配置
- React 组件函数
- 动态代码生成逻辑

这对当前首页很好用，但对文档站来说需要拆层。

建议拆成两部分：

#### A. serializable registry

只放可序列化的内容，比如：

- `id`
- `title`
- `description`
- `category`
- `tags`
- `props schema`
- `default values`
- `examples`
- `installation`

这部分给文档、搜索、目录和 AI 检索使用。

#### B. runtime demo map

只放真正运行 demo 需要的内容，比如：

- React demo 组件
- 动态 props 控件
- 代码生成器

这部分由页面或 MDX 组件按 `componentId` 动态映射加载。

## 推荐的落地顺序

### 阶段 1：搭建文档站骨架

目标：不破坏现有首页，新增 `/docs`

工作内容：

- 接入 `Fumadocs`
- 配置 `content/docs`
- 新建 `lib/source.ts`
- 新增 `app/docs/[[...slug]]/page.tsx`
- 先保留首页 `app/page.tsx` 作为展示入口

阶段成果：

- 有一个可访问的 docs 站点
- 首页和 docs 并存
- 后续迁移不会打断现有开发

### 阶段 2：迁移一个组件作为样板

目标：先把一个组件跑通完整链路，推荐从 `Button` 开始

工作内容：

- 新建 `content/docs/components/button.mdx`
- 创建文档页结构
- 在 MDX 中嵌入 live preview
- 展示 props 表格
- 展示代码片段

阶段成果：

- 获得“组件文档页最终形态”的第一个样板
- 后续组件可按同一模板迁移

### 阶段 3：抽离组件注册表

目标：让组件信息真正可复用

工作内容：

- 把 `lib/showcase-config.tsx` 拆成：
  - `lib/component-registry.ts`
  - `lib/component-demos.tsx`
- 抽出统一类型定义
- 让首页展示页和 docs 页都消费同一份元数据

阶段成果：

- 首页和 docs 共用一套组件元数据
- 后续搜索、AI、导航都更容易接入

### 阶段 4：接入搜索

目标：让文档和组件可检索

优先方案：

- 使用 `Fumadocs` 内置 `Orama Search`

原因：

- 官方推荐
- 自托管简单
- 对中小型组件库足够
- 与 docs 内容层耦合自然

注意：

- 如果文档主体是中文，需要从一开始就考虑中文 tokenizer 配置

阶段成果：

- 支持组件名、文档标题、说明文本搜索

### 阶段 5：全局主题与视觉整合

目标：解决当前主题逻辑只存在于首页的问题

工作内容：

- 用 `next-themes` 统一 light/dark
- 根布局接入 theme provider
- 让首页、docs、后续 chat 页面共享主题状态

阶段成果：

- 避免主题状态割裂
- 为 docs 和 chat 的统一体验打基础

### 阶段 6：接入 AI 文档助手

目标：做一个真正有用的 AI 助手，而不是花哨但不可靠的聊天框

推荐形式：

- 独立页面 `/chat`
- 或 docs 页面右下角 assistant

技术建议：

- `AI SDK` 负责消息流和 Route Handler
- `AI Elements` 负责 Chat UI 组件
- 数据来源基于：
  - 组件注册表
  - MDX 文档内容
  - 示例代码
  - 组件 props 定义

AI 助手适合做的事：

- 回答“这个组件怎么用”
- 根据需求推荐组件
- 解释 props 含义
- 生成组件用法示例
- 引导跳转到对应文档页

不建议一开始就做的事：

- 任意开放式长上下文聊天
- 没有文档 grounding 的通用 AI 问答

## motion 的建议使用方式

`motion` 很适合这个项目，但建议控制范围，避免喧宾夺主。

推荐使用场景：

- 首页 hero 或卡片的进入动画
- docs 导航切换和页面渐入
- demo 区块切换时的轻量过渡
- 搜索框或 AI assistant 打开/关闭的反馈

不建议：

- 给整站所有组件都加大面积动画
- 为了“炫”而损害阅读节奏

原则：

- 内容优先
- 动效服务于信息层次
- 保持轻量、清晰、可关闭

## 建议的目录结构

```text
app/
  page.tsx
  docs/[[...slug]]/page.tsx
  api/search/route.ts
  api/chat/route.ts

content/docs/
  index.mdx
  components/button.mdx
  components/card.mdx

components/docs/
  live-preview.tsx
  props-table.tsx
  component-demo.tsx
  docs-theme-toggle.tsx

lib/
  source.ts
  component-registry.ts
  component-demos.tsx
```

## 第一阶段建议直接做什么

如果下一次继续开发，我建议优先做下面这组最小闭环：

1. 接入 `Fumadocs`
2. 新建 `/docs`
3. 新建 `content/docs`
4. 把 `Button` 组件迁成第一篇组件文档
5. 把现有 preview 能力嵌入 docs 页面

这样做的好处是：

- 成本低
- 风险低
- 很快能看到未来站点形态
- 后续迁移有明确模板

## 我建议的实施策略

### 方案 A：渐进式改造（推荐）

特点：

- 保留现有首页
- 新增 docs
- 逐个组件迁移
- AI 功能后置

优点：

- 稳
- 可回退
- 中间产物随时可用

适合当前项目阶段。

### 方案 B：一次性重构成完整 docs + chat 站

特点：

- 一次性改首页、文档、搜索、主题、聊天

缺点：

- 工程量大
- 风险高
- 很容易在细节里卡住

不建议当前阶段使用。

## 下次接手时的执行清单

下次继续时，可以按这个顺序推进：

1. 安装并接入 `Fumadocs`
2. 调整 `next.config` 以适配 MDX 接入方式
3. 建立 `content/docs` 和 `lib/source.ts`
4. 创建 docs 路由
5. 迁移 `Button` 作为首个组件文档页
6. 抽离可复用的 `component-registry`
7. 接入搜索
8. 接入统一主题
9. 最后实现 AI assistant

## 一句话总结

推荐这条技术路线，但要分阶段做。

对 `tm-ui` 来说，最优解不是“立刻做一个带聊天的炫酷组件库站”，而是先把它稳稳升级成：

“有文档结构、有独立组件页、有搜索、可嵌入交互 demo”的组件库网站，

然后再接入 `AI Elements` 做真正有依据的文档助手。
