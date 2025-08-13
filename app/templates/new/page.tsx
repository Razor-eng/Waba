"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/template/breadcrumbs";
import TemplateForm from "@/components/template/template-form";
import TemplateStepsNav from "@/components/template/template-steps-nav";
import type { TemplateBuilderSection, MessageTemplate } from "@/types";
import { TemplatePreview } from "@/components/template/template-preview";
import { Button } from "@/components/ui/button";
import { Eye, Smartphone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewTemplatePage() {
  const [currentSection, setCurrentSection] =
    useState<TemplateBuilderSection>("details");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    { label: "Create New", href: "/templates/new" },
  ];

  const [templateDataForPreview, setTemplateDataForPreview] = useState<
    Partial<MessageTemplate>
  >({
    name: "",
    language: "en_US",
    category: "MARKETING",
    components: [],
  });

  const handleTemplateDataChange = (data: Partial<MessageTemplate>) => {
    setTemplateDataForPreview(data);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header with Breadcrumbs */}
      <div className="p-4 border-b border-border bg-card">
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      {/* Navigation Steps */}
      <div className="hidden md:block">
        <TemplateStepsNav
          currentSection={currentSection}
          onSectionClick={setCurrentSection}
        />
      </div>

      {/* Mobile Preview Button */}
      <div className="lg:hidden p-2 border-primary/30 border-b flex justify-center bg-white">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="secondary" className="w-full">
              <Eye className="w-4 h-4" />
              Preview Template
            </Button>
          </SheetTrigger>
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
                  <TemplatePreview templateData={templateDataForPreview} />
                </div>
              </ScrollArea>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        {/* Form Section - Takes full width on mobile, 60% on desktop */}
        <div className="flex-1 overflow-y-auto lg:w-3/5">
          <TemplateForm
            onSectionChange={setCurrentSection}
            onTemplateDataChange={handleTemplateDataChange}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        </div>

        {/* Preview Section - Hidden on mobile, 40% on desktop */}
        <div className="hidden lg:flex lg:w-2/5 flex-col border-l border-border bg-muted/40">
          {/* Preview Header */}
          <div className="p-4 border-b bg-white/80 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-2 text-sm font-medium text-gray-700">
              <Smartphone className="w-4 h-4" />
              Live Preview
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            <div className="h-full flex items-center justify-center">
              <TemplatePreview templateData={templateDataForPreview} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
