"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/showcase/theme-toggle";
import ComponentCard from "@/components/showcase/component-card";
import { SHOWCASE_COMPONENTS } from "@/lib/showcase-config";
import { Input } from '@/components/ui/input'
import { cn } from "@/lib/utils";

// 表单验证示例组件
function FormValidationExample() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const validateEmail = (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValid = emailRegex.test(value);
    setEmailError(!isValid && value.length > 0);
    return isValid;
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (value.length > 0) {
      validateEmail(value);
    } else {
      setEmailError(false);
    }
  };

  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <div>
        <label htmlFor="email-input" className="block text-sm font-medium mb-2">
          邮箱地址
        </label>
        <Input
          id="email-input"
          type="email"
          placeholder="请输入邮箱"
          value={email}
          onChange={handleEmailChange}
          aria-invalid={emailError}
          aria-describedby={emailError ? "email-error" : undefined}
        />
        {emailError && (
          <p id="email-error" className="mt-1 text-sm text-destructive">
            请输入有效的邮箱地址
          </p>
        )}
      </div>
      
      <div className="text-sm text-muted-foreground">
        <p><strong>说明：</strong></p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>当输入无效邮箱时，<code className="bg-muted px-1 rounded">aria-invalid=&quot;true&quot;</code> 会自动应用</li>
          <li>输入框会显示红色边框和红色外圈（错误样式）</li>
          <li>这提升了可访问性，屏幕阅读器会告知用户输入无效</li>
        </ul>
      </div>
    </div>
  );
}

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleCopyCode = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className={cn('text-primary-brand-default',theme === "dark" ? "dark" : "")}>
      <div className='min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors'>
        {/* Header */}
        <header className='sticky top-0 z-50 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 backdrop-blur'>
          <div className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>Component Showcase</h1>
              <p className='text-sm text-gray-600 dark:text-gray-400'>自定义组件库展示</p>
            </div>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </header>

        {/* Main Content */}
        <main className='container mx-auto px-4 py-8'>
          <div className='flex flex-col gap-8'>
            {SHOWCASE_COMPONENTS.map((comp) => (
              <ComponentCard
                key={comp.id}
                component={comp}
                onCopyCode={handleCopyCode}
                isCopied={copiedId === comp.id}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
