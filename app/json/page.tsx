'use client'

import JSON5 from 'json5'
import PageWrapper from '@/components/PageWrapper'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { toast } from '@/components/ui/use-toast'
import { copyToClipboard } from '@/utils/copy'
import { useRef, useState } from 'react'
import { Editor, type Monaco } from '@monaco-editor/react'
import { ashenVibrant } from './theme'

export default function JsonTools() {
  const [inputValue, setInputValue] = useState('')
  const hiddenFileInput = useRef<HTMLInputElement | null>(null)

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
      const parsed = JSON5.parse(inputValue)
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

  const handleExport = () => {
    const blob = new Blob([inputValue], { type: 'application/json' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a') // Create an anchor element
    a.href = url
    a.download = 'export.json' // Specify the download file name
    document.body.appendChild(a) // Append the anchor to the body (optional but ensures DOM presence)
    a.click() // Programmatically click the anchor
    document.body.removeChild(a) // Remove the anchor after click
    URL.revokeObjectURL(url) // Release the object URL
  }

  const handleButtonClick = () => {
    hiddenFileInput.current?.click() // Trigger the hidden input's click event
  }

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] // Get the selected file
    if (file && file.type === 'application/json') {
      const reader = new FileReader()

      reader.onload = (e) => {
        if (e.target?.result) {
          try {
            const data = JSON.parse(e.target.result as string) // Parse JSON
            console.log('Imported JSON Data:', data)
            // Use the imported data as needed
            setInputValue(JSON.stringify(data, null, 2))
          } catch (error) {
            console.error('Error parsing JSON:', error)
          }
        }
        event.target.value = '' // Reset the input value
      }

      reader.readAsText(file) // Read the file content as text
    } else {
      console.error('Please select a valid JSON file.')
      event.target.value = '' // Reset the input value
    }
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
        <Separator orientation="vertical" className="bg-white/10 h-8" />
        <Button variant="outline" onClick={handleExport} disabled={!inputValue}>
          Export
        </Button>
        <Button variant="outline" onClick={handleButtonClick}>
          Import
        </Button>
        <input
          type="file"
          accept="application/json"
          ref={hiddenFileInput}
          className="hidden"
          onChange={handleImport}
        />
      </div>
      <Editor
        height="100%"
        width="100%"
        language="json"
        value={inputValue}
        onChange={(value) => setInputValue(value || '')}
        className="min-h-[50dvh] rounded-md "
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
