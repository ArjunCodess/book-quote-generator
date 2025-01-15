'use client'

import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Wand2 } from 'lucide-react'

interface GenerateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onGenerate: (prompt?: string) => Promise<void>
}

export default function GenerateDialog({
  open,
  onOpenChange,
  onGenerate
}: GenerateDialogProps) {
  const [type, setType] = useState<'random' | 'custom'>('random')
  const [prompt, setPrompt] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  const handleGenerate = async () => {
    try {
      setIsGenerating(true)
      await onGenerate(type === 'custom' ? prompt : undefined)
      onOpenChange(false)
    } catch (error) {
      console.error('Failed to generate:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate with AI</DialogTitle>
          <DialogDescription>
            Can&apos;t think of a quote? We&apos;ll do the magic for you.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <RadioGroup
            defaultValue="random"
            value={type}
            onValueChange={(value) => setType(value as 'random' | 'custom')}
            className="grid gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="random" id="random" />
              <Label htmlFor="random">Random Quote</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="custom" id="custom" />
              <Label htmlFor="custom">Custom Prompt</Label>
            </div>
          </RadioGroup>

          {type === 'custom' && (
            <Textarea
              placeholder="Give some additional context on what you want out of the quote. What is the scenario? Who is the quote for?"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              className="min-h-[100px]"
            />
          )}

          <Button 
            onClick={handleGenerate} 
            className="w-full"
            disabled={isGenerating || (type === 'custom' && !prompt.trim())}
          >
            <Wand2 className={isGenerating ? "w-4 h-4 mr-2 animate-spin" : "w-4 h-4 mr-2"} />
            {isGenerating ? "Generating..." : "Generate"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
} 