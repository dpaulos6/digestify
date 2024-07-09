'use client'

import React, { useRef, useState, ReactNode } from 'react'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { toast } from './ui/use-toast'
import { cn } from '@/lib/utils'
import { Fira_Code } from 'next/font/google'

const firacode = Fira_Code({ subsets: ['latin'] })

interface OutputWrapperProps {
  children: ReactNode
  className?: string
  title?: string
}

export default function OutputWrapper({
  children,
  className,
  title = 'output'
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
    <div
      className={cn(
        'relative flex h-full w-full max-w-5xl flex-col overflow-hidden rounded-lg border bg-background-hover sm:min-w-[400px]',
        className
      )}
    >
      <div className="flex items-center justify-between bg-background-hover p-2">
        <span className="ml-2 line-clamp-1 text-sm text-foreground/50 xs:text-base sm:text-lg">
          {title}
        </span>
        <CopyButton
          copied={copied}
          onClick={copyToClipboard}
          disabled={!children}
        />
      </div>
      <pre
        className={cn(
          'min-h-10 w-full flex-1 whitespace-pre-wrap break-words p-3 font-mono text-sm xs:text-base',
          firacode.className
        )}
        ref={textRef}
      >
        {children}
      </pre>
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
        className={cn(
          'select-none rounded-md bg-border p-1 text-neutral-600 transition hover:brightness-95 disabled:pointer-events-none disabled:opacity-0 dark:text-neutral-300 dark:hover:brightness-125'
        )}
        {...rest}
      >
        {copied ?
          <span className="flex gap-1 text-sm xs:text-base">
            <CheckIcon className="h-5 w-5 xs:h-6 xs:w-6" />
            Copied
          </span>
        : <span className="flex gap-1 text-sm xs:text-base">
            <CopyIcon className="h-5 w-5 xs:h-6 xs:w-6" />
            Copy
          </span>
        }
      </button>
    )
  }
)
CopyButton.displayName = 'CopyButton'
