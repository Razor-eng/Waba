"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Breadcrumbs from "@/components/template/breadcrumbs";
import TemplateForm from "@/components/template/template-form";
import TemplatePreview from "@/components/template/template-preview";
import TemplateStepsNav from "@/components/template/template-steps-nav";
import type { TemplateBuilderSection, MessageTemplate } from "@/types";

// Mock data for existing templates (should ideally come from an API)
const mockTemplates: MessageTemplate[] = [
  {
    id: "1",
    name: "seasonal_promotion",
    language: "en_US",
    category: "MARKETING",
    createdAt: "2023-10-26T10:00:00Z",
    components: [
      {
        type: "HEADER",
        format: "TEXT",
        text: "Our {{1}} is on!",
        example: { header_text: ["Summer Sale"] },
      },
      {
        type: "BODY",
        text: "Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise.",
        example: { body_text: [["the end of August", "25OFF", "25%"]] },
      },
      {
        type: "FOOTER",
        text: "Use the buttons below to manage your marketing subscriptions",
      },
      {
        type: "BUTTONS",
        buttons: [
          { type: "QUICK_REPLY", text: "Unsubscribe from Promos" },
          { type: "QUICK_REPLY", text: "Unsubscribe from All" },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "order_confirmation",
    language: "en_US",
    category: "UTILITY",
    createdAt: "2023-09-15T14:30:00Z",
    components: [
      {
        type: "BODY",
        text: "Hi {{1}}, your order #{{2}} has been confirmed and will be shipped soon.",
        example: { body_text: [["John", "12345"]] },
      },
      {
        type: "BUTTONS",
        buttons: [
          {
            type: "URL",
            text: "Track Order",
            url: "https://example.com/track",
          },
        ],
      },
    ],
  },
];

export default function EditTemplatePage() {
  const params = useParams();
  const router = useRouter();
  const templateId = params.id as string;

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
    const foundTemplate = mockTemplates.find((t) => t.id === templateId);
    if (foundTemplate) {
      setInitialTemplate(foundTemplate);
      setTemplateDataForPreview(foundTemplate); // Initialize preview with fetched data
    } else {
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
      href: `/templates/edit/${templateId}`,
    },
    { label: "Edit", href: `/templates/edit/${templateId}` },
  ];

  const handleTemplateDataChange = (data: Partial<MessageTemplate>) => {
    setTemplateDataForPreview(data);
  };

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
          <TemplatePreview template={templateDataForPreview} />
        </div>
      </div>
    </div>
  );
}
