"use client";

import { useState, useMemo } from "react";
import { Code2 } from "lucide-react";
import type { ShowcaseComponent } from "./types";
import PropControls from "./props-controls";
import PresetSelector from "./preset-selector";
import CodeBlock from "./code-block";

interface ComponentCardProps {
  component: ShowcaseComponent;
  onCopyCode: (code: string, id: string) => void;
  isCopied: boolean;
}

export default function ComponentCard(props: ComponentCardProps) {
  const { component, onCopyCode, isCopied } = props;

  // 初始化默认值
  const defaultProps = useMemo(() => {
    if (!component.propControls) return {};
    return Object.entries(component.propControls).reduce(
      (acc, [key, config]) => ({
        ...acc,
        [key]: config.defaultValue,
      }),
      {}
    );
  }, [component.propControls]);

  const [currentProps, setCurrentProps] = useState(defaultProps);
  const [showCode, setShowCode] = useState(false);

  const Component = component.component;

  const handlePropChange = (key: string, value: any) => {
    setCurrentProps((prev) => ({ ...prev, [key]: value }));
  };

  const handleReset = () => {
    setCurrentProps(defaultProps);
  };

  const handlePresetSelect = (props: Record<string, any>) => {
    setCurrentProps({ ...defaultProps, ...props });
  };

  const generatedCode = useMemo(() => {
    return typeof component.code === "function" ? component.code(currentProps) : component.code;
  }, [component, currentProps]);

  const handleCopy = () => {
    onCopyCode(generatedCode, component.id);
  };

  return (
    <div className='bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden'>
      {/* Card Header */}
      <div className='px-6 py-4 border-b border-gray-200 dark:border-gray-800'>
        <div className='flex items-start justify-between'>
          <div>
            <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>{component.name}</h2>
            <p className='text-sm text-gray-600 dark:text-gray-400 mt-1'>{component.description}</p>
          </div>
          <button
            onClick={() => setShowCode(!showCode)}
            className='p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'
            aria-label='Toggle code'>
            <Code2
              className={`w-5 h-5 transition-colors ${
                showCode ? "text-blue-600 dark:text-blue-400" : "text-gray-600 dark:text-gray-400"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Preset Selector (可选) */}
      {component.presets && <PresetSelector presets={component.presets} onSelect={handlePresetSelect} />}

      {/* Prop Controls */}
      {component.propControls && (
        <PropControls
          propControls={component.propControls}
          values={currentProps}
          onChange={handlePropChange}
          onReset={handleReset}
        />
      )}

      {/* Component Preview */}
      <div className='px-6 py-12 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-[200px]'>
        <Component {...currentProps} />
      </div>

      {/* Code Display */}
      {showCode && <CodeBlock code={generatedCode} isCopied={isCopied} onCopy={handleCopy} />}
    </div>
  );
}
