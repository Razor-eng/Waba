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
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Smartphone, X, ArrowLeft, Send } from "lucide-react";
import { TemplatePreview } from "../template/template-preview";

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
  const [showPreview, setShowPreview] = useState(false);
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
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (!mobile) {
        setShowPreview(false);
      }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] max-h-[100vh] w-full h-full lg:max-w-[90vw] lg:max-h-[90vh] lg:w-auto lg:h-auto lg:min-w-[1000px] xl:min-w-[1200px] p-0 gap-0">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="flex-shrink-0 px-4 py-4 lg:px-6 lg:py-5 border-b border-primary/50 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {isMobile && showPreview && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPreview(false)}
                    className="p-2"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </Button>
                )}
                <DialogTitle className="text-lg lg:text-xl font-semibold text-gray-900">
                  {isMobile && showPreview
                    ? "Template Preview"
                    : editingTemplate
                    ? "Edit Template"
                    : "Create New Template"}
                </DialogTitle>
              </div>

              <div className="flex items-center gap-2">
                {isMobile && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowPreview(!showPreview)}
                    className="flex items-center gap-2"
                  >
                    {showPreview ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        <span className="hidden sm:inline">Edit</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </>
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="lg:hidden p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </DialogHeader>

          {!isMobile || !showPreview ? (
            <TemplateStepsNav
              currentSection={currentSection}
              onSectionClick={handleSectionChange}
            />
          ) : null}

          {/* Content */}
          <div className="flex-1 overflow-hidden bg-white">
            {isMobile ? (
              <AnimatePresence mode="wait">
                {showPreview ? (
                  <motion.div
                    key="preview"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ScrollArea className="h-full">
                      <div className="p-6">
                        <TemplatePreview templateData={templateData} />
                      </div>
                    </ScrollArea>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.3 }}
                    className="h-full"
                  >
                    <ScrollArea className="h-full">
                      <div className="p-4">
                        <TemplateForm
                          onSectionChange={handleSectionChange}
                          onTemplateDataChange={handleTemplateDataChange}
                          currentSection={currentSection}
                          setCurrentSection={setCurrentSection}
                          initialTemplate={editingTemplate}
                        />
                      </div>
                    </ScrollArea>
                  </motion.div>
                )}
              </AnimatePresence>
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

                <div className="w-96 xl:w-[420px] bg-gradient-to-b from-gray-50 to-gray-100">
                  <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
                    <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
                      <Smartphone className="w-4 h-4" />
                      Live Preview
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100%-4rem)]">
                    <div className="p-6">
                      <TemplatePreview templateData={templateData} />
                    </div>
                  </ScrollArea>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 flex flex-col sm:flex-row justify-end gap-3 p-4 lg:p-6 border-t border-primary/50 bg-white">
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
                Create Template
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
