'use client'

import JSON5 from 'json5'
import PageWrapper from '@/components/PageWrapper'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { copyToClipboard } from '@/utils/copy'
import { useState } from 'react'
import { Editor, type Monaco } from '@monaco-editor/react'
import { ashenVibrant } from './theme'

export default function JsonTools() {
  const [inputValue, setInputValue] = useState('')

  const handleEditorDidMount = (monaco: Monaco) => {
    monaco.editor.defineTheme('AshenVibrant', {
      base: 'vs-dark',
      inherit: true,
      rules: [],
      ...ashenVibrant
    })
  }

  const handleFormat = () => {
    try {
      if (inputValue === '') return
      const parsed = JSON.parse(inputValue)
      setInputValue(JSON.stringify(parsed, null, 2))
    } catch (e) {
      toast({
        variant: 'destructive',
        description: <span>{String(e)}</span>
      })
    }
  }

  const handleValidate = () => {
    try {
      if (inputValue === '') return

      JSON5.parse(inputValue)

      toast({
        description: <span>Valid JSON!</span>
      })
    } catch (e) {
      toast({
        variant: 'destructive',
        description: <span>{String(e)}</span>
      })
    }
  }

  const handleRemoveWhitespaces = () => {
    setInputValue(inputValue.replace(/\s/g, ''))
  }

  const handlePaste = async () => {
    const text = await navigator.clipboard.readText()
    setInputValue(text)
  }

  const handleCopy = async () => {
    if (!inputValue) return
    const response = copyToClipboard(inputValue)
    toast({
      description: (
        <span>
          Copied <code className="code">{response}</code> to clipboard.
        </span>
      )
    })
  }

  const handleClear = () => {
    setInputValue('')
  }

  return (
    <PageWrapper title="JSON Tools">
      <div className="flex flex-wrap gap-2 items-center">
        <Button variant="outline" onClick={handlePaste}>
          Paste
        </Button>
        <Button variant="outline" onClick={handleCopy}>
          Copy
        </Button>
        <Button variant="outline" onClick={handleClear}>
          Clear
        </Button>
        <Separator orientation="vertical" className="bg-white/10 h-8" />
        <Button variant="outline" onClick={handleFormat} disabled={!inputValue}>
          Format
        </Button>
        <Button
          variant="outline"
          onClick={handleValidate}
          disabled={!inputValue}
        >
          Validate
        </Button>
        <Button
          variant="outline"
          onClick={handleRemoveWhitespaces}
          disabled={!inputValue}
        >
          Remove whitespaces
        </Button>
      </div>
      <Editor
        height="100%"
        width="100%"
        language="json"
        value={inputValue}
        onChange={(value) => setInputValue(value || '')}
        className="min-h-[50dvh] rounded-md overflow-x-hidden"
        theme="AshenVibrant"
        options={{
          minimap: { enabled: false },
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          wordWrap: 'off',
          fontSize: 14,
          tabSize: 4
        }}
        beforeMount={handleEditorDidMount}
      />
    </PageWrapper>
  )
}
