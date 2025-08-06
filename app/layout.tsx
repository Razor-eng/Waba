import type { Metadata } from "next";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";
import { QueryClientProviderWrapper } from "@/providers/query-client-provider";
import { Sidebar } from "@/components/shared/sidebar";
import { Header } from "@/components/shared/Header";

export const metadata: Metadata = {
  title: "Waba",
  description: "Waba – Streamlining your workflow with grace.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning suppressContentEditableWarning>
      <body suppressHydrationWarning suppressContentEditableWarning>
        <QueryClientProviderWrapper>
          <TooltipProvider>
            <div className="h-screen flex flex-col bg-background">
              <Header />
              <div className="flex-1 flex overflow-hidden">
                <Sidebar />
                <div className="flex-1">{children}</div>
              </div>
            </div>
            <Toaster />
          </TooltipProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}
