import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const buttonGroupVariants = cva("tm-button-group flex", {
  variants: {
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    gap: {
      none: "gap-none",
      xs: "gap-xs",
      sm: "gap-sm",
      md: "gap-md",
      lg: "gap-lg",
      xl: "gap-xl",
    },
    justify: {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    },
    align: {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    },
    wrap: {
      wrap: "flex-wrap",
      nowrap: "flex-nowrap",
      wrapReverse: "flex-wrap-reverse",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    gap: "xl",
    justify: "start",
    align: "center",
    wrap: "wrap",
  },
});

export interface ButtonGroupProps
  extends VariantProps<typeof buttonGroupVariants>,
    React.PropsWithChildren {
  className?: string;
}

function ButtonGroup(props: ButtonGroupProps) {
  const { className, children, ...restProps } = props;
  return (
    <div className={cn(buttonGroupVariants({ ...restProps }), className)}>
      {children}
    </div>
  );
}

ButtonGroup.displayName = "ButtonGroup";

export { ButtonGroup, buttonGroupVariants };
