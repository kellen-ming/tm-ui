# TM官网品牌升级前端工程

## 使用 Next JS 14+、Tailwind CSS 3.4 、Antd 5+和 TypeScript 搭建

支持 App Router、TypeScript、ESLint、Prettier、Husky、Lint-Staged、Commitlint、VSCode、PostCSS、Tailwind CSS、包括多语言 (i18n) 等。

### 功能介绍

- ⚡ 支持 App Router 的 [Next.js](https://nextjs.org)
- 类型检查 [TypeScript](https://www.typescriptlang.org)
- 与 [Tailwind CSS](https://tailwindcss.com) 集成
- ✅ 适用于 TypeScript 和 React 18 的严格模式
- 使用 next-intl 实现多语言 (i18n)
- 使用 [ESLint](https://eslint.org) 的 Linter（默认 NextJS、NextJS Core Web Vitals、Tailwind CSS 和 Airbnb 配置）
- 💖 使用 [Prettier](https://prettier.io) 的代码格式化工具
- 用于 Git 挂钩的 Husky
- 用于在 Git 暂存文件上运行 linters 的 Lint-staged
- 用 Commitlint 对 git 提交的代码进行格式化处理
- 用 Commitizen 编写符合标准的提交信息
- 使用 release it 自动生成更新日志
- 使用 `@` 前缀进行绝对导入
- 🗂 VSCode 配置： 调试、设置、任务和 PostCSS、ESLint、Prettier、TypeScript 扩展
- 🤖 SEO 元数据与 Next SEO
- 🗺️ Sitemap.xml 和 robots.txt（使用 next-sitemap）。
- 使用 [antd](https://ant.design/index-cn) 作为ui组件库

Next.js 的内置功能：

- 最小化 HTML 和 CSS
- 实时重新加载
- ✅ 消除缓存

#### 理念

- 易于定制
- 代码最少
- 便于搜索引擎优化

#### 要求

- Node.js 18.20.0+ 和 pnpm

#### 开始

在本地环境中运行以下命令

```shell
git clone git@github.com:channelwill/lid-tm-official_web.git lid-tm-official_web
cd lid-tm-official_web
pnpm install

```

然后，您就可以在开发模式下使用实时重载在本地运行了：

```shell
pnpm run dev
```

用你喜欢的浏览器打开 http://localhost:3000，查看你的项目。

该工程使用docker部署，具体详情可参考[Next官网](https://github.com/vercel/next.js/blob/134a59de4f9f477ab45fe091ed522b3f3e861121/examples/with-docker-compose/README.md?plain=1#L18)

#### 项目结构

```shell
.
├── .husky                          # Husky 配置
├── .next                           # next 文件
├── .vscode                         # VSCode 配置
├── README.md                       # README 文件
├── public                          # Public assets 文件夹
├── src
│   ├── app                         # Next JS App (App Router)
│   ├── components                  # React 组件
│   ├── libs                        # 第三方库配置
│   ├── locale                      # 多语言文件夹（i18n 信息）
│   ├── providers                   # 一些providers
│   ├── styles                      # 样式文件夹
│   ├── theme                       # 主题文件夹
│   ├── types                       # TS类型定义
│   ├── utils                       # 实用工具文件夹
│   └── middleware                  # middleware 配置
├── .env.development          # 开发环境变量配置
├── .env.production           # 生产环境变量配置
├── .env.test                 # 测试环境变量配置
├── .eslint.json                    # ESLint 校验配置
├── .prettierrc.json                # Prettierrc 校验配置
├── .release-it.json                # release it 配置
├── commitlint.config.js            # commitlint 配置
├── package.json                    # 项目配置
│   └── pnpm-lock.yaml              # pnpm 版本锁定文件
├── tailwind.config.js              # Tailwind CSS 配置
└── tsconfig.json                   # TypeScript 配置
```

#### 测试

项目集成了 Playwright UI自动化测试，提供完整的端到端测试解决方案。

##### 🚀 快速开始

1. **首次安装浏览器和依赖**

```shell
# 安装 Playwright 浏览器
pnpm run test:install

# 安装系统依赖（Linux 系统需要）
pnpm run test:install-deps
```

2. **启动开发服务器**

```shell
# 在一个终端窗口启动开发服务器
pnpm run dev
```

3. **运行测试**

```shell
# 在另一个终端窗口运行测试
pnpm run test:e2e
```

##### 📋 测试脚本说明

| 脚本命令                   | 功能描述                           |
| -------------------------- | ---------------------------------- |
| `pnpm run test:install`    | 安装 Playwright 浏览器             |
| `pnpm run test:e2e`        | 运行所有 E2E 测试（无头模式）      |
| `pnpm run test:e2e:headed` | 运行测试（有头模式，可看到浏览器） |
| `pnpm run test:e2e:debug`  | 调试模式运行测试                   |
| `pnpm run test:e2e:ui`     | 使用 Playwright UI 模式运行测试    |
| `pnpm run test:e2e:report` | 查看测试报告                       |
| `pnpm run test:e2e:ci`     | CI 环境运行测试                    |

##### 🔧 常用测试场景

**开发调试**

```shell
# 可视化调试，逐步执行
pnpm run test:e2e:debug

# 使用 UI 模式，图形化界面
pnpm run test:e2e:ui

# 有头模式，观察测试执行过程
pnpm run test:e2e:headed
```

**运行特定测试**

```shell
# 运行特定文件的测试
npx playwright test tests/test-index.spec.ts

# 运行包含特定关键词的测试
npx playwright test --grep "tracking API"
```

**查看测试结果**

```shell
# 查看 HTML 测试报告
pnpm run test:e2e:report
```

##### 📁 测试相关文件结构

```shell
.
├── README.md                    # README 文件
├── playwright.config.ts         # Playwright 配置文件
├── tests/                       # 测试用例目录
│   ├── global/                  # 全局设置
│   │   ├── global.setup.ts      # 全局前置操作
│   │   └── global.teardown.ts   # 全局清理操作
│   ├── test-index.spec.ts       # 首页测试用例
│   └── test-tracking-API.spec.ts # API页面测试用例
├── test-results/                # 测试结果输出目录
│   ├── index.html              # 测试报告首页
│   └── ...                     # 其他测试结果文件
└── playwright-report/           # Playwright 生成的报告
```

##### 🎯 测试最佳实践

1. **测试前准备**

   - 确保开发服务器运行在 `http://localhost:3000`
   - 检查测试环境配置是否正确

2. **编写测试用例**

   - 使用描述性的测试名称
   - 遵循 AAA 模式（Arrange, Act, Assert）
   - 使用 `data-testid` 属性定位元素

3. **调试测试**

   - 使用 `--debug` 模式逐步调试
   - 利用 `--trace on` 生成详细的执行轨迹
   - 查看截图和视频了解失败原因

4. **CI/CD 集成**
   - 使用 `test:e2e:ci` 命令在 CI 环境运行
   - 配置合适的超时时间和重试策略

##### 🚀 完整测试流程

**第一次使用测试**

```shell
# 1. 安装 Playwright 浏览器
pnpm run test:install

# 2. 启动开发服务器
pnpm run dev

# 3. 运行测试（新终端窗口）
pnpm run test:e2e
```

**日常开发测试流程**

```shell
# 开发过程中快速测试
pnpm run test:e2e:headed

# 调试特定问题
pnpm run test:e2e:debug

# 查看测试报告
pnpm run test:e2e:report
```

**测试开发流程**

```shell
# 1. 录制新的测试用例
npx playwright codegen http://localhost:3000

# 2. 运行特定测试
npx playwright test --grep "页面标题"

# 3. 并行运行提高效率
npx playwright test --workers=4
```

##### 📊 测试报告和结果

测试完成后，你可以通过以下方式查看结果：

1. **HTML 报告**: `pnpm run test:e2e:report`
2. **控制台输出**: 测试运行时的实时反馈
3. **截图和视频**: 失败测试的截图保存在 `test-results/` 目录
4. **追踪文件**: 详细的执行轨迹用于调试

##### 🔧 测试配置说明

- **playwright.config.ts**: 主要配置文件
- **tests/utils/test-helpers.ts**: 测试辅助工具
- **tests/global/**: 全局设置和清理
- **.github/workflows/playwright.yml**: CI/CD 配置

### 编辑器VSCode

如果您是 VSCode 用户，可通过在 .vscode/extension.json 中安装建议的扩展，更好地与 VSCode 集成。启动代码中包含与 VSCode 无缝集成的设置。此外，还提供了调试配置，以获得前端和后端的调试体验。

在 VSCode 上安装插件后，ESLint 和 Prettier 可自动修复代码并显示错误。

专业提示：如果你需要使用 TypeScript 进行项目范围内的类型检查，你可以在 Mac 上使用 Cmd + Shift + B 运行构建。

#### api 目录

文件、变量命名要与后端保持一致。

此目录对应后端 API 接口，若项目较大时，可以按照业务划分子目录，并与后端保持一致。

api 中的方法名字要与后端 api url 尽量保持语义高度一致性。

对于 api 中的每个方法要添加注释，注释与后端 Apifox 中的文档保持一致。

## 规范

### 命名规范

#### 文件夹的命名

全部采用小写方式， 以中划线分隔，有复数结构时，要采用复数命名法， 缩写不用复数

推荐：`src/utils/google-auth/`

不推荐： `src/utils/google_auth/`

#### JS、CSS、SCSS、HTML、PNG 文件命名

采用小写方式， 以中划线分隔。

以下这种情况例外：

1. 用于存放常量的 js 文件，使用全部单词大写并且用下划线进行分割：

推荐：`src/https/constants/RESPONSE_CODE.js`

### HTML 规范（Vue Template 同样适用）

#### 使用语义化的标签

HTML5 中新增很多语义化标签，所以优先使用语义化标签，避免一个页面都是 div 或者 p 标签，这样也更加有益于 SEO 和可访问性

推荐：

```
<header></header>
<main></main>
<footer></footer>
```

不推荐：

```
<div>
  <div></div>
</div>

```

### 编程规范

参考： ([ReactCleanCode](https://github.com/channelwill/lid-tm-official_web/blob/main/ReactCleanCode.md))

#### 代码检查工具 ESLint

使用 create-next-app 创建的 Next.js 项目已经配置好了 ESLint，只需要按照项目需要修改对应配置即可。这里我们加上 prettier 的配置，让 ESLint 和 Prettier 能够更和谐的一起工作。参照[文档](https://prettier.io/docs/en/install#eslint-and-other-linters)

1. eslint-plugin-prettier: 这是一个 ESLint 插件，将 Prettier 作为 ESLint 规则运行。这意味着你可以使用 ESLint 运行 Prettier 的格式化功能。当代码不符合 Prettier 的格式化规则时，eslint-plugin-prettier 会报告格式化错误。这样做的好处是可以在一个命令中同时运行 ESLint 的代码质量检查和 Prettier 的代码格式化，简化了开发流程。
2. eslint-config-prettier: 这是一个 ESLint 配置，用于关闭所有不必要的或可能与 Prettier 冲突的 ESLint 规则。当同时使用 ESLint 和 Prettier 时，一些 ESLint 规则可能与 Prettier 的格式化规则冲突，导致不一致的代码风格。通过使用 eslint-config-prettier，可以确保 ESLint 的规则不会干扰 Prettier 的代码格式化，从而保持代码风格的一致性。

```bash
pnpm add --save-dev eslint-plugin-prettier eslint-config-prettier eslint-plugin-react-hooks
```

`.eslintrc.json`

```json
{
  "extends": ["plugin:prettier/recommended", "plugin:react-hooks/recommended"],
  "plugins": [
    "prettier", // 确保"prettier"插件已被添加
    "react-hooks"
  ],
  "rules": {
    // 可以在这里覆盖特定的规则设置
    "prettier/prettier": ["error", { "endOfLine": "auto" }], // 或者使用"warn"，这样Prettier的错误将以警告的形式展示 hooks 的规范
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

"extends": ["plugin:prettier/recommended"]做了三件事：

1. 启用 `eslint-plugin-prettier`：这实际上将 `Prettier` 作为 `ESLint` 规则运行。这意味着任何 `Prettier` 发现的格式问题都会作为 `ESLint` 问题报告出来。
2. 添加 `prettier` 到 `ESLint` 的配置中：这确保了 `Prettier` 的规则优先级最高，有助于解决其他 `ESLint` 规则可能与 `Prettier` 冲突的问题。
3. 禁用与 `Prettier` 冲突的 `ESLint` 规则：通过内部使用 `eslint-config-prettier`，它自动关闭所有不必要的或可能与 `Prettier` 冲突的 `ESLint` 规则。

#### 代码风格工具 Prettier

```bash
pnpm add -D prettier prettier-plugin-organize-imports prettier-plugin-tailwindcss

```

我们使用了 `Tailwind CSS` 推荐额外安装 `prettier-plugin-tailwindcss`，可以帮忙自动排序 `className`。
并且我们额外安装可以帮助排序 `import` 的插件：`prettier-plugin-organize-imports`

接着在 `.prettierrc.json` 文件中配置如下：

```json
{
  "plugins": [
    "prettier-plugin-organize-imports",
    "prettier-plugin-tailwindcss"
  ],
  "tailwindFunctions": ["classNames"],
  "singleQuote": true
}
```

在 `.package.json` 文件的脚本中添加用于修复代码格式不对的命令：

```bash
 "scripts": {
    "prettier": "prettier --write .",
  },
```

### 同步编辑器设置和扩展

在项目中加上 `.vscode` 文件夹，配置编辑器的扩展和自动校验和修复的设置，让其他同学接入项目也能快速上手和使用相同的配置、扩展。

`.vscode/extensions.json`

```json
{
  "recommendations": [
    // Linting / Formatting
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint",
    "bradlc.vscode-tailwindcss"
  ]
}
```

`.vscode/settings.json`

```json
{
  // 默认情况下，对所有语言使用 Prettier 进行格式化
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  // 使用 Prettier 格式化 JavaScript，覆盖 VSCode 默认设置。
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  // 使用 ESLint 进行代码校验。
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  // 启用文件嵌套。
  "explorer.fileNesting.enabled": true,
  "explorer.fileNesting.patterns": {
    "*.ts": "$(capture).test.ts, $(capture).test.tsx",
    "*.tsx": "$(capture).test.ts, $(capture).test.tsx"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

### git规范

Git 有很多的 `hooks`, 让我们在不同的阶段,对代码进行不同的操作,控制提交到仓库的代码的规范性,和准确性, 以下只是几个常用的钩子

#### 提交的代码规范 Husky

安装husky

```bash
pnpm add --save-dev husky
```

初始化 `Husky`，通过`git`钩子函数`pre-commit`判断提交的代码是否符合规范

```bash
pnpm exec husky init
```

#### 提交的信息规范 commitlint

通过钩子函数`commit-msg`,判断 `commit` 信息是否符合规范

```bash
pnpm add -D @commitlint/config-conventional @commitlint/cli
```

可以在 `package.json` 内创建一个脚本：

```bash
npm pkg set scripts.commitlint="commitlint --edit"
echo "npm run commitlint \${1}" > .husky/commit-msg
```

注意：如果在windows下面出现报错，请删除`commit-msg`文件，然后重新手动创建，将代码`npm run commitlint ${1}`复制进去

或者使用下面这个方式也行：

```bash
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg
```

在根目录下新建`commitlint.config.js`文件，写入如下代码：

```js
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "subject-case": [0],
    "type-enum": [
      2,
      "always",
      [
        "feat", // 新功能 feature
        "fix", // 修复 bug
        "docs", // 更新文档注释
        "style", // 美观化代码，修改代码格式(非CSS样式修改,不影响代码运行的变动)
        "refactor", // 重构代码(既不增加新功能，也不是修复bug)
        "perf", // 修改提高性能的代码
        "test", // 增加测试用例
        "chore", // 构建过程或辅助工具的变动,修改构建流程,依赖管理
        "revert", // 回退代码
        "release", // 发布新版本
        "build", // 打包代码
      ],
    ],
  },
};
```

完成之后，将 `commitlint` 的配置添加到 `package.json`的`scripts`中:

```json
{
  "scripts": {
    // ...
    "commitlint": "commitlint --edit"
  }
}
```

特别注意提交信息的格式，不符合规范的提交信息将无法提交, 每种提交类型(`chore: `)的冒号之后必须要有空格，例如：

```bash
git commit -m "chore: Update build process"
```

### lint-staged

使用 `husky` 和 `lin-staged` 可以在 `Git` 提交代码时对提交的部分进行 `ESLint` 的代码校验和 `prettier` 的格式化，避免有些新同事编辑器中没有装对应插件和开启自动修复。安装配置也十分简单。

```bash
pnpm add --save-dev lint-staged
```

修改`.husky/pre-commit` 文件中的内容为：

```bash
npx lint-staged
```

新建`.lintstagedrc.js`的配置如下

```js
const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((file) => path.relative(process.cwd(), file))
    .join(" --file ")}`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand], // 这些格式的文件在提交时交给 ESLint 校验
  "**/*.{js,jsx,tsx,ts,less,md,json}": ["prettier --write ."], // 这些格式的文件在提交时让 prettier 格式化
};
```

❌ 特别注意提交信息的格式，不符合规范的提交信息将无法提交, 例如一个合格的提交：

✅ `git commit -m "chore: Update build process"`

### Release It! 🚀

在语义化版本控制（Semantic Versioning）中，版本号由 `MAJOR.MINOR.PATCH` 三个数字组成，每个数字都有明确的意义。下面详细列出每种版本号变化的情况：

#### 1. **Patch 版本更新**

Patch 版本用于解决错误、漏洞修复或小的优化，不引入新功能，也不改变现有功能的使用方式。具体情况包括：

- **Bug修复**：修复现有功能中的错误。
- **安全补丁**：修复可能导致安全问题的漏洞。
- **性能优化**：在不改变功能的情况下提升软件性能。
- **小的修正**：例如文档错误、代码注释改进。
- **依赖更新**：更新依赖库以修复兼容性问题，不影响功能。
- **回退不兼容的变更**：如果之前的Patch版本引入了不兼容的变更，则通过新的Patch版本回退这些变更。

示例：如果当前版本是 `2.4.5`，那么下一个Patch版本可能是 `2.4.6`。

#### 2. **Minor 版本更新**

Minor 版本用于引入新的功能或显著改进现有功能，同时保持与现有版本的向后兼容性。具体情况包括：

- **添加新功能**：引入新的功能模块或API。
- **增强现有功能**：改进现有功能以提高其可用性或性能。
- **添加辅助工具**：添加工具或支持脚本来增强用户体验。
- **扩展现有API**：在不破坏现有API的情况下增加新接口。
- **弃用标记**：标记不推荐使用的功能或API以备将来删除。

示例：如果当前版本是 `2.4.5`，那么下一个Minor版本可能是 `2.5.0`。

#### 3. **Major 版本更新**

虽然您询问的是 Patch 和 Minor 的区别，但了解 Major 更新也有助于全面理解版本管理。

Major 版本涉及重大变化，包括可能的向后不兼容性。具体情况包括：

- **重大功能变更**：引入重大功能更新或重构。
- **删除过时功能**：移除之前标记为弃用的功能。
- **API不兼容变更**：引入可能破坏现有功能或API的变化。
- **架构重构**：对软件进行重大的架构重组。
- **协议更新**：更改软件的通信协议或数据格式。

示例：如果当前版本是 `2.4.5`，那么下一个Major版本可能是 `3.0.0`。

#### 完整语义化版本变化情况

- **版本 `1.2.3` 增加新功能**：升级到 `1.3.0`（Minor）
- **版本 `1.2.3` 修复小bug**：升级到 `1.2.4`（Patch）
- **版本 `1.2.3` 进行重大更新并移除功能**：升级到 `2.0.0`（Major）
- **版本 `2.4.5` 扩展API且不破坏兼容性**：升级到 `2.5.0`（Minor）
- **版本 `3.1.9` 修复安全漏洞**：升级到 `3.1.10`（Patch）

```bash
pnpm install -D release-it @release-it/conventional-changelog

```

安装完成之后，将 `release` 的配置添加到 `package.json`的`scripts`中:

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "release": "release-it"
  }
}
```

使用`@release-it/conventional-changelog`可根据提交信息获取建议的 bump,此外，它还可以生成常规的变更日志，并可以选择在此过程中更新 `CHANGELOG.md` 文件。

添加`.release-it.json`配置：

```json
{
  "hooks": {
    "after:bump": "echo 更新版本成功! 🚀"
  },
  "github": {
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "autoGenerate": false,
    "preRelease": false,
    "draft": false,
    "tokenRef": "GITLAB_TOKEN",
    "assets": null,
    "host": null,
    "timeout": 0,
    "proxy": null,
    "skipChecks": false,
    "web": false,
    "comments": {
      "submit": false,
      "issue": ":rocket: _This issue has been resolved in v${version}. See [${releaseName}](${releaseUrl}) for release notes._",
      "pr": ":rocket: _This pull request is included in v${version}. See [${releaseName}](${releaseUrl}) for release notes._"
    }
  },
  "gitlab": {
    "release": false,
    "releaseName": "Release ${version}",
    "releaseNotes": null,
    "milestones": [],
    "tokenRef": "GITLAB_TOKEN",
    "tokenHeader": "Private-Token",
    "certificateAuthorityFile": null,
    "assets": null,
    "origin": null,
    "skipChecks": false
  },
  "git": {
    "changelog": "git log --pretty=format:\"* %s (%h)\" ${from}...${to}",
    "requireCleanWorkingDir": true,
    "requireBranch": false,
    "requireUpstream": true,
    "requireCommits": false,
    "requireCommitsFail": true,
    "commitsPath": "",
    "addUntrackedFiles": false,
    "commit": true,
    "commitMessage": "release: Release ${version}",
    "commitArgs": [],
    "tag": true,
    "tagExclude": null,
    "tagName": null,
    "tagMatch": null,
    "getLatestTagFromAllRefs": false,
    "tagAnnotation": "Release ${version}",
    "tagArgs": [],
    "push": true,
    "pushArgs": ["--follow-tags"],
    "pushRepo": ""
  },
  "npm": {
    "publish": false,
    "publishPath": ".",
    "publishArgs": [],
    "tag": null,
    "otp": null,
    "ignoreVersion": false,
    "allowSameVersion": false,
    "versionArgs": [],
    "skipChecks": false,
    "timeout": 10
  },
  "plugins": {
    "@release-it/conventional-changelog": {
      "infile": "CHANGELOG.md",
      "ignoreRecommendedBump": true,
      "strictSemVer": true,
      "preset": {
        "name": "conventionalcommits",
        "types": [
          {
            "type": "feat",
            "section": "✨添加新功能"
          },
          {
            "type": "fix",
            "section": "🐛修复bug"
          },
          {
            "type": "docs",
            "section": "📚更新文档"
          },
          {
            "type": "chore",
            "section": "🔧修改配置文件"
          },
          {
            "type": "style",
            "hidden": "true",
            "section": "🎨修改样式"
          },
          {
            "type": "test",
            "section": "✅测试代码",
            "hidden": true
          },
          {
            "type": "refactor",
            "section": "🔨重构代码"
          },
          {
            "type": "perf",
            "section": "⚡优化性能",
            "hidden": true
          },
          {
            "type": "release",
            "section": "📌发布版本",
            "hidden": true
          }
        ]
      }
    }
  }
}
```

💥 先提交本地所有更改过的代码之后，执行：

```bash
pnpm run release
```

## 测试

// TODO:
