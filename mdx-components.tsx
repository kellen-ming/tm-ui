import type { MDXComponents } from "mdx/types";
import { Accordion, Accordions } from "fumadocs-ui/components/accordion";
import { File, Files, Folder } from "fumadocs-ui/components/files";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { TypeTable } from "fumadocs-ui/components/type-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { ExampleShowcase } from "@/components/docs/example-showcase";

import { ButtonBasicExample, ButtonBasicExampleShowcase } from "@/examples/button";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    Accordion,
    Accordions,
    File,
    Files,
    Folder,
    Step,
    Steps,
    Tab,
    Tabs,
    TypeTable,
    ExampleShowcase,
    ...defaultMdxComponents,
    ButtonBasicExample,
    ButtonBasicExampleShowcase,
    ...components,
  };
}


