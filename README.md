
## Getting Started

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

## 结构
```bash
项目根目录/
├── types/
│   └── showcase.ts                          # 类型定义
├── lib/
│   └── showcase-config.ts                   # 组件配置 (可选但推荐)
├── components/
│   └── showcase/
│       ├── ThemeToggle.tsx                  # 主题切换
│       ├── VariantSelector.tsx              # 变体选择器
│       ├── CodeBlock.tsx                    # 代码展示
│       └── ComponentCard.tsx                # 组件卡片
└── app/
    └── components/
        └── showcase/
            └── page.tsx                     # 主展示页
```