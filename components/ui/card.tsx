import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export type CardProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

const cardVariants = cva(
  "tm-card border border-border-tertiary-black-default transition-all duration-200",
  {
    variants: {
      variant: {
        primary: "bg-bgc-tertiary-black-default",
        secondary: "",
      },
      shadow: {
        none: "shadow-none",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
      },
      rounded: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        "2xl": "rounded-2xl",
        "3xl": "rounded-3xl",
      },
      padding: {
        lg: "p-lg",
        "3xl": "p-3xl",
        "4xl": "p-4xl",
      },
      hover: {
        true: "hover:shadow-xl hover:-translate-y-1 cursor-pointer",
      },
    },
    defaultVariants: {
      variant: "primary",
      shadow: "none",
      padding: "4xl",
      rounded: "md",
      hover: false,
    },
  }
);

function Card(props: CardProps) {
  const {
    className,
    variant,
    shadow,
    padding,
    children,
    hover,
    rounded,
    ...rest
  } = props;
  return (
    <div
      className={cn(
        cardVariants({ variant, shadow, padding, rounded, hover }),
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";

export { Card, cardVariants };
