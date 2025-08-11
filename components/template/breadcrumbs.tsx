import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn("flex", className)}>
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <Link
              href={item.href}
              className={cn(
                "hover:text-foreground transition-colors",
                index === items.length - 1 && "text-foreground font-medium"
              )}
            >
              {item.label}
            </Link>
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
