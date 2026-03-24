import { Button } from "@/components/ui/tm-button";

export function ButtonDemo() {
  return (
    <div className="not-prose rounded-2xl border border-border bg-card p-6">
      <div className="flex flex-wrap gap-3">
        <Button>Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="text">Text</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}
