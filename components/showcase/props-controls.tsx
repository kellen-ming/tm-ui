"use client";

import type { PropControl } from "./types";

interface PropControlsProps {
  propControls: Record<string, PropControl>;
  values: Record<string, any>;
  onChange: (key: string, value: any) => void;
  onReset?: () => void;
}

export default function PropControls(props: PropControlsProps) {
  const { propControls, values, onChange, onReset } = props;
  
  return (
    <div className='px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800'>
      <div className='flex items-center justify-between mb-3'>
        <h3 className='font-semibold text-gray-700 dark:text-gray-300'>Props Configuration</h3>
        {onReset && (
          <button onClick={onReset} className='text-blue-600 dark:text-blue-400  hover:cursor-pointer'>
            Reset
          </button>
        )}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
        {Object.entries(propControls).map(([key, config]) => (
          <PropControlItem
            key={key}
            propKey={key}
            config={config}
            value={values[key]}
            onChange={(value) => onChange(key, value)}
          />
        ))}
      </div>
    </div>
  );
}

interface PropControlItemProps {
  propKey: string;
  config: PropControl;
  value: any;
  onChange: (value: any) => void;
}

function PropControlItem(props: PropControlItemProps) {
  const { propKey, config, value, onChange } = props;
  const { label, control } = config;

  return (
    <div className='space-y-1.5 flex flex-col justify-center'>
      <label className='block font-medium text-gray-600 dark:text-gray-400'>{label}</label>

      {control.type === "select" && (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'>
          {control.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}

      {control.type === "boolean" && (
        <label className='flex items-center gap-2 cursor-pointer'>
          <input
            type='checkbox'
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className='w-4 h-4 rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 focus:ring-offset-0'
          />
          <span className='text-sm text-gray-700 dark:text-gray-300'>{value ? "Enabled" : "Disabled"}</span>
        </label>
      )}

      {control.type === "text" && (
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className='w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      )}

      {control.type === "number" && (
        <input
          type='number'
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={control.min}
          max={control.max}
          className='w-full px-3 py-1.5 text-sm rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
        />
      )}
    </div>
  );
}
