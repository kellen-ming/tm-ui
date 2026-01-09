"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/showcase/theme-toggle";
import ComponentCard from "@/components/showcase/component-card";
import { Button as TmButton } from "@/components/ui/tm-button";
import { SHOWCASE_COMPONENTS } from "@/lib/showcase-config";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
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
    <div className={theme === "dark" ? "dark" : ""}>
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
          <div className='w-full'>
            <Tabs>
              <TabsList>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='password'>Password</TabsTrigger>
              </TabsList>
              <TabsContent value='account'>Make changes to your account here.</TabsContent>
              <TabsContent value='password'>Change your password here.</TabsContent>
            </Tabs>
          </div>
          <div className='w-full'>
            <Tabs mode='light'>
              <TabsList>
                <TabsTrigger value='account'>Account</TabsTrigger>
                <TabsTrigger value='password'>Password</TabsTrigger>
              </TabsList>
              <TabsContent value='account'>Make changes to your account here.</TabsContent>
              <TabsContent value='password'>Change your password here.</TabsContent>
            </Tabs>
          </div>
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
