"use client";

import type { MessageTemplate, HeaderFormat } from "@/types";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Send } from "lucide-react";

interface TemplatePreviewProps {
  template: Partial<MessageTemplate>;
}

export default function TemplatePreview({ template }: TemplatePreviewProps) {
  const headerComponent = template.components?.find((c) => c.type === "HEADER");
  const bodyComponent = template.components?.find((c) => c.type === "BODY");
  const footerComponent = template.components?.find((c) => c.type === "FOOTER");
  const buttonsComponent = template.components?.find(
    (c) => c.type === "BUTTONS"
  );

  const replaceVariables = (text: string, examples: string[][]) => {
    let result = text;
    if (examples && examples.length > 0) {
      examples[0].forEach((example, i) => {
        result = result.replace(
          new RegExp(`\\{\\{${i + 1}\\}\\}`, "g"),
          `<span class="font-bold">${example}</span>`
        );
      });
    }
    return result;
  };

  const renderHeaderContent = (
    format: HeaderFormat,
    text?: string,
    exampleText?: string
  ) => {
    switch (format) {
      case "TEXT":
        const content = text
          ? replaceVariables(text, exampleText ? [[exampleText]] : [])
          : "Header Text";
        return (
          <div
            className="font-semibold text-lg text-center p-2"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        );
      case "IMAGE":
        return (
          <div className="relative">
            <img
              src={exampleText || "https://via.placeholder.com/300x150"}
              alt="Header preview"
              className="w-full h-auto object-cover rounded-t-lg"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/300x150";
                e.currentTarget.alt = "Failed to load header image";
              }}
            />
            {!exampleText && (
              <p className="text-red-500 text-sm text-center mt-2">
                No image provided. Using placeholder.
              </p>
            )}
          </div>
        );
      case "VIDEO":
        return (
          <video
            src={exampleText || "/placeholder.mp4"}
            controls
            className="w-full p-2"
          >
            Your browser does not support the video tag.
          </video>
        );
      case "AUDIO":
        return (
          <audio
            src={exampleText || "/placeholder.mp3"}
            controls
            className="w-full p-2"
          >
            Your browser does not support the audio tag.
          </audio>
        );
      default:
        return null;
    }
  };

  const quickReplyButtons =
    buttonsComponent?.buttons?.filter((btn) => btn.type === "QUICK_REPLY") ||
    [];
  const callToActionButtons =
    buttonsComponent?.buttons?.filter(
      (btn) => btn.type === "PHONE_NUMBER" || btn.type === "URL"
    ) || [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden flex flex-col"
    >
      <CardHeader className="bg-green-500 text-white p-3 text-center">
        <CardTitle className="text-lg">WhatsApp Message Preview</CardTitle>
      </CardHeader>
      <CardContent className="p-0 flex-1 flex flex-col justify-end">
        <div className="bg-gray-100 p-4 min-h-[200px] flex flex-col justify-end">
          <div className="bg-white rounded-lg p-3 shadow-md max-w-[85%] self-end min-h-[100px]">
            {headerComponent &&
              headerComponent.format !== "NONE" &&
              renderHeaderContent(
                headerComponent.format!,
                headerComponent.text,
                headerComponent.example?.header_text?.[0]
              )}
            <p
              className="text-sm text-gray-800 mt-2"
              dangerouslySetInnerHTML={{
                __html: bodyComponent?.text
                  ? replaceVariables(
                      bodyComponent.text,
                      bodyComponent.example?.body_text || []
                    )
                  : "Body text goes here...",
              }}
            />
            {footerComponent && (
              <p className="text-xs text-gray-500 mt-2">
                {footerComponent.text || "Footer text goes here..."}
              </p>
            )}
            {callToActionButtons.length > 0 && (
              <div
                className={cn(
                  "flex flex-col border-t border-gray-200 pt-2 mt-2",
                  callToActionButtons.length === 2 && "grid grid-cols-2 gap-1"
                )}
              >
                {callToActionButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full rounded-md text-blue-600 bg-blue-50/50 hover:bg-blue-100/50"
                  >
                    {button.text || `Call to Action ${index + 1}`}
                  </Button>
                ))}
              </div>
            )}
            {quickReplyButtons.length > 0 && (
              <div className="flex flex-col border-t border-gray-200 pt-2 mt-2">
                {quickReplyButtons.map((button, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full rounded-md text-blue-600 bg-blue-50/50 hover:bg-blue-100/50 mt-1"
                  >
                    {button.text || `Quick Reply ${index + 1}`}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
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
    </motion.div>
  );
}
