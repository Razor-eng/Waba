"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Plus, Send, X } from "lucide-react";
import type { MessageTemplate } from "@/types";
import { mockTemplates } from "@/data/mockData";
import { motion, AnimatePresence } from "framer-motion";

interface TemplateSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: MessageTemplate) => void;
  onCreateNew: () => void;
}

export function TemplateSelectionModal({
  isOpen,
  onClose,
  onSelectTemplate,
  onCreateNew,
}: TemplateSelectionModalProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredTemplates = mockTemplates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.components.some((comp) =>
        comp.text?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCategory =
      selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    "all",
    "MARKETING",
    "UTILITY",
    "TRANSACTIONAL",
    "AUTHENTICATION",
  ];

  const handleTemplateUse = (template: MessageTemplate) => {
    onSelectTemplate(template);
    onClose();
  };

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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[100vw] w-full h-full sm:max-w-[90vw] sm:w-auto sm:h-auto sm:min-w-[800px] lg:min-w-[1000px] xl:min-w-[1200px] p-0 gap-0 overflow-hidden overflow-y-scroll max-h-[90vh]">
        <div className="flex flex-col h-full">
          {/* Header */}
          <DialogHeader className="flex-shrink-0 px-4 py-4 sm:px-6 sm:py-5 border-b border-primary/40 bg-white">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-900">
                Choose Template
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  onClick={onCreateNew}
                  size="sm"
                  className="hidden sm:flex items-center gap-2 mr-4"
                >
                  <Plus className="w-4 h-4" />
                  Create New
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="sm:hidden p-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Mobile Create Button */}
            <Button
              onClick={onCreateNew}
              size="sm"
              className="sm:hidden w-full mt-3"
            >
              <Plus className="w-4 h-4 mr-2" />
              Create New Template
            </Button>
          </DialogHeader>

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
                    variant={
                      selectedCategory === category ? "default" : "outline"
                    }
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
          <div className="flex-1 overflow-hidden bg-zinc-100">
            <ScrollArea className="h-full">
              <div className="p-4 sm:p-6">
                <AnimatePresence mode="wait">
                  {filteredTemplates.length === 0 ? (
                    <motion.div
                      key="empty"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex flex-col items-center justify-center py-16 text-center"
                    >
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-6 h-6 text-gray-400" />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        No templates found
                      </h3>
                      <p className="text-gray-500 text-sm max-w-sm">
                        Try adjusting your search criteria or create a new
                        template
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="grid"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
                    >
                      {filteredTemplates.map((template, index) => (
                        <motion.div
                          key={template.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.05, duration: 0.3 }}
                          whileHover={{ y: -2 }}
                          className="group"
                        >
                          <Card className="cursor-pointer h-full transition-all duration-200 hover:shadow-lg hover:shadow-primary/10 border-primary/10 group-hover:border-primary/20">
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
                            </CardHeader>
                            <CardContent className="pt-0 flex flex-col justify-between flex-1">
                              <CardDescription className="text-xs line-clamp-3 mb-4 text-gray-600 leading-relaxed">
                                {template.components.find(
                                  (c) => c.type === "BODY"
                                )?.text
                                  ? replaceTemplateVariables(
                                      template.components.find(
                                        (c) => c.type === "BODY"
                                      )?.text || ""
                                    )
                                  : "No content available"}
                              </CardDescription>
                              <Button
                                size="sm"
                                className="w-full h-8 text-xs font-medium bg-primary/60 hover:bg-primary/70 transition-colors"
                                onClick={() => handleTemplateUse(template)}
                              >
                                <Send className="w-3 h-3 mr-1" />
                                Use Template
                              </Button>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
