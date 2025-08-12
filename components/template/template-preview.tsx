import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import { CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import type { MessageTemplate } from "@/types";
import type { JSX } from "react/jsx-runtime";

interface TemplatePreviewProps {
  templateData: Partial<MessageTemplate>;
}

export function TemplatePreview({ templateData }: TemplatePreviewProps) {
  const replaceTemplateVariables = (text: string) => {
    if (!text) return text;

    const sampleValues: { [key: string]: string } = {
      "{{1}}": "John",
      "{{2}}": "Smith",
      "{{3}}": "Premium",
      "{{4}}": "$99",
      "{{5}}": "December 25th",
      "{{6}}": "ABC Company",
      "{{7}}": "123-456-7890",
      "{{8}}": "support@company.com",
      "{{9}}": "New York",
      "{{10}}": "Order #12345",
    };

    const parts: (string | JSX.Element)[] = [];
    let lastIndex = 0;

    const variableRegex = /\{\{\d+\}\}/g;
    let match;
    let keyCounter = 0;

    while ((match = variableRegex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }

      const variable = match[0];
      const replacement = sampleValues[variable] || variable;
      parts.push(
        <strong key={`var-${keyCounter++}`} className="font-bold text-gray-900">
          {replacement}
        </strong>
      );

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }

    return parts.length > 1 ? <>{parts}</> : text;
  };

  if (!templateData.components || templateData.components.length === 0) {
    return (
      <div className="flex items-center justify-center h-full min-h-[300px] text-gray-500">
        <div className="text-center max-w-xs">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Smartphone className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="font-medium text-gray-900 mb-2">
            Preview will appear here
          </h3>
          <p className="text-sm text-gray-500">
            Start building your template to see a live preview
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col min-h-[500px]"
    >
      <CardHeader className="bg-green-500 text-white">
        <div className="bg-green-500 px-2 py-3 flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-full" />
          </div>
          <div className="flex flex-col items-start">
            <div className="text-white font-medium text-sm">
              WhatsApp Business
            </div>
            <div className="text-white/80 text-xs">Template Preview</div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col justify-end">
        <div className="p-4 bg-gray-50 min-h-[200px] flex-1 flex items-end justify-end">
          <div className="bg-white rounded-lg shadow-sm p-4 space-y-3 max-w-[280px] min-h-40 min-w-40">
            {templateData.components.map((component, index) => {
              switch (component.type) {
                case "HEADER":
                  if (component.format === "IMAGE") {
                    const imageUrl = component.example?.header_text?.[0];
                    return (
                      <div key={index} className="pb-2">
                        {imageUrl ? (
                          <img
                            src={imageUrl || "/placeholder.svg"}
                            alt="Header image"
                            className="w-full h-32 object-cover rounded-lg"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src =
                                "/placeholder.svg?height=128&width=280&text=Image+Preview";
                            }}
                          />
                        ) : (
                          <img
                            src={"/placeholder.svg"}
                            alt="Header image"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        )}
                      </div>
                    );
                  } else if (component.format === "VIDEO") {
                    const videoUrl = component.example?.header_text?.[0];
                    return (
                      <div key={index} className="pb-2">
                        {videoUrl ? (
                          <video
                            src={videoUrl}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          />
                        ) : (
                          <video
                            src={"dummy"}
                            className="w-full h-32 object-cover rounded-lg"
                            controls
                          />
                        )}
                      </div>
                    );
                  } else if (component.format === "AUDIO") {
                    const audioUrl = component.example?.header_text?.[0];
                    return (
                      <div key={index} className="pb-2">
                        {audioUrl ? (
                          <div className="bg-gray-100 rounded-lg p-3">
                            <audio src={audioUrl} controls className="w-full" />
                          </div>
                        ) : (
                          <div className="w-full h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                            <div className="text-center text-gray-500">
                              <div className="flex items-center gap-1 justify-center mb-1">
                                <div className="w-1 h-3 bg-gray-400 rounded"></div>
                                <div className="w-1 h-4 bg-gray-400 rounded"></div>
                                <div className="w-1 h-2 bg-gray-400 rounded"></div>
                                <div className="w-1 h-4 bg-gray-400 rounded"></div>
                              </div>
                              <span className="text-xs">Audio Preview</span>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  } else if (component.format === "TEXT" && component.text) {
                    return (
                      <div
                        key={index}
                        className="font-semibold text-sm text-gray-900 pb-2"
                      >
                        {replaceTemplateVariables(component.text)}
                      </div>
                    );
                  }
                  return null;
                case "BODY":
                  return (
                    <div
                      key={index}
                      className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed"
                    >
                      {replaceTemplateVariables(component.text || "")}
                    </div>
                  );
                case "FOOTER":
                  return (
                    <div
                      key={index}
                      className="text-xs text-gray-500 border-t pt-2 italic"
                    >
                      {replaceTemplateVariables(component.text || "")}
                    </div>
                  );
                case "BUTTONS":
                  return (
                    <div key={index} className="space-y-2 pt-2">
                      {component.buttons?.map((button, btnIndex) => (
                        <div
                          key={btnIndex}
                          className="bg-primary hover:bg-primary/85 text-white text-center py-2.5 px-4 rounded-lg text-sm font-medium transition-colors cursor-pointer"
                        >
                          {replaceTemplateVariables(button.text)}
                        </div>
                      ))}
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>

        <div className="p-3 border-t border-gray-200 flex items-center gap-2 bg-white">
          <Input
            placeholder="Message"
            className="flex-1 rounded-full bg-gray-100 border-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Button
            size="icon"
            className="rounded-full bg-green-500 hover:bg-green-600 text-white"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </motion.div>
  );
}
