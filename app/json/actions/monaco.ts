import type { Monaco } from '@monaco-editor/react'
import { ashenVibrant } from '../theme'

export const handleEditorDidMount = (monaco: Monaco) => {
  monaco.editor.defineTheme('AshenVibrant', {
    base: 'vs-dark',
    inherit: true,
    rules: [],
    ...ashenVibrant
  })
}
