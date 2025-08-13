import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

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
    <nav
      aria-label="Breadcrumb"
      className={cn("flex overflow-x-auto sm:overflow-visible", className)}
    >
      <ol className="flex items-center space-x-1 text-sm text-muted-foreground whitespace-nowrap">
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
              <ChevronRight className="h-4 w-4 mx-1 flex-shrink-0" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
