'use client'

import React, { useRef, useState, ReactNode } from 'react'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { toast } from './ui/use-toast'
import { cn } from '@/lib/utils'

type ButtonPosition = 'inside' | 'outside'
type ButtonAlignment = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'

interface OutputWrapperProps {
  children: ReactNode
  className?: string
  buttonPosition?: ButtonPosition
  buttonAlignment?: ButtonAlignment
}

export default function OutputWrapper({
  children,
  className = '',
  buttonPosition = 'inside',
  buttonAlignment = 'top-right'
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
    <div className={cn('relative w-full h-full', className)}>
      <pre
        className={cn('px-2 py-1 whitespace-pre-wrap break-words font-mono')}
        ref={textRef}
      >
        {children}
      </pre>
      <CopyButton
        onClick={copyToClipboard}
        copied={copied}
        buttonPosition={buttonPosition}
        buttonAlignment={buttonAlignment}
      />
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  copied: boolean
  buttonPosition: ButtonPosition
  buttonAlignment: ButtonAlignment
}

const CopyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ copied, buttonPosition, buttonAlignment, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'absolute p-1 bg-border hover:brightness-95 dark:hover:brightness-125 text-neutral-600 dark:text-neutral-300 rounded-md transition select-none',
          buttonPosition === 'inside'
            ? `${buttonAlignment.includes('top') ? 'top-1' : 'bottom-1'} ${buttonAlignment.includes('right') ? 'right-1' : 'left-1'}`
            : 'top-1/2 -translate-y-1/2 -right-2 translate-x-full'
        )}
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