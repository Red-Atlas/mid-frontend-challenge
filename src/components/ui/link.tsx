import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";
import { Link as ReactRouterLink, LinkProps } from "react-router-dom";

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

type ButtonProps = LinkProps & VariantProps<typeof buttonVariants>;

export default function Link({ variant, className, ...props }: ButtonProps) {
  return (
    <ReactRouterLink
      className={cn(buttonVariants({ variant, className }))}
      {...props}
    >
      {props.children}
    </ReactRouterLink>
  );
}
