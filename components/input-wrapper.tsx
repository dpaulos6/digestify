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
      className={cn('w-full h-full resize-none p-2', className)}
      placeholder={placeholder}
    />
  )
}
