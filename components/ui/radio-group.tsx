"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"

import { cn } from "@/lib/utils"

function RadioGroup({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={cn("grid gap-3", className)}
      {...props}
    />
  )
}

function RadioGroupItem({
  className,
  icon,
  title,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item> & {
  icon?: React.ReactNode;
  title?: string;
}) {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-md border p-4 shadow-sm transition-all hover:shadow-md",
        "focus-visible:border-ring focus-visible:ring-ring/50",
        "data-[state=checked]:bg-brand/10 data-[state=checked]:text-brand data-[state=checked]:shadow-lg data-[state=checked]:border-brand",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      {icon && <span className="text-brand">{icon}</span>}
      {title && <span className="text-sm font-medium text-brand">{title}</span>}
    </RadioGroupPrimitive.Item>
  )
}

export { RadioGroup, RadioGroupItem }
