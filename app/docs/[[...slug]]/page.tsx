import type { Metadata } from "next";
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from "fumadocs-ui/page";
import { notFound } from "next/navigation";

import { source } from "@/lib/source";
import { useMDXComponents as getMDXComponents } from "@/mdx-components";

interface PageProps {
  params: Promise<{
    slug?: string[];
  }>;
}

export default async function DocPage(props: PageProps) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const Content = page.data.body;
  const components = getMDXComponents({});

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={{
        style: "clerk",
      }}
      tableOfContentPopover={{
        style: "clerk",
      }}
    >
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBody>
        <Content components={components} />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.data.title} | TM UI Docs`,
    description: page.data.description,
  };
}
