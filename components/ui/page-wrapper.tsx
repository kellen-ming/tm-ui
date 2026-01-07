import { cn } from "@/lib/utils";
import { ClassValue } from "clsx";
import type { PropsWithChildren } from "react";
export interface PageWrapperProps extends PropsWithChildren {
  className?: ClassValue;
}
function PageWrapper(props: PageWrapperProps) {
  const { children, className } = props;
  return <div className={cn("flex min-h-screen w-full flex-col items-center pb-10", className)}>{children}</div>;
}

PageWrapper.displayName = "PageWrapper";

export { PageWrapper };
