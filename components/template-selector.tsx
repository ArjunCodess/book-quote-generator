'use client'

import Image from 'next/image'
import { Template } from '@/lib/templates'
import { cn } from "@/lib/utils"
import { Label } from './ui/label'
import { CheckCircle2 } from 'lucide-react'

interface TemplateSelectorProps {
  templates: Template[]
  selectedTemplate: Template
  onSelectTemplate: (template: Template) => void
}

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onSelectTemplate
}: TemplateSelectorProps) {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-base font-semibold text-neutral-800">Template Style</Label>
        <span className="text-xs text-neutral-500">{templates.length} available</span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => {
          const isSelected = template.id === selectedTemplate.id;
          return (
            <button
              key={template.id}
              onClick={() => onSelectTemplate(template)}
              className={cn(
                "group relative aspect-[4/3] overflow-hidden rounded-lg transition-all",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                isSelected ? "ring-2 ring-primary ring-offset-2" : "ring-1 ring-neutral-200 hover:ring-primary/50"
              )}
            >
              <Image
                src={template.backgroundImage}
                alt={template.name}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className={cn(
                "absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity",
                isSelected ? "opacity-0" : "opacity-0 group-hover:opacity-100"
              )}>
                <span className="text-sm font-medium text-white">{template.name}</span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="w-5 h-5 text-primary bg-white rounded-full" />
                </div>
              )}
            </button>
          )
        })}
      </div>
    </div>
  )
}

