import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/** shadcn/ui Button, adapted to the portfolio design tokens. */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-brand text-white font-semibold shadow-sm shadow-brand/20 hover:bg-blue-700 hover:-translate-y-px hover:shadow-md hover:shadow-brand/25 active:translate-y-0",
        navy:
          "bg-navy text-white font-semibold hover:bg-slate-800 dark:bg-white dark:text-navy dark:hover:bg-slate-200 hover:-translate-y-px active:translate-y-0",
        light:
          "bg-white text-navy font-semibold hover:bg-slate-100 hover:-translate-y-px active:translate-y-0",
        outline:
          "border border-border bg-card text-foreground hover:border-accent hover:-translate-y-px active:translate-y-0",
        ghost: "text-foreground hover:bg-surface",
        link: "text-link underline-offset-4 hover:underline px-0",
      },
      size: {
        default: "h-10 px-4",
        sm: "h-9 px-3 text-[13px]",
        lg: "h-11 px-5 text-[15px]",
        icon: "size-9",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}

export { Button, buttonVariants };
