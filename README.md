# TM-UI

> 一个基于 Next.js 16 和 Tailwind CSS 4 的现代化 UI 组件库展示平台

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178c6?logo=typescript)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

## 📖 项目介绍

TM-UI 是一个**交互式 UI 组件展示系统**，旨在为 TM 官网项目构建自有组件库，逐步替代 Antd 组件。

### ✨ 核心特性

- 🎨 **多种主题支持** - 明暗主题无缝切换，支持自定义主题配置
- 🎛️ **实时属性控制** - 可视化调整组件属性，即时预览效果
- 📦 **预设样式库** - 提供常用组件配置的快捷预设，快速应用常见样式
- 💻 **代码实时生成** - 根据当前配置自动生成代码片段，一键复制
- ⚡ **极致性能** - 基于 Next.js 16 和 React 19，享受最新特性
- 🔧 **高度可扩展** - 轻松添加新组件，灵活配置展示方式
- 📱 **响应式设计** - 完美适配各种屏幕尺寸

## 🛠️ 技术栈

| 类别         | 技术                     | 版本    | 说明                   |
| ------------ | ------------------------ | ------- | ---------------------- |
| **框架**     | Next.js                  | 16.1.1  | App Router、服务端组件 |
| **UI 库**    | React                    | 19.2.3  | 最新的 React 19 特性   |
| **样式**     | Tailwind CSS             | 4.0     | 最新版本，性能更优     |
| **语言**     | TypeScript               | 5.0     | 类型安全保障           |
| **组件工具** | class-variance-authority | 0.7.1   | 组件变体管理           |
| **样式工具** | clsx & tailwind-merge    | -       | 类名合并与去重         |
| **图标**     | lucide-react             | 0.562.0 | 现代化图标库           |
| **包管理**   | pnpm                     | -       | 快速、节省空间         |

### 为什么选择这些技术？

- ✅ **Next.js 16**：App Router 稳定，支持服务端组件，SEO 友好
- ✅ **React 19**：最新特性，性能优化，更好的开发体验
- ✅ **Tailwind CSS 4**：最新版本，构建速度更快，功能更强
- ✅ **TypeScript**：类型安全，减少运行时错误，提高代码质量
- ✅ **CVA**：优雅的组件变体管理方案，类型安全

## 🚀 快速开始

### 前置要求

- Node.js 18.20.0+
- pnpm 8.0+（推荐使用 pnpm）

```bash
# 检查版本
node -v
pnpm -v

# 安装 pnpm（如果还没安装）
npm install -g pnpm
```

### 安装依赖

```bash
# 克隆项目（如果还没有）
git clone <repository-url> tm-ui
cd tm-ui

# 安装依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动开发服务器（默认端口 3000）
pnpm dev

# 或指定端口
pnpm dev -- -p 3001
```

🎉 访问 [http://localhost:3000](http://localhost:3000) 查看项目

### 其他命令

```bash
# 构建生产版本
pnpm build

# 启动生产服务器
pnpm start

# 代码检查
pnpm lint

# 类型检查
pnpm type-check    # 如果配置了此命令
```

## 📁 项目结构

```bash
tm-ui/
├── app/                                      # Next.js 应用路由
│   ├── components/
│   │   └── page.tsx                          # 组件列表页
│   ├── showcase/
│   │   └── page.tsx                          # 组件展示页
│   ├── layout.tsx                            # 根布局
│   ├── page.tsx                              # 首页
│   ├── globals.css                           # 全局样式
│   └── favicon.ico                           # 网站图标
│
├── components/                               # 组件目录
│   ├── ui/                                   # UI 基础组件
│   │   ├── button.tsx                        # 按钮组件
│   │   └── card.tsx                          # 卡片组件
│   └── showcase/                             # 展示系统组件
│       ├── code-block.tsx                    # 代码块展示
│       ├── componnet-card.tsx                # 组件卡片
│       ├── preset-selector.tsx               # 预设选择器
│       ├── props-controls.tsx                # 属性控制面板
│       ├── theme-toggle.tsx                  # 主题切换
│       └── types/
│           └── index.ts                      # 类型定义
│
├── lib/                                      # 工具库
│   ├── showcase-config.tsx                   # 组件展示配置
│   └── utils.ts                              # 工具函数
│
├── types/                                    # 全局类型定义
│   └── index.ts                              # 类型导出
│
├── public/                                   # 静态资源
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   └── window.svg
│
├── components.json                           # 组件配置文件
├── tsconfig.json                             # TypeScript 配置
├── next.config.ts                            # Next.js 配置
├── postcss.config.mjs                        # PostCSS 配置
├── eslint.config.mjs                         # ESLint 配置
├── package.json                              # 项目依赖
├── pnpm-lock.yaml                            # pnpm 锁文件
└── pnpm-workspace.yaml                       # pnpm 工作区配置
```

## 🎯 核心功能

### 1. 📦 组件展示系统

统一的组件展示和管理平台：

- ✅ **组件卡片**：每个组件独立展示，包含名称、描述和分类
- ✅ **配置化管理**：在 `lib/showcase-config.tsx` 中集中配置
- ✅ **类型安全**：完整的 TypeScript 类型定义
- ✅ **易于扩展**：添加新组件只需几步配置

```typescript
// 添加新组件示例
{
  id: "button",
  name: "Button",
  description: "支持多种变体、尺寸和状态的按钮组件",
  component: ({ variant, size }) => <Button variant={variant} size={size} />,
  propControls: { /* ... */ },
  presets: [ /* ... */ ],
  code: (props) => `<Button ${propsToString(props)} />`
}
```

### 2. 🎛️ 实时属性控制

可视化调整组件属性，即时预览效果：

| 控件类型    | 用途                   | 示例                              |
| ----------- | ---------------------- | --------------------------------- |
| **Select**  | 单选项（变体、尺寸等） | `variant: "default" \| "outline"` |
| **Boolean** | 开关选项               | `disabled: true \| false`         |
| **Text**    | 文本内容               | `children: "Button Text"`         |

**特点：**

- 🔄 实时同步：修改即生效
- 🎨 所见即所得：直观的可视化编辑
- 📝 类型提示：完整的 TypeScript 支持

### 3. 🚀 预设快捷方式

内置常用配置组合，一键应用：

```typescript
presets: [
  { name: "Primary", props: { variant: "default", size: "md" } },
  { name: "Danger", props: { variant: "destructive", size: "md" } },
  { name: "Small Outline", props: { variant: "outline", size: "sm" } },
];
```

**优势：**

- ⚡ 快速切换：无需逐个调整属性
- 🎯 最佳实践：预设体现推荐用法
- 🧪 快速测试：方便对比不同配置效果

### 4. 💻 代码实时生成

根据当前配置自动生成代码片段：

**功能特点：**

- 📋 **一键复制**：点击即可复制到剪贴板
- 🔍 **智能过滤**：自动过滤默认值，生成简洁代码
- 🎨 **语法高亮**：代码块带语法高亮（可扩展）
- 📝 **实时更新**：属性变化时代码同步更新

**示例：**

```jsx
// 手动配置：variant="outline", size="lg"
// 生成代码：
<Button variant='outline' size='lg'>
  Click Me
</Button>
```

### 5. 🎨 主题切换

完整的明暗主题支持：

- 🌞 **明亮模式**：适合白天使用
- 🌙 **暗黑模式**：保护眼睛，节省电量
- 💾 **记忆偏好**：自动保存用户选择
- 🎯 **CSS 变量**：基于 CSS 变量实现，易于自定义

## 📝 如何添加新组件

### 步骤 1：创建组件文件

在 `components/ui/` 目录下创建组件文件，使用 CVA 定义变体：

```typescript
// components/ui/badge.tsx
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      outline: "border border-input bg-background",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}
```

### 步骤 2：添加展示配置

在 `lib/showcase-config.tsx` 中添加配置：

```typescript
import { Badge } from "@/components/ui/badge";

export const SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  // ... 其他组件
  {
    id: "badge",
    name: "Badge",
    description: "用于展示状态、标签等小型信息",

    // 组件渲染
    component: ({ variant = "default", children = "Badge" }) => <Badge variant={variant}>{children}</Badge>,

    // 属性控制
    propControls: {
      variant: {
        label: "Variant",
        control: {
          type: "select",
          options: ["default", "secondary", "outline"] as const,
        },
        defaultValue: "default",
      },
      children: {
        label: "Text",
        control: { type: "text" },
        defaultValue: "Badge",
      },
    },

    // 预设配置
    presets: [
      { name: "Default", props: { variant: "default" } },
      { name: "Secondary", props: { variant: "secondary" } },
      { name: "Outline", props: { variant: "outline" } },
    ],

    // 代码生成
    code: (props) => {
      const propsStr = Object.entries(props)
        .filter(([key, value]) => {
          const defaults: any = { variant: "default", children: "Badge" };
          return value !== defaults[key];
        })
        .map(([key, value]) => (typeof value === "string" ? `${key}="${value}"` : `${key}={${value}}`))
        .filter(Boolean)
        .join(" ");

      return `<Badge${propsStr ? " " + propsStr : ""}>${props.children || "Badge"}</Badge>`;
    },
  },
];
```

### 步骤 3：类型定义（如需要）

如果有自定义类型，在 `components/showcase/types/index.ts` 中定义：

```typescript
export interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  propControls: Record<string, PropControl>;
  presets?: Array<{ name: string; props: Record<string, any> }>;
  code: (props: Record<string, any>) => string;
}
```

### 完成 ✅

刷新页面，你的新组件就会出现在组件列表中！

**提示：**

- 🎯 组件 `id` 必须唯一
- 📝 `description` 要清晰描述组件用途
- 🎨 `presets` 建议提供 3-5 个常用配置
- 💻 `code` 函数要过滤默认值，生成简洁代码

## 🗺️ 项目背景与规划

### 项目起源

TM-UI 项目的诞生源于对现有官网项目的技术升级需求：

- 📦 **原有方案**：基于魔改的 Antd 组件，已运行 2 年
- 🎯 **改进目标**：构建自有组件库，提升定制能力和性能
- 🚀 **技术选型**：基于 shadcn/ui 理念，结合 Tailwind CSS 4

### 开发路线图

我们采用三阶段渐进式开发策略：

```
阶段 0: 前期准备（1周）
└─ 技术选型、组件清单、设计规范

阶段 1: 展示系统 + 基础组件（1-2周）
└─ Button、Card、CardGroup、Section

阶段 2: 完善 + 扩展（2-3周）
└─ 15+ 常用组件，完善展示系统

阶段 3: Monorepo + 迁移（3-4周）
└─ 改造为 Monorepo，官网开始使用新组件
```

📋 **详细计划**：查看 [DevelopmentPlan.md](./DevelopmentPlan.md)

🔧 **Monorepo 方案对比**：查看 [MONOREPO_COMPARISON.md](./MONOREPO_COMPARISON.md)

### 当前进度

- [x] 阶段 0：技术选型完成 ✅
- [x] 阶段 1：展示系统基本完成 ✅
- [x] Button 组件 ✅
- [x] Card 组件 ✅
- [ ] 阶段 1：Card Group 组件 🚧
- [ ] 阶段 1：Section 组件 🚧
- [ ] 阶段 2-3：待开始 📅

## 🎨 组件列表

### 已完成 ✅

| 组件   | 说明                         | 状态    | 文档                |
| ------ | ---------------------------- | ------- | ------------------- |
| Button | 按钮组件，支持多种变体       | ✅ 完成 | [查看](/components) |
| Card   | 卡片组件，支持阴影和悬浮效果 | ✅ 完成 | [查看](/components) |

### 开发中 🚧

| 组件       | 说明         | 计划   |
| ---------- | ------------ | ------ |
| Card Group | 卡片组布局   | 阶段 1 |
| Section    | 页面区块容器 | 阶段 1 |

### 计划中 📅

查看 [DevelopmentPlan.md](./DevelopmentPlan.md) 了解完整的组件规划。

## 🤝 参与贡献

欢迎参与 TM-UI 项目的开发！

### 贡献方式

1. **🐛 报告 Bug**：在 Issues 中提交问题
2. **💡 提出建议**：分享你对新功能的想法
3. **📝 改进文档**：帮助完善文档和示例
4. **🔧 提交代码**：修复 Bug 或开发新功能

### 开发流程

```bash
# 1. Fork 项目到你的 GitHub

# 2. 克隆你的 Fork
git clone <your-fork-url>
cd tm-ui

# 3. 创建功能分支
git checkout -b feature/your-feature-name

# 4. 开发和测试
pnpm dev

# 5. 提交更改
git add .
git commit -m "feat: add new feature"

# 6. 推送到你的 Fork
git push origin feature/your-feature-name

# 7. 创建 Pull Request
```

### 代码规范

- 📝 **提交信息**：遵循 [Conventional Commits](https://www.conventionalcommits.org/)
- 🎨 **代码风格**：使用 ESLint 和 Prettier（已配置）
- 📚 **组件文档**：新组件需要完整的配置和示例
- ✅ **类型安全**：确保 TypeScript 类型正确

### 提交信息规范

```bash
feat: 添加新功能
fix: 修复 Bug
docs: 更新文档
style: 代码格式调整
refactor: 代码重构
test: 添加测试
chore: 构建/工具相关
```

## 📚 相关资源

### 项目文档

- 📋 [开发计划](./DevelopmentPlan.md) - 详细的三阶段开发计划
- 🔧 [Monorepo 方案对比](./MONOREPO_COMPARISON.md) - Nx vs Turborepo vs pnpm
- 📖 [TM 官网项目说明](./PROJECT_README.md) - 原有官网项目的详细文档

### 技术文档

- [Next.js 官方文档](https://nextjs.org/docs)
- [React 19 文档](https://react.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/docs)
- [shadcn/ui 组件](https://ui.shadcn.com/)
- [CVA 文档](https://cva.style/)

### 社区资源

- [Next.js Discord](https://nextjs.org/discord)
- [Tailwind CSS Discord](https://tailwindcss.com/discord)
- [React 中文社区](https://react.docschina.org/)

## ❓ 常见问题

<details>
<summary><strong>为什么不直接使用 Antd？</strong></summary>

- 🎯 **定制需求**：Antd 的魔改成本高，不如自建组件灵活
- 📦 **包体积**：Antd 较重，影响首屏加载
- 🎨 **设计系统**：希望构建完全符合自身品牌的设计系统
- 🚀 **技术栈**：拥抱 Tailwind CSS，更现代的开发体验
</details>

<details>
<summary><strong>为什么选择 Tailwind CSS 而不是 CSS-in-JS？</strong></summary>

- ⚡ **性能**：零运行时，构建时生成 CSS
- 🎨 **直观**：所见即所得，开发效率高
- 📦 **体积**：生产环境 CSS 体积小
- 🔥 **生态**：社区活跃，插件丰富
</details>

<details>
<summary><strong>这个项目会开源吗？</strong></summary>

目前主要为 TM 官网项目服务，后续可能会根据需求开源部分组件。

</details>

<details>
<summary><strong>如何在我的项目中使用这些组件？</strong></summary>

阶段 3 完成后，组件库将以 npm 包的形式发布，可通过 pnpm 安装使用：

```bash
pnpm add @tm/ui
```

目前可以直接复制源代码使用。

</details>

## 🙏 致谢

感谢以下开源项目的启发：

- [shadcn/ui](https://ui.shadcn.com/) - 组件设计理念
- [Radix UI](https://www.radix-ui.com/) - 无障碍访问标准
- [Tailwind CSS](https://tailwindcss.com/) - 优秀的 CSS 框架
- [Next.js](https://nextjs.org/) - 强大的 React 框架

## 📄 License

MIT License © 2025 TM Team

---

<div align="center">
  <sub>使用 ❤️ 和 ☕ 构建</sub>
</div>
