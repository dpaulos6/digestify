export const copyToClipboard = async (str: string) => {
  await navigator.clipboard.writeText(str)
  function truncateText(text: string, maxLength = 12) {
    if (text.length <= maxLength) {
      return text
    }
    return `${text.slice(0, maxLength)}...`
  }
  const MAX_CLIPBOARD_DISPLAY_LENGTH = 16
  const truncatedText = truncateText(str, MAX_CLIPBOARD_DISPLAY_LENGTH)
  return truncatedText
}
