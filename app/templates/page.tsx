"use client";

import Link from "next/link";
import { useState } from "react";
import { Plus, Search, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Breadcrumbs from "@/components/template/breadcrumbs";
import { motion, AnimatePresence } from "framer-motion";
import { mockTemplates } from "@/data/mockData";
import type { MessageTemplate } from "@/types";

export default function TemplatesListPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Templates", href: "/templates" },
  ];

  const categories = [
    "all",
    "MARKETING",
    "UTILITY",
    "TRANSACTIONAL",
    "AUTHENTICATION",
  ];

  const filteredTemplates = mockTemplates.filter(
    (template: MessageTemplate) => {
      const matchesSearch =
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.components.some((comp) =>
          comp.text?.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "all" || template.category === selectedCategory;
      return matchesSearch && matchesCategory;
    }
  );

  const replaceTemplateVariables = (text: string) => {
    const sampleValues = [
      "John",
      "Smith",
      "ABC Company",
      "Premium",
      "2024",
      "Support Team",
    ];

    return text.split(/(\{\{\d+\}\})/).map((part, index) => {
      const match = part.match(/\{\{(\d+)\}\}/);
      if (match) {
        const variableIndex = Number.parseInt(match[1]) - 1;
        const sampleValue = sampleValues[variableIndex] || `Sample${match[1]}`;
        return (
          <span key={index} className="font-semibold text-gray-900">
            {sampleValue}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col h-full"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="p-4 border-b border-primary/40 bg-card flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
      >
        <Breadcrumbs items={breadcrumbItems} />
        <Link href="/templates/new">
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Template
          </Button>
        </Link>
      </motion.div>

      {/* Search and Filters */}
      <div className="flex-shrink-0 p-4 sm:p-6 bg-zinc-100 border-b border-primary/40">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-10 sm:h-11 bg-white border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className={`capitalize whitespace-nowrap flex-shrink-0 h-8 px-3 text-xs sm:text-sm ${
                  selectedCategory === category
                    ? "bg-primary/60 hover:bg-primary/50 text-white"
                    : "bg-white hover:bg-primary/40 text-gray-700 border-gray-200"
                }`}
              >
                {category === "all" ? "All" : category.toLowerCase()}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="flex-1 overflow-y-auto bg-zinc-100">
        <ScrollArea className="h-full p-4">
          <AnimatePresence mode="wait">
            {filteredTemplates.length === 0 ? (
              <motion.div
                key="no-templates"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No templates found
                </h3>
                <p className="text-gray-500 text-sm max-w-sm">
                  Try adjusting your search criteria or create a new template
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
                {filteredTemplates.map(
                  (template: MessageTemplate, index: number) => (
                    <motion.div
                      key={template.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      whileHover={{ y: -2 }}
                      className="group"
                    >
                      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 border-primary/10 group-hover:border-primary/20">
                        <CardHeader className="pb-3">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <CardTitle className="text-sm font-semibold line-clamp-2 flex-1 text-gray-900">
                              {template.name}
                            </CardTitle>
                            <Badge
                              variant="secondary"
                              className="text-xs flex-shrink-0 bg-gray-100 text-gray-600 group-hover:bg-blue-50 group-hover:text-primary/70"
                            >
                              {template.category.toLowerCase()}
                            </Badge>
                          </div>
                          <CardDescription className="text-xs text-gray-600">
                            Language: {template.language}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-0 flex flex-col justify-between flex-1">
                          <CardDescription className="text-xs line-clamp-3 mb-4 text-gray-600 leading-relaxed">
                            {template.components.find((c) => c.type === "BODY")
                              ?.text
                              ? replaceTemplateVariables(
                                  template.components.find(
                                    (c) => c.type === "BODY"
                                  )?.text || ""
                                )
                              : "No content available"}
                          </CardDescription>
                          <Link
                            href={`/templates/edit/${template.id}`}
                            className="flex items-center gap-1"
                          >
                            <Button
                              size="sm"
                              className="h-8 text-xs font-medium bg-primary/60 hover:bg-primary/70 transition-colors"
                            >
                              <Send className="w-3 h-3 mr-1" />
                              View Template
                            </Button>
                          </Link>
                        </CardContent>
                      </Card>
                    </motion.div>
                  )
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </ScrollArea>
      </div>
    </motion.div>
  );
}
