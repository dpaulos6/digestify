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
  type?: 'code' | 'default'
  buttonPosition?: ButtonPosition
  buttonAlignment?: ButtonAlignment
}

export default function OutputWrapper({
  children,
  className,
  type = 'default',
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
    <div
      className={cn(
        'relative h-full w-full',
        buttonPosition === 'outside' &&
          'flex flex-wrap items-start gap-2 sm:items-center',
        className
      )}
    >
      <pre
        className={cn(
          'whitespace-pre-wrap break-words font-mono',
          type === 'code' &&
            'code max-w-[16rem] xs:max-w-xs sm:max-w-md md:max-w-lg lg:max-w-5xl'
        )}
        ref={textRef}
      >
        {children}
      </pre>
      {children ?
        <CopyButton
          onClick={copyToClipboard}
          copied={copied}
          wrapperType={type}
          buttonPosition={buttonPosition}
          buttonAlignment={buttonAlignment}
        />
      : null}
    </div>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  copied: boolean
  wrapperType: 'code' | 'default'
  buttonPosition: ButtonPosition
  buttonAlignment: ButtonAlignment
}

const CopyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ copied, wrapperType, buttonPosition, buttonAlignment, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'select-none rounded-md bg-border p-1 text-neutral-600 transition hover:brightness-95 dark:text-neutral-300 dark:hover:brightness-125',
          wrapperType !== 'code' ?
            buttonPosition === 'inside' ?
              `absolute ${buttonAlignment.includes('top') ? 'top-1' : 'bottom-1'} ${buttonAlignment.includes('right') ? 'right-1' : 'left-1'}`
            : '-right-2 top-1/2 ml-auto flex -translate-y-1/2 translate-x-full'
          : ''
        )}
        {...rest}
      >
        {copied ?
          <span className="flex gap-1">
            <CheckIcon />
            Copied
          </span>
        : <span className="flex gap-1">
            <CopyIcon />
            Copy
          </span>
        }
      </button>
    )
  }
)
CopyButton.displayName = 'CopyButton'
