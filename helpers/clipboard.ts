import copy from 'copy-to-clipboard'

export const copyToClipboard = (str: string, button: HTMLButtonElement) => {
  copy(str)
  const initialButton = button.innerHTML
  button.innerHTML = `<Check className="h-6 w-6" />`
  setTimeout(() => {
    button.innerHTML = initialButton
  }, 2500)
}
