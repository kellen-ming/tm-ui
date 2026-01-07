import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

const cardGroupVariants = cva("tm-card-group flex", {
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
      "2xl": "gap-2xl",
      "3xl": "gap-3xl",
      "4xl": "gap-4xl",
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
    gap: "3xl",
    justify: "start",
    align: "center",
    wrap: "wrap",
  },
});

export interface CardGroupProps extends VariantProps<typeof cardGroupVariants>, React.PropsWithChildren {
  className?: string;
}

function CardGroup(props: CardGroupProps) {
  const { className, children, ...restProps } = props;
  return <div className={cn(cardGroupVariants({ ...restProps }), className)}>{children}</div>;
}

CardGroup.displayName = "CardGroup";

export { CardGroup, cardGroupVariants };
