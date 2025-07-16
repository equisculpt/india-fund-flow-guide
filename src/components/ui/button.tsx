import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:scale-105",
  {
    variants: {
      variant: {
        default: "bg-gradient-primary hover:bg-primary-glow text-primary-foreground shadow-glass hover:shadow-glow",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-glass",
        outline:
          "border border-primary/30 bg-gradient-glass backdrop-blur-md hover:bg-primary/10 hover:text-primary hover:border-primary/50 shadow-glass",
        secondary:
          "bg-gradient-secondary text-secondary-foreground hover:bg-secondary-glow shadow-glass hover:shadow-glow",
        ghost: "hover:bg-primary/10 hover:text-primary transition-all duration-300",
        link: "text-primary underline-offset-4 hover:underline hover:text-primary-glow",
        luxury: "bg-gradient-glass backdrop-blur-xl border border-secondary/30 text-foreground hover:border-secondary/50 hover:bg-secondary/10 shadow-luxury hover:shadow-glow",
        premium: "bg-gradient-to-r from-primary via-primary-glow to-secondary text-primary-foreground shadow-luxury hover:shadow-glow relative overflow-hidden",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-12 rounded-xl px-8 text-base font-bold",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
