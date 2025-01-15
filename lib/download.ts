import html2canvas from 'html2canvas'

export async function downloadQuoteImage(elementId: string) {
  try {
    const element = document.getElementById(elementId)
    if (!element) return

    const canvas = await html2canvas(element, {
      scale: 2, // Higher resolution
      backgroundColor: null,
      useCORS: true
    })

    const dataUrl = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'book-quote.png'
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

