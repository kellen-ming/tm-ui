import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export type CardProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof cardVariants>;

const cardVariants = cva("rounded-lg border transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-white dark:bg-gray-950 border-gray-200 dark:border-gray-800",
    },
    shadow: {
      none: "shadow-none",
      sm: "shadow-sm",
      md: "shadow-md",
      lg: "shadow-lg",
    },
    padding: {
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    },
    hoverable: {
      true: "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
    },
  },
  defaultVariants: {
    variant: "default",
    shadow: "none",
    padding: "md",
  },
});

function Card(props: CardProps) {
  const { className, variant, shadow, padding, children, hoverable, ...rest } = props;
  return (
    <div className={cn(cardVariants({ variant, shadow, padding, hoverable }), className)} {...rest}>
      {children}
    </div>
  );
}

Card.displayName = "Card";

export { Card };
