interface QuotePreviewProps {
  text: string[]
  fontSize: number
  xAxis: number
  yAxis: number
  rotation: number
  color: string
}

export default function QuotePreview({
  text,
  fontSize,
  xAxis,
  yAxis,
  rotation,
  color
}: QuotePreviewProps) {
  return (
    <div className="relative w-full h-full min-h-[600px] bg-[#e6ddd4] rounded-lg overflow-hidden">
      <div 
        className="absolute p-8"
        style={{
          transform: `translate(${xAxis}px, ${yAxis}px) rotate(${rotation}deg)`,
          color: color,
          fontSize: `${fontSize}px`,
          lineHeight: 1.5,
          fontFamily: 'serif'
        }}
      >
        {text.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </div>
  )
}

