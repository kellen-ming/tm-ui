// lib/showcase-config.ts
import { Button, ButtonProps } from "@/components/ui/button";

import { CardGroup, CardGroupProps } from "@/components/ui/card-group";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsProps,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Slider as TmSlider } from "@/components/ui/tm-slider";
import { generatePropsStr } from "@/lib/utils";
import { UserIcon } from "lucide-react";
import { ShowcaseComponent } from "@/components/showcase/types";
import { ButtonGroup, ButtonGroupProps } from "@/components/ui/button-group";
import { Card, CardProps } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionProps, AccordionTrigger } from "@/components/ui/accordion";
import { SliderProps } from "@/components/ui/tm-slider";
import { Toggle, ToggleProps } from "@/components/ui/toggle";

export const SHOWCASE_COMPONENTS: ShowcaseComponent<any>[] = [
  {
    id: "button",
    name: "Button",
    description: "TM 主题的按钮组，支持按钮、链接、文本、线性四种样式",
    component: (props: ButtonProps & { inner_text: string }) => (
      <Button {...props}>{props.inner_text}</Button>
    ),
    propControls: {
      variant: {
        label: "Variant",
        control: {
          type: "select",
          options: [
            "primary",
            "primary-white",
            "secondary",
            "secondary-white",
            "text",
            "text-white",
            "link",
            "link-white",
            "linear",
          ] as const,
        },
        defaultValue: "primary",
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
      inner_text: {
        label: "Inner Text",
        control: { type: "text" },
        defaultValue: "Button",
      },
    },
    defaultValues: {
      variant: "primary",
      size: "lg",
      disabled: false,
      inner_text: "Button",
    },
    presets: [
      {
        name: "Primary",
        props: { variant: "primary", size: "lg" },
      },
      {
        name: "Primary White",
        props: { variant: "primary-white", size: "lg" },
      },
      {
        name: "Secondary",
        props: { variant: "secondary", size: "lg" },
      },
      {
        name: "Secondary White",
        props: { variant: "secondary-white", size: "lg" },
      },
      {
        name: "Text",
        props: { variant: "text", size: "lg" },
      },
      {
        name: "Text White",
        props: { variant: "text-white", size: "lg" },
      },
      {
        name: "Link",
        props: { variant: "link", size: "lg" },
      },
      {
        name: "Link White",
        props: { variant: "link-white", size: "lg" },
      },
      {
        name: "Linear",
        props: { variant: "linear", size: "lg" },
      },
    ],

    code: (
      props: ButtonProps & { inner_text: string },
      defaultValues: ButtonProps & { inner_text: string }
    ) => {
      const propsStr = generatePropsStr(props, defaultValues, ["inner_text"]);

      return `<Button${propsStr ? " " + propsStr : ""}>\n  ${
        props.inner_text || "Button"
      }\n</Button>`;
    },
  },
  {
    id: "button-group",
    name: "Button Group",
    description:
      "TM 主题的按钮组组件，支持水平和垂直两种方向，支持控制对其方式、间距、对齐方式、换行方式",
    component: (
      props: ButtonGroupProps & {
        containerWidth: number;
        containerHeight: number;
      }
    ) => {
      const { containerWidth, containerHeight, ...restProps } = props;
      return (
        <div className="flex flex-col items-center gap-2">
          <p className="text-center">
            Container(width: {containerWidth}px, height: {containerHeight}px)
          </p>
          <div
            className="overflow-auto border-b border-[#e5e5e5] bg-white px-6 py-3 dark:border-gray-600 dark:bg-gray-950"
            style={{ width: containerWidth, height: containerHeight }}
          >
            <ButtonGroup {...restProps}>
              <Button variant="linear">Button</Button>
              <Button>Button</Button>
            </ButtonGroup>
          </div>
        </div>
      );
    },
    propControls: {
      orientation: {
        label: "Orientation",
        control: {
          type: "select",
          options: ["horizontal", "vertical"] as const,
        },
        defaultValue: "horizontal",
      },
      gap: {
        label: "Gap",
        control: {
          type: "select",
          options: ["none", "xs", "sm", "md", "lg", "xl"] as const,
        },
        defaultValue: "xl",
      },
      justify: {
        label: "Justify",
        control: {
          type: "select",
          options: [
            "start",
            "center",
            "end",
            "between",
            "around",
            "evenly",
          ] as const,
        },
        defaultValue: "start",
      },
      align: {
        label: "Align",
        control: {
          type: "select",
          options: ["start", "center", "end", "stretch", "baseline"] as const,
        },
        defaultValue: "center",
      },
      wrap: {
        label: "Wrap",
        control: {
          type: "select",
          options: ["wrap", "nowrap", "wrapReverse"] as const,
        },
        defaultValue: "wrap",
      },
      containerWidth: {
        label: "containerWidth",
        control: {
          type: "number",
        },
        defaultValue: 240,
      },
      containerHeight: {
        label: "containerHeight",
        control: {
          type: "number",
        },
        defaultValue: 70,
      },
    },
    presets: [
      { name: "Horizontal", props: { orientation: "horizontal" } },
      { name: "Vertical", props: { orientation: "vertical" } },
    ],
    defaultValues: {
      orientation: "horizontal",
      gap: "xl",
      justify: "start",
      align: "center",
      wrap: "wrap",
      containerWidth: 240,
      containerHeight: 70,
    },
    code: (
      props: ButtonGroupProps & {
        containerWidth: number;
        containerHeight: number;
      },
      defaultValues: ButtonGroupProps & {
        containerWidth: number;
        containerHeight: number;
      }
    ) => {
      const propsStr = generatePropsStr(props, defaultValues, [
        "containerWidth",
        "containerHeight",
      ]);

      return `<ButtonGroup${propsStr ? " " + propsStr : ""}>
  <Button color="linear">Button</Button>
  <Button>Button</Button>
</ButtonGroup>`;
    },
  },
  {
    id: "card",
    name: "Card",
    description: "TM 主题的卡片组件，支持阴影、边框和悬浮效果、圆角和内边距",
    component: (props: CardProps) => {
      return (
        <Card {...props}>
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold  dark:text-white">
              Card Title
            </h3>
            <p className="text-sm  dark:text-gray-25">Card content goes here</p>
          </div>
        </Card>
      );
    },
    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["primary", "secondary"] as const },
        defaultValue: "primary",
      },
      shadow: {
        label: "Shadow",
        control: {
          type: "select",
          options: ["none", "sm", "md", "lg"] as const,
        },
        defaultValue: "none",
      },
      rounded: {
        label: "Rounded",
        control: {
          type: "select",
          options: ["sm", "md", "lg", "xl", "2xl", "3xl"] as const,
        },
        defaultValue: "md",
      },
      padding: {
        label: "Padding",
        control: { type: "select", options: ["lg", "3xl", "4xl"] as const },
        defaultValue: "4xl",
      },
      hover: {
        label: "Hover",
        control: { type: "boolean" },
        defaultValue: false,
      },
    },
    presets: [
      { name: "Primary", props: { variant: "primary", shadow: "none" } },
      { name: "Secondary", props: { variant: "secondary", shadow: "none" } },
    ],
    defaultValues: {
      variant: "primary",
      shadow: "none",
      padding: "4xl",
      rounded: "md",
      hover: false,
    },
    code: (props: CardProps, defaultValues: CardProps) => {
      const propsStr = generatePropsStr(props, defaultValues);

      return `<Card${propsStr ? " " + propsStr : ""}>
  <div className="flex flex-col gap-2">
    <h3 className="text-lg font-semibold text-gray-50 dark:text-white">Card Title</h3>
    <p className="text-sm text-gray-50 dark:text-gray-25">Card content goes here</p>
  </div>
</Card>`;
    },
  },
  {
    id: "card-group",
    name: "Card Group",
    description:
      "TM 主题的卡片组组件，支持水平和垂直两种方向，支持控制对其方式、间距、对齐方式、换行方式",
    component: (
      props: CardGroupProps & {
        containerWidth: number;
        containerHeight: number;
      }
    ) => {
      const { containerWidth, containerHeight, ...restProps } = props;
      return (
        <div className="flex flex-col items-center gap-2">
          <p className="text-center">
            Container(width: {containerWidth}px, height: {containerHeight}px)
          </p>
          <div
            className="overflow-auto border-b border-[#e5e5e5] bg-white px-6 py-3 dark:border-gray-600 dark:bg-gray-950"
            style={{ width: containerWidth, height: containerHeight }}
          >
            <CardGroup {...restProps}>
              <Card variant="primary" shadow="none">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold  dark:text-white">
                    Card Title
                  </h3>
                  <p className="text-sm  dark:text-gray-25">
                    Card content goes here
                  </p>
                </div>
              </Card>
              <Card variant="secondary" shadow="none">
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-semibold  dark:text-white">
                    Card Title
                  </h3>
                  <p className="text-sm  dark:text-gray-25">
                    Card content goes here
                  </p>
                </div>
              </Card>
            </CardGroup>
          </div>
        </div>
      );
    },
    propControls: {
      orientation: {
        label: "Orientation",
        control: {
          type: "select",
          options: ["horizontal", "vertical"] as const,
        },
        defaultValue: "horizontal",
      },
      gap: {
        label: "Gap",
        control: {
          type: "select",
          options: [
            "none",
            "xs",
            "sm",
            "md",
            "lg",
            "xl",
            "2xl",
            "3xl",
            "4xl",
          ] as const,
        },
        defaultValue: "3xl",
      },
      justify: {
        label: "Justify",
        control: {
          type: "select",
          options: [
            "start",
            "center",
            "end",
            "between",
            "around",
            "evenly",
          ] as const,
        },
        defaultValue: "start",
      },
      align: {
        label: "Align",
        control: {
          type: "select",
          options: ["start", "center", "end", "stretch", "baseline"] as const,
        },
        defaultValue: "center",
      },
      wrap: {
        label: "Wrap",
        control: {
          type: "select",
          options: ["wrap", "nowrap", "wrapReverse"] as const,
        },
        defaultValue: "wrap",
      },
      containerWidth: {
        label: "containerWidth",
        control: {
          type: "number",
        },
        defaultValue: 520,
      },
      containerHeight: {
        label: "containerHeight",
        control: {
          type: "number",
        },
        defaultValue: 150,
      },
    },
    presets: [
      { name: "Horizontal", props: { orientation: "horizontal" } },
      { name: "Vertical", props: { orientation: "vertical" } },
    ],
    defaultValues: {
      orientation: "horizontal",
      gap: "xl",
      justify: "start",
      align: "center",
      wrap: "wrap",
      containerWidth: 520,
      containerHeight: 150,
    },
    code: (
      props: ButtonGroupProps & {
        containerWidth: number;
        containerHeight: number;
      },
      defaultValues: ButtonGroupProps & {
        containerWidth: number;
        containerHeight: number;
      }
    ) => {
      const propsStr = generatePropsStr(props, defaultValues, [
        "containerWidth",
        "containerHeight",
      ]);

      return `<ButtonGroup${propsStr ? " " + propsStr : ""}>
  <Card variant="primary" shadow="none">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold  dark:text-white">Card Title</h3>
      <p className="text-sm  dark:text-gray-25">Card content goes here</p>
    </div>
  </Card>
  <Card variant="secondary" shadow="none">
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-semibold  dark:text-white">Card Title</h3>
      <p className="text-sm  dark:text-gray-25">Card content goes here</p>
    </div>
  </Card>
</CardGroup>`;
    },
  },
  {
    id: "tabs",
    name: "Tabs",
    description:
      "TM 主题的tabs组件，支持按钮和幽灵两种风格，支持亮色和暗色两种主题",
    component: (props: TabsProps) => {
      return (
        <div className="flex w-full items-center justify-center text-center">
          <Tabs {...props} className="w-full items-center justify-center">
            <TabsList>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="user">User</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="icon">
                <UserIcon />
              </TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              Make changes to your account here.
            </TabsContent>
            <TabsContent value="password">
              Change your password here.
            </TabsContent>
            <TabsContent value="user">User content here.</TabsContent>
            <TabsContent value="settings">Settings content here.</TabsContent>
            <TabsContent value="icon">
              <UserIcon />
            </TabsContent>
          </Tabs>
        </div>
      );
    },
    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["button", "ghost"] as const },
        defaultValue: "ghost",
      },
      mode: {
        label: "Mode",
        control: { type: "select", options: ["light", "dark"] as const },
        defaultValue: "dark",
      },
    },
    moreExamples: {
      title: "Tabs in Shadcn UI",
      url: "https://ui.shadcn.com/docs/components/tabs",
    },
    moreApiReferences: {
      title: "Tabs in Radix UI",
      url: "https://www.radix-ui.com/docs/primitives/components/tabs",
    },
    defaultValues: {
      variant: "ghost",
      mode: "dark",
    },
    code: (props: TabsProps, defaultValues: TabsProps) => {
      const propsStr = generatePropsStr(props, defaultValues);
      return `<Tabs${
        propsStr ? " " + propsStr : ""
      } className="w-full items-center justify-center">
  <TabsList>
    <TabsTrigger value="account">Account</TabsTrigger>
    <TabsTrigger value="password">Password</TabsTrigger>
  </TabsList>
  <TabsContent value="account">Make changes to your account here.</TabsContent>
  <TabsContent value="password">Change your password here.</TabsContent>
</Tabs>`;
    },
  },
  {
    id: "accordion",
    name: "Accordion",
    description:
      "TM 主题的accordion组件，支持默认和outline两种风格，支持单选和多选两种模式，支持折叠和展开两种状态",
    presets: [
      {
        name: "Single",
        props: { type: "single", variant: "default", collapsible: true },
      },
      {
        name: "Multiple",
        props: { type: "multiple", variant: "default", collapsible: true },
      },
      {
        name: "Single Outline",
        props: { type: "single", variant: "outline", collapsible: true },
      },
      {
        name: "Multiple Outline",
        props: { type: "multiple", variant: "outline", collapsible: true },
      },
    ],
    moreExamples: {
      title: "Accordion in Shadcn UI",
      url: "https://ui.shadcn.com/docs/components/accordion",
    },
    moreApiReferences: {
      title: "Accordion in Radix UI",
      url: "https://www.radix-ui.com/docs/primitives/components/accordion",
    },
    component: (props: AccordionProps) => {
      return (
        <div className="w-full max-w-[592px]">
          <Accordion {...props}>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                Is there a free trial available?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can try us for free for 30 days. If you want, we’ll
                provide you with a free, personalized 30-minute onboarding call
                to get you up and running as soon as possible.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Is there a free trial available?
              </AccordionTrigger>
              <AccordionContent>
                Yes, you can try us for free for 30 days. If you want, we’ll
                provide you with a free, personalized 30-minute onboarding call
                to get you up and running as soon as possible.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      );
    },
    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["default", "outline"] as const },
        defaultValue: "default",
      },
      type: {
        label: "Type",
        control: { type: "select", options: ["single", "multiple"] as const },
        defaultValue: "single",
      },
      collapsible: {
        label: "Collapsible",
        control: { type: "boolean" },
        defaultValue: true,
      },
    },
    defaultValues: {
      variant: "default",
      type: "single",
      collapsible: true,
    },
    code: (props: AccordionProps, defaultValues: AccordionProps) => {
      let propsStr = generatePropsStr<AccordionProps>(props, defaultValues, [
        // @ts-expect-error - collapsible is not a valid prop for AccordionProps
        "collapsible",
      ]);

      if (props.type === "single" && props.collapsible) {
        propsStr = `${propsStr} collapsible`;
      }

      return `<Accordion${propsStr ? " " + propsStr : ""}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
    <AccordionContent>Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is there a free trial available?</AccordionTrigger>
    <AccordionContent>Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.</AccordionContent>
  </AccordionItem>
</Accordion>`;
    },
  },
  {
    id: "slider",
    name: "Slider",
    description: "TM 主题的slider组件，支持亮色和暗色两种主题",
    component: (props: SliderProps) => {
      return <TmSlider {...props} />;
    },
    moreExamples: {
      title: "Slider in Shadcn UI",
      url: "https://ui.shadcn.com/docs/components/slider",
    },
    moreApiReferences: {
      title: "Slider in Radix UI",
      url: "https://www.radix-ui.com/docs/primitives/components/slider",
    },
    propControls: {
      mode: {
        label: "Mode",
        control: { type: "select", options: ["light", "dark"] as const },
        defaultValue: "dark",
      },
    },
    defaultValues: {
      mode: "dark",
    },
    code: (props: SliderProps, defaultValues: SliderProps) => {
      const propsStr = generatePropsStr(props, defaultValues);
      return `<Slider${propsStr ? " " + propsStr : ""} />`;
    },
  },
  {
    id: "toggle",
    name: "Toggle",
    description:
      "TM 主题的toggle组件，支持outline和text两种风格，支持亮色和暗色两种主题, 自带展开和收起图标",
    component: (props: ToggleProps) => {
      return <Toggle {...props}>Show More</Toggle>;
    },
    propControls: {
      variant: {
        label: "Variant",
        control: { type: "select", options: ["outline", "text"] as const },
        defaultValue: "outline",
      },
      mode: {
        label: "Mode",
        control: { type: "select", options: ["light", "dark"] as const },
        defaultValue: "dark",
      },
    },
    moreExamples: {
      title: "Toggle in Shadcn UI",
      url: "https://ui.shadcn.com/docs/components/toggle",
    },
    moreApiReferences: {
      title: "Toggle in Radix UI",
      url: "https://www.radix-ui.com/docs/primitives/components/toggle",
    },
    defaultValues: {
      variant: "outline",
      mode: "dark",
    },
    code: (props: ToggleProps, defaultValues: ToggleProps) => {
      const propsStr = generatePropsStr(props, defaultValues);
      return `<Toggle${propsStr ? " " + propsStr : ""} />`;
    },
  },
];

