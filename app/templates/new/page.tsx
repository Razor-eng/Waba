"use client";

import { useState } from "react";
import Breadcrumbs from "@/components/template/breadcrumbs";
import TemplateForm from "@/components/template/template-form";
import TemplatePreview from "@/components/template/template-preview";
import TemplateStepsNav from "@/components/template/template-steps-nav";
import type { TemplateBuilderSection, MessageTemplate } from "@/types";

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
    // Debug log to verify template data
    console.log("templateDataForPreview:", JSON.stringify(data, null, 2));
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border bg-card">
        <Breadcrumbs items={breadcrumbItems} />
      </div>
      <TemplateStepsNav
        currentSection={currentSection}
        onSectionClick={setCurrentSection}
      />
      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="flex-1 overflow-y-auto lg:w-1/2">
          <TemplateForm
            onSectionChange={setCurrentSection}
            onTemplateDataChange={handleTemplateDataChange}
            currentSection={currentSection}
            setCurrentSection={setCurrentSection}
          />
        </div>
        <div className="lg:w-1/2 p-4 md:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border bg-muted/40 flex items-center justify-center overflow-y-auto">
          <TemplatePreview template={templateDataForPreview} />
        </div>
      </div>
    </div>
  );
}
