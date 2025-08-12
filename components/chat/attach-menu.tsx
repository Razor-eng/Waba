"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Paperclip,
  ImageIcon,
  FileText,
  Sparkles,
  Mic,
  FileType,
  ShoppingBag,
} from "lucide-react";

interface AttachmentMenuProps {
  onAttachmentSelect: (type: string) => void;
}

export function AttachmentMenu({ onAttachmentSelect }: AttachmentMenuProps) {
  const attachmentOptions = [
    {
      type: "photo",
      icon: ImageIcon,
      label: "Photo/Video",
      color: "text-blue-500",
    },
    {
      type: "audio",
      icon: Mic,
      label: "Audio",
      color: "text-green-500",
    },
    {
      type: "pdf",
      icon: FileType,
      label: "PDF",
      color: "text-red-500",
    },
    {
      type: "template",
      icon: Sparkles,
      label: "Template",
      color: "text-purple-500",
    },
    {
      type: "document",
      icon: FileText,
      label: "Document",
      color: "text-orange-500",
    },
    {
      type: "products",
      icon: ShoppingBag,
      label: "Products",
      color: "text-indigo-500",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Paperclip className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-72 p-3">
        <div className="grid grid-cols-3 gap-2">
          {attachmentOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <button
                key={option.type}
                onClick={() => onAttachmentSelect(option.type)}
                className={`
                  flex flex-col items-center justify-center p-4 rounded-lg transition-colors
                   border border-gray-100 hover:border-gray-200
                `}
              >
                <div className={`p-2 rounded-full bg-white shadow-sm mb-2`}>
                  <IconComponent className={`w-5 h-5 ${option.color}`} />
                </div>
                <span className="text-xs font-medium text-gray-700 text-center">
                  {option.label}
                </span>
              </button>
            );
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
