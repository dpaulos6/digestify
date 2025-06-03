"use client"
import { cn } from "@/lib/utils"

interface InputWrapperProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export default function InputWrapper({
  value,
  onChange,
  className = "",
  placeholder = ""
}: InputWrapperProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "h-full w-full cursor-default resize-none rounded-md p-2 ring-1 ring-border transition hover:ring-primary focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
        className
      )}
      placeholder={placeholder}
    />
  )
}
