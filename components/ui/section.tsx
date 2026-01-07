import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import type { ClassValue } from "clsx";
import { PropsWithChildren } from "react";

const sectionVariants = cva("xs:px-xl md:px-4xl flex ", {
  variants: {
    fullWidth: {
      true: "w-full",
      false: "mx-auto max-w-screen-lg",
    },
    orientation: {
      horizontal: "flex-row",
      vertical: "flex-col",
    },
    /** pc gap的间距是mobile的2倍 */
    gap: {
      none: "gap-none",
      xs: "md:gap-xs gap-xss",
      sm: "md:gap-sm gap-[3px]",
      md: "md:gap-md gap-xs",
      lg: "md:gap-lg gap-sm",
      xl: "md:gap-xl gap-md",
      "2xl": "md:gap-2xl gap-[10px]",
      "3xl": "md:gap-3xl gap-lg",
      "4xl": "md:gap-4xl gap-xl",
      "5xl": "md:gap-5xl gap-2xl",
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
    fullWidth: false,
    orientation: "vertical",
    gap: "4xl",
    justify: "start",
    align: "start",
    wrap: "wrap",
  },
});

export interface SectionProps extends VariantProps<typeof sectionVariants>, PropsWithChildren {
  sectionName?: string;
  className?: ClassValue;
  style?: React.CSSProperties;
  containerClassName?: ClassValue;
  containerStyle?: React.CSSProperties;
}

function Section(props: SectionProps) {
  const { children, className, style, containerClassName, containerStyle, sectionName, ...restProps } = props;
  return (
    <section className={cn("w-full py-5xl md:py-8xl ", sectionName, containerClassName)} style={containerStyle}>
      <div
        className={cn(
          sectionVariants({ ...restProps }),

          className
        )}
        style={style}>
        {children}
      </div>
    </section>
  );
}

Section.displayName = "Section";

export { Section };
