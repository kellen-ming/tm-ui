// lib/showcase-config.ts
import { Button } from "@/components/ui/custom-button";
import type { ShowcaseComponent } from "../components/showcase/types";
import { Button as TmButton } from "@/components/ui/tm-button";
import { Card } from "@/components/ui/card";

export const SHOWCASE_COMPONENTS: ShowcaseComponent[] = [
  {
    id: "tm-button",
    name: "TmButton",
    description: "TM 主题的按钮组件，支持品牌色、白色和渐变三种颜色主题",

    component: ({ variant = "primary", color = "brand", size = "lg", disabled = false, children = "Button CTA" }) => (
      <TmButton variant={variant} color={color} size={size} disabled={disabled}>
        {children}
      </TmButton>
    ),

    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["primary", "secondary", "text", "link"] as const },
        defaultValue: "primary",
      },
      color: {
        label: "Color",
        control: { type: "select", options: ["brand", "white", "linear"] as const },
        defaultValue: "brand",
      },
      size: {
        label: "Size",
        control: { type: "select", options: ["sm", "lg"] as const },
        defaultValue: "lg",
      },
      disabled: {
        label: "Disabled",
        control: { type: "boolean" },
        defaultValue: false,
      },
      children: {
        label: "Text",
        control: { type: "text" },
        defaultValue: "Button CTA",
      },
    },

    presets: [
      { name: "Brand Primary", props: { variant: "primary", color: "brand", size: "lg" } },
      { name: "Brand Secondary", props: { variant: "secondary", color: "brand", size: "lg" } },
      { name: "White Primary", props: { variant: "primary", color: "white", size: "lg" } },
      { name: "White Secondary", props: { variant: "secondary", color: "white", size: "lg" } },
      { name: "Linear Primary", props: { variant: "primary", color: "linear", size: "lg" } },
      { name: "Linear Secondary", props: { variant: "secondary", color: "linear", size: "lg" } },
      { name: "Small Brand", props: { variant: "primary", color: "brand", size: "sm" } },
      { name: "Text Link", props: { variant: "text", color: "brand", size: "lg" } },
      { name: "Underline Link", props: { variant: "link", color: "brand", size: "lg" } },
      { name: "Linear Text", props: { variant: "text", color: "linear", size: "lg" } },
    ],

    code: (props) => {
      const propsStr = Object.entries(props)
        .filter(([key, value]) => {
          // 过滤默认值
          const defaults: any = {
            variant: "primary",
            color: "brand",
            size: "lg",
            disabled: false,
            children: "Button CTA",
          };
          return value !== defaults[key];
        })
        .map(([key, value]) => {
          if (key === "children") return ""; // children 单独处理
          if (typeof value === "string") return `${key}="${value}"`;
          if (typeof value === "boolean") return value ? key : "";
          return `${key}={${value}}`;
        })
        .filter(Boolean)
        .join(" ");

      return `<TmButton${propsStr ? " " + propsStr : ""}>\n  ${props.children || "Button CTA"}\n</TmButton>`;
    },
  },
  {
    id: "button",
    name: "Button",
    description: "支持多种变体、尺寸和状态的按钮组件",

    component: ({ variant = "default", size = "md", disabled = false, children = "Button" }) => (
      <Button variant={variant} size={size} disabled={disabled}>
        {children}
      </Button>
    ),

    // 🎯 支持组合式控制
    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["default", "outline", "ghost", "destructive"] as const },
        defaultValue: "default",
      },
      size: {
        label: "Size",
        control: { type: "select", options: ["sm", "md", "lg"] as const },
        defaultValue: "md",
      },
      disabled: {
        label: "Disabled",
        control: { type: "boolean" },
        defaultValue: false,
      },
      inner_t: {
        label: "Text",
        control: { type: "text" },
        defaultValue: "Click Me",
      },
    },

    // 🚀 快捷预设 (可选)
    presets: [
      { name: "Primary", props: { variant: "default", size: "md" } },
      { name: "Danger", props: { variant: "destructive", size: "md" } },
      { name: "Small Outline", props: { variant: "outline", size: "sm" } },
    ],

    // 📝 动态生成代码
    code: (props) => {
      const propsStr = Object.entries(props)
        .filter(([key, value]) => {
          // 过滤默认值
          const defaults: any = { variant: "default", size: "md", disabled: false, children: "Button" };
          return value !== defaults[key];
        })
        .map(([key, value]) => {
          if (typeof value === "string") return `${key}="${value}"`;
          if (typeof value === "boolean") return value ? key : "";
          return `${key}={${value}}`;
        })
        .filter(Boolean)
        .join(" ");

      return `<Button${propsStr ? " " + propsStr : ""}>${props.children || "Button"}</Button>`;
    },
  },

  {
    id: "card",
    name: "Card",
    description: "卡片组件,支持阴影、边框和悬浮效果",
    component: ({ variant = "default", shadow = "none", hoverable = false, padding = "md" }) => (
      <Card variant={variant} shadow={shadow} padding={padding} hoverable={hoverable}>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>Card Title</h3>
        <p className='text-sm text-gray-600 dark:text-gray-400'>This is a card component with customizable styles.</p>
      </Card>
    ),

    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["default", "elevated"] as const },
        defaultValue: "default",
      },
      shadow: {
        label: "Shadow",
        control: { type: "select", options: ["none", "sm", "md", "lg"] as const },
        defaultValue: "none",
      },
      padding: {
        label: "Padding",
        control: { type: "select", options: ["sm", "md", "lg"] as const },
        defaultValue: "md",
      },
      hoverable: {
        label: "Hoverable",
        control: { type: "boolean" },
        defaultValue: false,
      },
    },

    presets: [
      { name: "Simple", props: { variant: "default", shadow: "none" } },
      { name: "Elevated", props: { variant: "elevated", shadow: "lg" } },
      { name: "Interactive", props: { variant: "default", shadow: "md", hoverable: true } },
    ],

    code: (props) => {
      const propsStr = Object.entries(props)
        .filter(([_, value]) => value !== "default" && value !== "md" && value !== false)
        .map(([key, value]) => (typeof value === "boolean" ? key : `${key}="${value}"`))
        .join(" ");

      return `<Card${propsStr ? " " + propsStr : ""}>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>`;
    },
  },
];
