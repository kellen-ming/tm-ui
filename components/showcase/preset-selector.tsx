"use client";

interface Preset {
  name: string;
  props: Record<string, any>;
}

interface PresetSelectorProps {
  presets: Preset[];
  onSelect: (props: Record<string, any>) => void;
}

export default function PresetSelector(props: PresetSelectorProps) {
  const { presets, onSelect } = props;
  if (!presets || presets.length === 0) return null;

  return (
    <div className='px-6 py-3 bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800'>
      <div className='flex items-center gap-2'>
        <span className='text-xs font-medium text-gray-600 dark:text-gray-400'>Quick Presets:</span>
        <div className='flex gap-2 flex-wrap'>
          {presets.map((preset, idx) => (
            <button
              key={idx}
              onClick={() => onSelect(preset.props)}
              className='px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors'>
              {preset.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
