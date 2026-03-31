import { Button } from "@/components/ui/tm-button";

export function ButtonBasicExample() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="text">Text</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}
