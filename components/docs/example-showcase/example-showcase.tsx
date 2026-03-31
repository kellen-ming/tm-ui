import type { ReactNode } from "react";
import { ServerCodeBlock } from "fumadocs-ui/components/codeblock.rsc";

interface ExampleShowcaseProps {
  preview: ReactNode;
  code: string;
  lang?: string;
  previewTitle?: string;
  codeTitle?: string;
}

export async function ExampleShowcase(props: ExampleShowcaseProps) {
  const {
    preview,
    code,
    lang = "tsx",
    previewTitle = "Preview",
    codeTitle = "Usage",
  } = props;

  return (
    <section className="not-prose space-y-10">
      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight text-fd-foreground">
          {previewTitle}
        </h3>
        <div className="rounded-[28px] border border-fd-border bg-fd-card p-8 shadow-sm">
          {preview}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-2xl font-semibold tracking-tight text-fd-foreground">
          {codeTitle}
        </h3>
        <ServerCodeBlock
          code={code}
          lang={lang}
          codeblock={{
            className: "my-0 rounded-[28px] border border-fd-border bg-fd-card shadow-sm",
          }}
        />
      </div>
    </section>
  );
}
