import { ButtonHTMLAttributes, forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "relative h-full flex items-center gap-2 justify-center overflow-hidden font-semibold",
  {
    variants: {
      variant: {
        default:
          "before:absolute before:content-[''] before:-bottom-1 before:w-full before:h-1 before:bg-red-700 before:rounded-t-xl hover:before:bottom-0 before:transition-all before:duration-100 before:ease-in-out",
        secondary:
          "hover:bg-neutral-300/20 hover:border-neutral-300/40 text-sm border-transparent border-2 py-2 px-4 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
//   VariantProps<typeof buttonVariants>;

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(function (
  { asChild, variant, className, ...props },
  ref
) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {props.children}
    </Comp>
  );
});

export default Button;
