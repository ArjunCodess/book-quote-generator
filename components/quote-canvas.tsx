'use client'

import { useEffect, useRef, useState } from 'react'
import { Loader2 } from 'lucide-react'

interface QuoteCanvasProps {
  text: string[]
  fontSize: number
  xAxis: number
  yAxis: number
  rotation: number
  color: string
  backgroundImage: string
}

export default function QuoteCanvas({
  text,
  fontSize,
  xAxis,
  yAxis,
  rotation,
  color,
  backgroundImage
}: QuoteCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    setIsLoading(true)

    // Set canvas size
    canvas.width = 800
    canvas.height = 800

    // Load and draw background image
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.src = backgroundImage
    
    img.onload = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Draw background
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      
      // Setup text properties
      ctx.font = `${fontSize}px serif`
      ctx.fillStyle = color
      
      // Save context state
      ctx.save()
      
      // Move to position and rotate
      ctx.translate(xAxis, yAxis)
      ctx.rotate((rotation * Math.PI) / 180)
      
      // Draw each line of text
      text.forEach((line, index) => {
        ctx.fillText(line, 0, index * (fontSize * 1.5))
      })
      
      // Restore context state
      ctx.restore()
      setIsLoading(false)
    }

    img.onerror = () => {
      setIsLoading(false)
    }
  }, [text, fontSize, xAxis, yAxis, rotation, color, backgroundImage])

  return (
    <div className="relative w-full aspect-square">
      <div id="quote-canvas-container" className="absolute inset-0">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>

      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-neutral-50/80 rounded-lg">
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin text-neutral-500" />
            <span className="text-sm text-neutral-500">Loading template...</span>
          </div>
        </div>
      )}
    </div>
  )
}