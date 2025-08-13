"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import type { MessageTemplate, TemplateBuilderSection } from "@/types";
import TemplateForm from "@/components/template/template-form";
import TemplateStepsNav from "@/components/template/template-steps-nav";
import { Eye, Smartphone, Send } from "lucide-react";
import { TemplatePreview } from "../template/template-preview";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface TemplateCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendTemplate?: (template: MessageTemplate) => void;
  onTemplateCreated?: (template: MessageTemplate) => void;
  editingTemplate?: MessageTemplate | null;
}

export function TemplateCreationModal({
  isOpen,
  onClose,
  onSendTemplate,
  onTemplateCreated,
  editingTemplate,
}: TemplateCreationModalProps) {
  const [currentSection, setCurrentSection] =
    useState<TemplateBuilderSection>("details");
  const [templateData, setTemplateData] = useState<Partial<MessageTemplate>>(
    {}
  );
  const [showMobilePreview, setShowMobilePreview] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const isInitializing = useRef(false);

  useEffect(() => {
    if (isOpen) {
      isInitializing.current = true;

      if (editingTemplate) {
        setTemplateData({
          ...editingTemplate,
          name: editingTemplate.name,
          language: editingTemplate.language || "en_US",
          category: editingTemplate.category || "UTILITY",
          components: editingTemplate.components || [],
        });
      } else {
        setTemplateData({});
      }

      setCurrentSection("details");

      setTimeout(() => {
        isInitializing.current = false;
      }, 100);
    }
  }, [editingTemplate, isOpen]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // Changed to 768px breakpoint
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSectionChange = (section: TemplateBuilderSection) => {
    setCurrentSection(section);
  };

  const handleTemplateDataChange = useCallback(
    (data: Partial<MessageTemplate>) => {
      if (isInitializing.current) {
        return;
      }

      setTemplateData((prev) => {
        const newData = { ...prev, ...data };
        if (JSON.stringify(prev) === JSON.stringify(newData)) {
          return prev;
        }
        return newData;
      });
    },
    []
  );

  const handleTemplateSubmit = (action: "send" | "save" = "save") => {
    if (templateData.name && templateData.components) {
      const template: MessageTemplate = {
        id: editingTemplate?.id || Date.now().toString(),
        name: templateData.name,
        language: templateData.language || "en_US",
        category: templateData.category || "UTILITY",
        createdAt: editingTemplate?.createdAt || new Date().toISOString(),
        components: templateData.components,
      };

      if (action === "send" && onSendTemplate) {
        onSendTemplate(template);
      } else if (onTemplateCreated) {
        onTemplateCreated(template);
      }

      onClose();
      setCurrentSection("details");
      setTemplateData({});
    }
  };

  return (
    <>
      {/* Main Dialog */}
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-[100vw] h-[100dvh] md:max-w-[80vw] md:max-h-[90vh] md:h-auto md:min-w-[700px] lg:min-h-[75vh] lg:min-w-[900px] p-0 gap-0 border-0 overflow-y-scroll">
          <div className="flex flex-col h-full">
            {/* Header */}
            <DialogHeader className="flex-shrink-0 px-4 py-4 md:px-6 md:py-5 border-b border-primary/50 bg-white">
              <div className="flex items-center justify-between mr-4">
                <div className="flex items-center gap-3">
                  <DialogTitle className="text-lg md:text-xl font-semibold text-gray-900">
                    {editingTemplate ? "Edit Template" : "Create New Template"}
                  </DialogTitle>
                </div>

                {isMobile && (
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setShowMobilePreview(true)}
                    className="flex items-center gap-2"
                  >
                    <Eye className="w-4 h-4" />
                    <span className="hidden sm:inline">Preview</span>
                  </Button>
                )}
              </div>
            </DialogHeader>

            {!isMobile && (
              <TemplateStepsNav
                currentSection={currentSection}
                onSectionClick={handleSectionChange}
              />
            )}

            {/* Content */}
            <div className="flex-1 overflow-hidden bg-white">
              {isMobile ? (
                <ScrollArea className="h-full">
                  <div className="p-4">
                    <TemplateForm
                      onSectionChange={handleSectionChange}
                      onTemplateDataChange={handleTemplateDataChange}
                      currentSection={currentSection}
                      setCurrentSection={setCurrentSection}
                      initialTemplate={editingTemplate}
                      isMobile={isMobile}
                    />
                  </div>
                </ScrollArea>
              ) : (
                <div className="flex h-full">
                  <div className="flex-1 min-w-0">
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        <TemplateForm
                          onSectionChange={handleSectionChange}
                          onTemplateDataChange={handleTemplateDataChange}
                          currentSection={currentSection}
                          setCurrentSection={setCurrentSection}
                          initialTemplate={editingTemplate}
                        />
                      </div>
                    </ScrollArea>
                  </div>

                  <Separator orientation="vertical" />

                  <div className="w-80 lg:w-[400px] bg-gradient-to-b from-gray-50 to-gray-100">
                    <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
                      <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                        <Smartphone className="w-4 h-4" />
                        Live Preview
                      </div>
                    </div>
                    <ScrollArea className="h-[calc(100%-4rem)]">
                      <div className="p-4">
                        <TemplatePreview templateData={templateData} />
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex-shrink-0 flex flex-col sm:flex-row justify-end gap-3 p-4 md:p-6 border-t border-primary/50 bg-white">
              <Button
                variant="outline"
                onClick={onClose}
                className="w-full sm:w-auto order-2 sm:order-1 bg-transparent"
              >
                Cancel
              </Button>
              {editingTemplate && onSendTemplate ? (
                <Button
                  onClick={() => handleTemplateSubmit("send")}
                  className="w-full sm:w-auto order-1 sm:order-2 bg-green-600 hover:bg-green-700"
                  disabled={
                    !templateData.name || !templateData.components?.length
                  }
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Template
                </Button>
              ) : (
                <Button
                  onClick={() => handleTemplateSubmit("save")}
                  className="w-full sm:w-auto order-1 sm:order-2 bg-primary hover:bg-primary/90"
                  disabled={
                    !templateData.name || !templateData.components?.length
                  }
                >
                  {editingTemplate ? "Update Template" : "Create Template"}
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mobile Preview Sheet */}
      <Sheet open={showMobilePreview} onOpenChange={setShowMobilePreview}>
        <SheetContent className="w-full sm:max-w-md p-0">
          <SheetHeader className="hidden">
            <SheetTitle />
            <SheetDescription />
          </SheetHeader>
          <div className="flex flex-col h-full">
            <div className="flex-shrink-0 px-4 py-4 border-b border-primary/50 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Template Preview
                </h2>
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-4">
                <TemplatePreview templateData={templateData} />
              </div>
            </ScrollArea>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
