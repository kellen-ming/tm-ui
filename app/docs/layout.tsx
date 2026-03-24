import type { ReactNode } from "react";
import { DocsLayout } from "fumadocs-ui/layouts/docs";

import { source } from "@/lib/source";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: "TM UI",
        url: "/",
      }}
      links={[
        {
          text: "Showcase",
          url: "/",
        },
      ]}
      searchToggle={{
        enabled: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
