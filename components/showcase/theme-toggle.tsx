"use client";

import { Moon, Sun } from "lucide-react";
import type { Theme } from "./types";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
}

export function ThemeToggle(props: ThemeToggleProps) {
  const { theme, onToggle } = props;

  return (
    <button
      onClick={onToggle}
      className='p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors hover:cursor-pointer'
      aria-label='Toggle theme'>
      {theme === "light" ? (
        <Moon className='w-5 h-5 text-gray-700 dark:text-gray-300' />
      ) : (
        <Sun className='w-5 h-5 text-gray-300' />
      )}
    </button>
  );
}
