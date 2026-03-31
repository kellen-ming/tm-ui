import { ExampleShowcase } from "@/components/docs/example-showcase";

import { ButtonBasicExample } from "./basic-example";
import { buttonBasicExampleCode } from "./basic-example.code";

export async function ButtonBasicExampleShowcase() {
  return (
    <ExampleShowcase
      preview={<ButtonBasicExample />}
      code={buttonBasicExampleCode}
    />
  );
}
