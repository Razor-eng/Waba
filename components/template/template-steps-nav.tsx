"use client";

import { ChevronRight, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TemplateBuilderSection } from "@/types";
import { motion } from "framer-motion";

interface TemplateStepsNavProps {
  currentSection: TemplateBuilderSection;
  onSectionClick: (section: TemplateBuilderSection) => void;
}

export default function TemplateStepsNav({
  currentSection,
  onSectionClick,
}: TemplateStepsNavProps) {
  const sections: { label: string; id: TemplateBuilderSection }[] = [
    { label: "Details", id: "details" },
    { label: "Header", id: "header" },
    { label: "Body", id: "body" },
    { label: "Footer", id: "footer" },
    { label: "Buttons", id: "buttons" },
  ];

  const currentSectionIndex = sections.findIndex(
    (s) => s.id === currentSection
  );

  return (
    <nav className="w-full bg-card border-b border-border p-4 overflow-x-auto">
      <ol className="flex items-center justify-center space-x-2 min-w-max">
        {sections.map((section, index) => {
          const isActive = index === currentSectionIndex;
          const isCompleted = index < currentSectionIndex;

          return (
            <motion.li
              key={section.id}
              className="flex items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <motion.button
                type="button"
                onClick={() => onSectionClick(section.id)}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                  isActive
                    ? "bg-primary text-primary-foreground shadow"
                    : isCompleted
                    ? "bg-muted text-muted-foreground hover:bg-muted/80"
                    : "text-foreground hover:bg-muted"
                )}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isCompleted && (
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                )}
                {section.label}
              </motion.button>
              {index < sections.length - 1 && (
                <ChevronRight className="h-4 w-4 text-muted-foreground mx-1" />
              )}
            </motion.li>
          );
        })}
      </ol>
    </nav>
  );
}
