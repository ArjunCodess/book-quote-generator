"use client";

import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Wand2, ChevronDown, ChevronRight, RotateCw } from "lucide-react";
import { Template } from "@/lib/templates";
import { generateQuote } from "@/lib/gemini";

interface QuoteSettings {
  text: string[];
  fontSize: number;
  xAxis: number;
  yAxis: number;
  rotation: number;
  color: string;
}

interface QuoteEditorProps {
  settings: QuoteSettings;
  onSettingsChange: (settings: QuoteSettings) => void;
  selectedTemplate: Template;
}

export default function QuoteEditor({
  settings,
  onSettingsChange,
  selectedTemplate,
}: QuoteEditorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleTextChange = (value: string) => {
    onSettingsChange({
      ...settings,
      text: value.split("\n"),
    });
  };

  const handleGenerateClick = async () => {
    try {
      setIsGenerating(true);
      const generatedQuote = await generateQuote();
      onSettingsChange({
        ...settings,
        text: generatedQuote,
      });
    } catch (error) {
      console.error('Failed to generate quote:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid gap-6 p-6">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label className="text-base">Your Quote</Label>
          <textarea
            className="w-full min-h-[120px] p-3 border rounded-lg resize-none bg-white/50 focus:bg-white transition-colors"
            value={settings.text.join("\n")}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your inspirational quote here..."
          />
        </div>

        <div className="flex justify-between items-center border-b pb-4">
          <h3 className="text-lg font-semibold">Customize</h3>
          <Button 
            variant="outline" 
            size="sm" 
            className="shadow-sm"
            onClick={handleGenerateClick}
            disabled={isGenerating}
          >
            <Wand2 className={isGenerating ? "w-4 h-4 mr-2 animate-spin" : "w-4 h-4 mr-2"} />
            {isGenerating ? "Generating..." : "Generate with AI"}
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 text-sm font-medium text-neutral-700 hover:text-neutral-900 transition-colors"
            >
              {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
              Settings
            </button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                onSettingsChange({
                  ...settings,
                  ...selectedTemplate.defaultSettings,
                })
              }
              className="text-sm text-neutral-600 hover:text-neutral-900 gap-2"
            >
              <RotateCw className="w-3.5 h-3.5" />
              Reset to default
            </Button>
          </div>

          {isOpen && (
            <div className="space-y-8 pt-2">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium text-neutral-700">Font Size</Label>
                  <Input
                    type="number"
                    value={settings.fontSize}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        fontSize: Number(e.target.value),
                      })
                    }
                    className="w-20 text-right"
                  />
                </div>
                <Slider
                  value={[settings.fontSize]}
                  min={10}
                  max={100}
                  step={1}
                  onValueChange={([value]) =>
                    onSettingsChange({ ...settings, fontSize: value })
                  }
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>10pt</span>
                  <span>55pt</span>
                  <span>100pt</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium text-neutral-700">Position X</Label>
                  <Input
                    type="number"
                    value={settings.xAxis}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        xAxis: Number(e.target.value),
                      })
                    }
                    className="w-20 text-right"
                  />
                </div>
                <Slider
                  value={[settings.xAxis]}
                  min={0}
                  max={800}
                  step={1}
                  onValueChange={([value]) =>
                    onSettingsChange({ ...settings, xAxis: value })
                  }
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Left</span>
                  <span>Center</span>
                  <span>Right</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium text-neutral-700">Position Y</Label>
                  <Input
                    type="number"
                    value={settings.yAxis}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        yAxis: Number(e.target.value),
                      })
                    }
                    className="w-20 text-right"
                  />
                </div>
                <Slider
                  value={[settings.yAxis]}
                  min={0}
                  max={800}
                  step={1}
                  onValueChange={([value]) =>
                    onSettingsChange({ ...settings, yAxis: value })
                  }
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>Top</span>
                  <span>Middle</span>
                  <span>Bottom</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <Label className="text-sm font-medium text-neutral-700">Rotation</Label>
                  <Input
                    type="number"
                    value={settings.rotation}
                    onChange={(e) =>
                      onSettingsChange({
                        ...settings,
                        rotation: Number(e.target.value),
                      })
                    }
                    className="w-20 text-right"
                  />
                </div>
                <Slider
                  value={[settings.rotation]}
                  min={-180}
                  max={180}
                  step={1}
                  onValueChange={([value]) =>
                    onSettingsChange({ ...settings, rotation: value })
                  }
                  className="py-2"
                />
                <div className="flex justify-between text-xs text-neutral-500">
                  <span>-180°</span>
                  <span>0°</span>
                  <span>180°</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label className="text-sm font-medium text-neutral-700">Font Color</Label>
                  <div className="flex gap-2 items-center">
                    <div 
                      className="w-6 h-6 rounded-full border"
                      style={{ backgroundColor: settings.color }}
                    />
                    <Input
                      type="text"
                      value={settings.color}
                      onChange={(e) =>
                        onSettingsChange({ ...settings, color: e.target.value })
                      }
                      className="w-24 text-right"
                    />
                  </div>
                </div>
                <Input
                  type="color"
                  value={settings.color}
                  onChange={(e) =>
                    onSettingsChange({ ...settings, color: e.target.value })
                  }
                  className="w-full h-[80px] cursor-pointer rounded-lg"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
