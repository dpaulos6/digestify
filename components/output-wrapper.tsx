'use client'

import React, { useRef, useState, ReactNode } from 'react'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { toast } from './ui/use-toast'
import { cn } from '@/lib/utils'

interface OutputWrapperProps {
  children: ReactNode
  className?: string
}

export default function OutputWrapper({
  children,
  className = ''
}: OutputWrapperProps) {
  const textRef = useRef<HTMLPreElement>(null)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (textRef.current) {
      const text = textRef.current.innerText
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true)

        function truncateText(text: string, maxLength = 12) {
          if (text.length <= maxLength) {
            return text
          }
          return text.slice(0, maxLength) + '...'
        }
        const truncatedText = truncateText(text, 16)

        toast({
          description: (
            <span>
              Copied <code className="code">{truncatedText}</code> to clipboard.
            </span>
          )
        })
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
    }
  }

  return (
    <div className={`relative w-full h-full`}>
      <pre
        className={cn(
          'p-2 whitespace-pre-wrap break-words font-mono',
          className
        )}
        ref={textRef}
      >
        {children}
      </pre>
      <CopyButton onClick={copyToClipboard} copied={copied} />
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  copied: boolean
}

const CopyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ copied, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className="absolute top-1 right-1 p-1 bg-background hover:bg-border text-neutral-600 dark:text-neutral-300 rounded-md transition select-none"
        {...rest}
      >
        {copied ? (
          <span className="flex gap-1">
            <CheckIcon />
            Copied
          </span>
        ) : (
          <span className="flex gap-1">
            <CopyIcon />
            Copy
          </span>
        )}
      </button>
    )
  }
)
CopyButton.displayName = 'CopyButton'
