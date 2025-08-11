"use client";

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
import { motion, AnimatePresence } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 border-b border-border bg-card flex items-center justify-between"
      >
        <Breadcrumbs items={breadcrumbItems} />
        <Button asChild>
          <Link href="/templates/new">
            <Plus className="w-4 h-4 mr-2" /> Create New Template
          </Link>
        </Button>
      </motion.div>
      <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
        <motion.h1
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="text-2xl font-bold mb-6"
        >
          Your Message Templates
        </motion.h1>
        <AnimatePresence>
          {mockTemplates.length === 0 ? (
            <motion.div
              key="no-templates"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
              className="text-center text-muted-foreground py-12"
            >
              <p>
                No templates created yet. Click "Create New Template" to get
                started!
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="templates-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {mockTemplates.map((template, index) => (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle>{template.name}</CardTitle>
                      <CardDescription>
                        Category: {template.category} | Language:{" "}
                        {template.language}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {template.components.find((c) => c.type === "BODY")
                          ?.text || "No body text"}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/templates/edit/${template.id}`}>
                            View/Edit
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
