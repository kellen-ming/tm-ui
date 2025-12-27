"use client";

import { useState } from "react";
import { Moon, Sun, Code2, Copy, Check } from "lucide-react";

// 类型定义
interface ComponentVariant {
  name: string;
  props: Record<string, unknown>;
}

interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  variants: ComponentVariant[];
  code: string;
}

// 示例组件数据结构
const DEMO_COMPONENTS: ShowcaseComponent[] = [
  {
    id: "button",
    name: "Button",
    description: "自定义按钮组件,支持多种样式变体",
    component: ({ variant = "default", children = "Click Me" }) => (
      <button
        className={`px-4 py-2 rounded-md font-medium transition-colors ${
          variant === "default"
            ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500"
            : variant === "outline"
            ? "border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            : "bg-red-600 text-white hover:bg-red-700"
        }`}
      >
        {children}
      </button>
    ),
    variants: [
      { name: "Default", props: { variant: "default" } },
      { name: "Outline", props: { variant: "outline" } },
      { name: "Destructive", props: { variant: "destructive" } },
    ],
    code: `<Button variant="default">Click Me</Button>`,
  },
];

export default function ComponentShowcase() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleTheme = () => setTheme((prev) => (prev === "light" ? "dark" : "light"));

  const copyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={theme === "dark" ? "dark" : ""}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Component Showcase
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                自定义组件库展示
              </p>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? (
                <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              ) : (
                <Sun className="w-5 h-5 text-gray-300" />
              )}
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="container mx-auto px-4 py-8">
          <div className="grid gap-8">
            {DEMO_COMPONENTS.map((comp) => (
              <ComponentCard
                key={comp.id}
                component={comp}
                onCopyCode={copyCode}
                isCopied={copiedId === comp.id}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

// 组件展示卡片
function ComponentCard({
  component,
  onCopyCode,
  isCopied,
}: {
  component: ShowcaseComponent;
  onCopyCode: (code: string, id: string) => void;
  isCopied: boolean;
}) {
  const [activeVariant, setActiveVariant] = useState(0);
  const [showCode, setShowCode] = useState(false);

  const Component = component.component;
  const currentVariant = component.variants[activeVariant];

  return (
    <div className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
      {/* Card Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
              {component.name}
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {component.description}
            </p>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <Code2 className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>

      {/* Variant Selector */}
      <div className="px-6 py-3 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="flex gap-2 flex-wrap">
          {component.variants.map((variant, idx) => (
            <button
              key={idx}
              onClick={() => setActiveVariant(idx)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                activeVariant === idx
                  ? "bg-blue-600 text-white dark:bg-blue-500"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>

      {/* Component Preview */}
      <div className="px-6 py-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <Component {...currentVariant.props} />
      </div>

      {/* Code Display */}
      {showCode && (
        <div className="border-t border-gray-200 dark:border-gray-800">
          <div className="relative">
            <pre className="p-4 bg-gray-900 dark:bg-black text-gray-100 text-sm overflow-x-auto">
              <code>{component.code}</code>
            </pre>
            <button
              onClick={() => onCopyCode(component.code, component.id)}
              className="absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {isCopied ? (
                <Check className="w-4 h-4 text-green-400" />
              ) : (
                <Copy className="w-4 h-4 text-gray-400" />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}