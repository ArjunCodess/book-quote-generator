export async function downloadQuoteImage(elementId: string) {
  try {
    const element = document.getElementById(elementId)
    if (!element) return

    // Create a temporary canvas for the final image
    const tempCanvas = document.createElement('canvas')
    tempCanvas.width = 800
    tempCanvas.height = 800
    const ctx = tempCanvas.getContext('2d')
    if (!ctx) return

    // Get the background image
    const backgroundImg = element.querySelector('img')
    if (!backgroundImg) return

    // Get the text canvas
    const textCanvas = element.querySelector('canvas')
    if (!textCanvas) return

    // Draw background image
    ctx.drawImage(backgroundImg, 0, 0, 800, 800)
    
    // Draw text overlay
    ctx.drawImage(textCanvas, 0, 0, 800, 800)

    // Convert to data URL and download
    const dataUrl = tempCanvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.download = 'book-quote.png'
    link.href = dataUrl
    link.click()
  } catch (error) {
    console.error('Error downloading image:', error)
  }
}

