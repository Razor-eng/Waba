"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/template/breadcrumbs";
import TemplateForm from "@/components/template/template-form";
import TemplateStepsNav from "@/components/template/template-steps-nav";
import type { TemplateBuilderSection, MessageTemplate } from "@/types";
import { mockTemplates } from "@/data/mockData";
import { TemplatePreview } from "@/components/template/template-preview";

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

  // Redirect if the ID is "new" to ensure the correct page is loaded
  useEffect(() => {
    if (templateId === "new") {
      router.replace("/templates/new");
    }
  }, [templateId, router]);

  const [currentSection, setCurrentSection] =
    useState<TemplateBuilderSection>("details");
  const [initialTemplate, setInitialTemplate] = useState<
    MessageTemplate | undefined
  >(undefined);
  const [templateDataForPreview, setTemplateDataForPreview] = useState<
    Partial<MessageTemplate>
  >({
    name: "",
    language: "en_US",
    category: "MARKETING",
    components: [],
  });

  useEffect(() => {
    // Only attempt to fetch if templateId is not "new"
    if (templateId === "new") return;

    const foundTemplate = mockTemplates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setInitialTemplate(foundTemplate);
      setTemplateDataForPreview(foundTemplate); // Initialize preview with fetched data
    } else {
      // Handle case where template is not found for a valid ID
      console.error(
        `Template with ID ${templateId} not found. Redirecting to templates list.`
      );
      router.replace("/templates"); // Redirect to templates list if not found
    }
  }, [templateId, router]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
    {
      label: initialTemplate?.name || "Loading...",
      href: `/templates/${templateId}`,
    },
    { label: "Edit", href: `/templates/${templateId}/edit` },
  ];

  const handleTemplateDataChange = (data: Partial<MessageTemplate>) => {
    setTemplateDataForPreview(data);
  };

  // Render null or a loading state while redirecting or fetching
  if (templateId === "new") {
    return null; // Component will unmount and NewTemplatePage will load
  }

  if (!initialTemplate) {
    return (
      <div className="flex flex-col h-full items-center justify-center">
        <p className="text-muted-foreground">
          Loading template or template not found...
        </p>
      </div>
    );
  }

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
            initialTemplate={initialTemplate} // Pass the initial template for editing
          />
        </div>
        <div className="lg:w-1/2 p-4 md:p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border bg-muted/40 flex items-center justify-center overflow-y-auto">
          <TemplatePreview templateData={templateDataForPreview} />
        </div>
      </div>
    </div>
  );
}
