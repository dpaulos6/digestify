import copy from 'copy-to-clipboard'

export const copyToClipboard = (str: string, button: HTMLButtonElement) => {
  copy(str)
  const initialButton = button.innerHTML
  button.innerText = "Coppied!" 

  setTimeout(() => {
    button.innerHTML = initialButton
  }, 2500)
}
