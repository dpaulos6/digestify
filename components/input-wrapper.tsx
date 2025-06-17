"use client"

import { cn } from "@/lib/utils"
import type React from "react"

interface InputWrapperProps
  extends Omit<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    "value" | "onChange"
  > {
  value: string
  onChange: (value: string) => void
}

export default function InputWrapper({
  value,
  onChange,
  className,
  rows = 1,
  ...props
}: InputWrapperProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-full w-full cursor-default resize-none rounded-md bg-background p-2 ring-1 ring-border transition hover:ring-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      rows={rows}
      {...props}
    />
  )
}
