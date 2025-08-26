"use client"

import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

// 🎨 Gradiente marca (activa / disabled) + Outline blanco
const buttonVariants = cva(
  // base
  "inline-flex items-center justify-center whitespace-nowrap rounded-2xl font-semibold transition-all " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
    "ring-offset-background disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        // ✅ DEFAULT = GRADIENT (azul → violeta → magenta)
        default:
          "bg-gradient-to-r from-[#00C2FF] via-[#7C4DFF] to-[#FF2D87] text-white " +
          "shadow-lg hover:shadow-xl hover:brightness-110 active:brightness-95",

        // 🔲 Outline blanco (como el 1º botón de tu imagen)
        outline:
          "bg-transparent border border-white/80 text-white " +
          "hover:bg-white/10",

        // 👻 Ghost por si lo usas en algún lado
        ghost: "bg-transparent hover:bg-white/10 text-white",

        // 🔗 Link (sin cambios)
        link: "text-white underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-6 text-base",
        sm: "h-9 px-4 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      // 🚫 Disabled sobre gradiente = texto gris claro (3º botón de tu imagen)
      {
        variant: "default",
        class:
          "disabled:opacity-100 disabled:brightness-90 disabled:text-white/70",
      },
      // Disabled en outline
      {
        variant: "outline",
        class: "disabled:opacity-60",
      },
    ],
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
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }