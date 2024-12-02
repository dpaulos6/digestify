export const copyToClipboard = async (str: string) => {
  await navigator.clipboard.writeText(str)
  function truncateText(text: string, maxLength = 12) {
    if (text.length <= maxLength) {
      return text
    }
    return `${text.slice(0, maxLength)}...`
  }
  const truncatedText = truncateText(str, 16)
  return truncatedText
}
