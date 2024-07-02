'use client'

import React, { useRef, useState, ReactNode, RefObject } from 'react'
import { cn } from '@/lib/utils'
import { CopyIcon, CheckIcon } from 'lucide-react'
import { toast } from './ui/use-toast'

type Position = 'inside' | 'outside'
type ContentType = 'input' | 'textarea' | 'code'

interface CopyToClipboardProps {
  children: ReactNode
  position?: Position
  contentType?: ContentType
  className?: string
}

export default function CopyToClipboardWrapper({
  children,
  position = 'inside',
  contentType = 'code',
  className = ''
}: CopyToClipboardProps) {
  const textRef = useRef<
    HTMLDivElement | HTMLTextAreaElement | HTMLInputElement
  >(null)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    if (textRef.current) {
      const text =
        textRef.current instanceof HTMLInputElement ||
        textRef.current instanceof HTMLTextAreaElement
          ? textRef.current.value
          : textRef.current.innerText
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
              Coppied <code className="code">{truncatedText}</code> to
              clipboard.
            </span>
          )
        })
        setTimeout(() => {
          setCopied(false)
        }, 2000)
      })
    }
  }

  const Component: React.ElementType =
    contentType === 'input'
      ? 'input'
      : contentType === 'textarea'
        ? 'textarea'
        : 'code'

  const isEmpty =
    !children || (typeof children === 'string' && children.trim() === '')

  return (
    <>
      <Component
        className={cn(
          className,
          position === 'inside' ? 'relative' : 'flex gap-2',
          contentType === 'code' ? 'code' : ''
        )}
        ref={textRef as RefObject<any>}
        value={contentType !== 'code' ? String(children) : undefined}
        readOnly={contentType !== 'code'}
        disabled={isEmpty && contentType !== 'code'}
      >
        {contentType === 'code' ? children : null}
      </Component>
      {!isEmpty ? (
        <CopyButton
          onClick={copyToClipboard}
          position={position}
          copied={copied}
        />
      ) : null}
    </>
  )
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  position?: Position
  copied: boolean
}

const CopyButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { position, copied, ...rest } = props
    return (
      <button
        ref={ref}
        className={cn(
          'z-10 p-1 w-fit bg-background hover:bg-border text-neutral-600 dark:text-neutral-300 rounded-md group-hover:opacity-100 group-hover:pointer-events-auto transition select-none',
          position === 'inside' ? 'absolute top-2 right-2' : ''
        )}
        {...rest}
      >
        {copied ? <CheckIcon /> : <CopyIcon />}
      </button>
    )
  }
)
CopyButton.displayName = 'Button'
