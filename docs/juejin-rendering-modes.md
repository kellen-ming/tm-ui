# SSR、CSR、SSG、ISR、Streaming、RSC，一次讲清楚 Next.js 里的页面渲染方式

很多人第一次学 Next.js，会把 SSR、CSR、SSG 混在一起。再往后看，还会遇到 ISR、Streaming、RSC、PPR 这些名词，越看越乱。

其实这些概念可以分成两类：

- 页面内容是“什么时候、在哪里准备好”的渲染方式
- 帮你把静态和动态内容组合起来的机制

如果先把这两个层次分开，理解会清楚很多。

## 先说结论

- `SSR` 是请求到来时，服务器现生成 HTML。
- `CSR` 是浏览器拿到壳子后，再用 JavaScript 渲染页面。
- `SSG` 是在构建时提前生成静态 HTML。
- `ISR` 是在静态生成的基础上，按时间或按需重新生成。
- `Streaming` 不是一种独立渲染模式，更像是“分块输出页面”的交付方式。
- `RSC` 不是渲染模式，而是 React Server Components 这个组件模型。
- `PPR` 是一种混合静态和动态内容的现代方案，Next.js 里目前仍属于实验性能力。

## 1. SSR：请求时现做

SSR 是 `Server-Side Rendering`，意思是页面在用户请求时，由服务器实时生成 HTML。

适合这类页面：

- 需要强个性化
- 依赖登录态
- 每次请求都可能不同
- 希望首屏直接有完整内容

典型场景：

- 后台管理页
- 用户中心
- 实时数据看板

一个很常见的 Next.js 写法是让页面在服务端取数据，并显式避免缓存：

```tsx
export default async function Page() {
  const res = await fetch("https://example.com/api/data", {
    cache: "no-store",
  });

  const data = await res.json();
  return <div>{data.title}</div>;
}
```

SSR 的优点是内容新鲜，缺点是每次请求都要算一次，服务器压力更高。

## 2. CSR：先给壳，再自己跑

CSR 是 `Client-Side Rendering`，意思是服务器先返回一个页面壳子，真正的内容在浏览器里由 JavaScript 生成。

适合这类页面：

- 强交互
- 依赖浏览器 API
- 内容本身不是 SEO 重点
- 需要频繁在本地变更状态

例如：

```tsx
"use client";

import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/data")
      .then((res) => res.json())
      .then((json) => setData(json.title));
  }, []);

  return <div>{data ?? "Loading..."}</div>;
}
```

CSR 的优点是交互灵活，缺点是首屏通常更依赖 JS 下载和执行。

## 3. SSG：构建时预生成

SSG 是 `Static Site Generation`，意思是页面在 `build` 阶段就被提前生成好。

适合这类页面：

- 文档
- 博客
- 落地页
- 产品介绍页

这类页面通常内容稳定，不需要每次请求都重新算。

在 App Router 里，动态路由常会配合 `generateStaticParams()` 使用：

```tsx
export function generateStaticParams() {
  return [
    { slug: ["docs", "intro"] },
    { slug: ["docs", "components", "button"] },
  ];
}
```

然后 Next.js 在构建时就把这些路由的 HTML 生成出来。

SSG 的优点是快、稳、适合 SEO。缺点是内容更新后，需要重新构建或配合 revalidation。

## 4. ISR：静态页的“自动更新”

ISR 是 `Incremental Static Regeneration`。它不是完全新的渲染路线，更像是 SSG 的增强版。

它解决的问题是：

- 页面大部分时间可以静态化
- 但又希望内容能按时间或按需更新

在 App Router 里，ISR 往往通过 revalidate、tag revalidate 或相关缓存机制实现。

例如：

```tsx
export default async function Page() {
  const res = await fetch("https://example.com/api/posts", {
    next: { revalidate: 3600 },
  });

  const posts = await res.json();
  return <div>{posts.length}</div>;
}
```

这表示页面内容可以先静态缓存，然后每隔一段时间重新生成。

它特别适合：

- 文章列表
- 商品列表
- 文档站首页
- 不需要秒级实时，但希望“不要太旧”的内容

## 5. Streaming：边生成边发

Streaming 不是 SSG、SSR、CSR 之外的“第 4 种页面模式”，而是页面输出的一种方式。

它的核心思想是：

- 先把能尽快准备好的部分发给用户
- 剩下慢一点的部分再陆续补上

在 Next.js App Router 里，Streaming 经常和 React `Suspense` 一起出现。

这很适合：

- 页面里有慢接口
- 想让首屏先出来
- 想避免一个慢请求卡住整页

你可以把它理解成“分块发货”，而不是“一次性打包全发”。

## 6. RSC：React Server Components

RSC 是 React Server Components，严格来说它不是一个页面渲染模式，而是 App Router 的默认组件模型。

你可以把它理解成：

- 默认组件在服务器跑
- 需要交互的部分再切成 `use client`

RSC 的好处是：

- 减少传到浏览器的 JS
- 能把数据获取放到服务端
- 更适合文档、内容页、混合渲染页面

对 Next.js 来说，RSC 是底层前提，不是和 SSR/CSR/SSG 并列的“第三种/第四种页面模式”。

## 7. PPR：静态壳 + 动态洞

PPR 是 `Partial Prerendering`。官方当前把它放在更现代的缓存/预渲染体系里看待，本质上是把静态和动态内容放进同一个 route。

它的核心特点是：

- 页面里先有一个静态 shell
- 动态部分用 `Suspense` 留洞
- 动态内容之后再流式补上

它适合：

- 绝大部分内容是静态的
- 但又有少量动态区块

例如：

- 商品详情页主体静态，推荐位动态
- 文档页正文静态，登录态菜单动态

PPR 目前仍属于需要谨慎使用的能力，适合当作“未来方向”理解。

## 8. 什么时候用哪种

简单记：

- 内容稳定、SEO 重要，优先 `SSG`
- 内容会定时更新，优先 `ISR`
- 内容每次请求都不同，优先 `SSR`
- 页面强交互、浏览器状态重，优先 `CSR`
- 页面里有慢块，需要边渲染边输出，配合 `Streaming`
- 想减少客户端 JS，默认依赖 `RSC`
- 想把静态和动态混在一个页面，关注 `PPR`

## 9. 对比表

| 概念 | 它是什么 | 什么时候生成内容 | 运行位置 | 适合场景 | 备注 |
|---|---|---|---|---|---|
| CSR | 客户端渲染 | 浏览器加载 JS 后 | 浏览器 | 强交互、表单、仪表盘 | 首屏更依赖 JS |
| SSR | 服务端渲染 | 每次请求时 | 服务器 | 个性化、实时数据 | 每次请求都要执行 |
| SSG | 静态站点生成 | 构建时 | 构建阶段 | 文档、博客、官网 | 速度快，SEO 友好 |
| ISR | 增量静态再生成 | 构建后按需/按时 | 服务器 + 缓存 | 既静态又要更新 | 更像 SSG 的增强版 |
| Streaming | 流式输出 | 渲染过程中分块完成 | 服务器到浏览器 | 避免慢请求卡住整页 | 是机制，不是独立模式 |
| RSC | React Server Components | 默认在服务端执行 | 服务器 | 减少客户端 JS | 是组件模型，不是页面模式 |
| PPR | 部分预渲染 | 先静态 shell，再补动态洞 | 服务器 + 流式传输 | 静态和动态混合页面 | 仍偏实验性/前沿 |

## 10. 一点实战建议

如果你现在做的是：

- 文档站
- 组件库
- 内容型官网

大多数页面优先考虑 `SSG + RSC`，必要时局部加 `Streaming`，少量真正动态区域再用 `CSR` 或 `SSR`。

如果你做的是：

- 后台
- 用户中心
- 数据控制台

那就更常见 `SSR + CSR` 混合，局部静态化并不一定是主目标。

## 参考

- [Next.js Caching and Revalidating](https://nextjs.org/docs/app/getting-started/caching-and-revalidating)
- [Next.js Cache Components](https://nextjs.org/docs/app/getting-started/cache-components)
- [Next.js Partial Prerendering](https://nextjs.org/docs/15/app/getting-started/partial-prerendering)
- [Next.js Revalidate Tag](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [Next.js Revalidate Path](https://nextjs.org/docs/app/api-reference/functions/revalidatePath)
