import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof buttonVariants>;

const buttonVariants = cva("rounded-md font-medium transition-all duration-200", {
  variants: {
    variant: {
      default: "bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500",
      outline: "border-2 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800",
      ghost: "hover:bg-gray-100 dark:hover:bg-gray-800",
      destructive: "bg-red-600 text-white hover:bg-red-700",
    },
    size: {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3",
    },
    disabled: {
      true: "opacity-50 cursor-not-allowed",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "md",
  },
});

function Button(props: ButtonProps) {
  const { className, variant, size, disabled, children, ...rest } = props;
  
  return (
    <button className={cn(buttonVariants({ variant, size, disabled }), className)} disabled={disabled} {...rest}>
      {children}
    </button>
  );
}

Button.displayName = "Button";

export { Button };
