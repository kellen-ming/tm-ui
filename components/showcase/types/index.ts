// types/showcase.ts

// 支持的控件类型
export type PropControlType = 
  | { type: "select"; options: readonly string[] }
  | { type: "boolean" }
  | { type: "text" }
  | { type: "number"; min?: number; max?: number };

// Prop 控制器配置
export interface PropControl {
  label: string;
  control: PropControlType;
  defaultValue: any;
}

// 组件配置
export interface ShowcaseComponent {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<any>;
  
  // 支持组合式控制
  propControls?: Record<string, PropControl>;
  
  // 预设变体 (用于快速切换常用组合)
  presets?: Array<{
    name: string;
    props: Record<string, any>;
  }>;
  
  code: (props: Record<string, any>) => string; // 动态生成代码
}

export type Theme = "light" | "dark";