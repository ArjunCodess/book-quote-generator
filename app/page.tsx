"use client";

import { useState } from "react";
import QuoteEditor from "@/components/quote-editor";
import QuoteCanvas from "@/components/quote-canvas";
import TemplateSelector from "@/components/template-selector";
import { Button } from "@/components/ui/button";
import { Download, Quote } from "lucide-react";
import { downloadQuoteImage } from "@/lib/download";
import { templates } from "@/lib/templates";

export default function Page() {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [settings, setSettings] = useState({
    text: [
      "life is a journey, not a destination.",
      "embrace the ride, cherish every moment.",
      "for in the end, memories are all.",
    ],
    ...templates[0].defaultSettings,
  });

  const handleTemplateChange = (template: (typeof templates)[0]) => {
    setSelectedTemplate(template);
    setSettings((prev) => ({
      ...prev,
      ...template.defaultSettings,
    }));
  };

  const handleDownload = () => {
    downloadQuoteImage("quote-canvas-container");
  };

  return (
    <div className="min-h-screen bg-neutral-50/50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Quote className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent">
              Book Quote Generator
            </h1>
          </div>
          <Button onClick={handleDownload} className="shadow-sm">
            <Download className="w-4 h-4 mr-2" />
            Download Quote
          </Button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border">
              <QuoteEditor 
                settings={settings} 
                onSettingsChange={setSettings} 
                selectedTemplate={selectedTemplate} 
              />
            </div>
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <TemplateSelector
                templates={templates}
                selectedTemplate={selectedTemplate}
                onSelectTemplate={handleTemplateChange}
              />
            </div>
          </div>
          <div className="lg:sticky lg:top-[100px]">
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h2 className="text-lg font-semibold mb-6 text-neutral-800">Preview</h2>
              <QuoteCanvas
                {...settings}
                backgroundImage={selectedTemplate.backgroundImage}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
