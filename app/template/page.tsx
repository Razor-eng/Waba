import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Breadcrumbs from "@/components/template/breadcrumbs";
import type { MessageTemplate } from "@/types";

// Mock data for existing templates
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

export default function TemplatesListPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
  ];

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-border bg-card flex items-center justify-between">
        <Breadcrumbs items={breadcrumbItems} />
        <Button asChild>
          <Link href="/templates/new">
            <Plus className="w-4 h-4 mr-2" /> Create New Template
          </Link>
        </Button>
      </div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <h1 className="text-2xl font-bold mb-6">Your Message Templates</h1>
        {mockTemplates.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            <p>
              No templates created yet. Click "Create New Template" to get
              started!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {mockTemplates.map((template) => (
              <Card key={template.id}>
                <CardHeader>
                  <CardTitle>{template.name}</CardTitle>
                  <CardDescription>
                    Category: {template.category} | Language:{" "}
                    {template.language}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {template.components.find((c) => c.type === "BODY")?.text ||
                      "No body text"}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm" asChild>
                      {/* Updated link to point to /templates/edit/[id] */}
                      <Link href={`/templates/edit/${template.id}`}>
                        View/Edit
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
