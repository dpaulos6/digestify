'use client'

import React from 'react'
import { cn } from '@/lib/utils'

interface InputWrapperProps {
  value: string
  onChange: (value: string) => void
  className?: string
  placeholder?: string
}

export default function InputWrapper({
  value,
  onChange,
  className = '',
  placeholder = ''
}: InputWrapperProps) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        'h-full w-full resize-none p-2 cursor-default rounded-md ring-1 ring-border transition hover:ring-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      placeholder={placeholder}
    />
  )
}
