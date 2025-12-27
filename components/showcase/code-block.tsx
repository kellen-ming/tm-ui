"use client";

import { Copy, Check } from "lucide-react";

interface CodeBlockProps {
  code: string;
  isCopied: boolean;
  onCopy: () => void;
}

export default function CodeBlock(props: CodeBlockProps) {
  const { code, isCopied, onCopy } = props;

  return (
    <div className='border-t border-gray-200 dark:border-gray-800'>
      <div className='relative'>
        <pre className='p-4 bg-gray-900 dark:bg-black text-gray-100 text-sm overflow-x-auto'>
          <code>{code}</code>
        </pre>
        <button
          onClick={onCopy}
          className='absolute top-3 right-3 p-2 rounded-md bg-gray-800 hover:bg-gray-700 transition-colors'
          aria-label='Copy code'>
          {isCopied ? <Check className='w-4 h-4 text-green-400' /> : <Copy className='w-4 h-4 text-gray-400' />}
        </button>
      </div>
    </div>
  );
}
