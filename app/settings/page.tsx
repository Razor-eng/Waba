"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Palette,
  Globe,
  Check,
  User,
  Bell,
  Shield,
  Search,
  X,
  Menu,
} from "lucide-react";
import { useState, useMemo } from "react";

// -------------------- Types --------------------
type Theme = { id: string; name: string; color: string };
type Language = { id: string; name: string; flag: string };
type SidebarItem = {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  keywords: string[];
};

// -------------------- Data --------------------
const themes: Theme[] = [
  { id: "blue", name: "Ocean Blue", color: "bg-blue-500" },
  { id: "green", name: "Forest Green", color: "bg-green-500" },
  { id: "purple", name: "Royal Purple", color: "bg-purple-500" },
  { id: "orange", name: "Sunset Orange", color: "bg-orange-500" },
];

const languages: Language[] = [
  { id: "en", name: "English", flag: "🇺🇸" },
  { id: "it", name: "Italiano", flag: "🇮🇹" },
];

const sidebarItems: SidebarItem[] = [
  {
    id: "appearance",
    label: "Appearance",
    icon: Palette,
    keywords: ["theme", "color", "style", "look"],
  },
  {
    id: "language",
    label: "Language",
    icon: Globe,
    keywords: ["locale", "translation", "region"],
  },
  {
    id: "account",
    label: "Account",
    icon: User,
    keywords: ["profile", "user", "personal"],
  },
  {
    id: "notifications",
    label: "Notifications",
    icon: Bell,
    keywords: ["alerts", "messages", "email"],
  },
  {
    id: "privacy",
    label: "Privacy",
    icon: Shield,
    keywords: ["security", "data", "protection"],
  },
];

// -------------------- Main Component --------------------
export default function SearchableSidebar() {
  const [activeSection, setActiveSection] = useState<string>("appearance");
  const [colorTheme, setColorTheme] = useState<string>("blue");
  const [language, setLanguage] = useState<string>("en");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  const filteredItems = useMemo(() => {
    if (!searchQuery) return sidebarItems;
    return sidebarItems.filter(
      (item) =>
        item.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.keywords.some((keyword) =>
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
    );
  }, [searchQuery]);

  const clearSearch = () => setSearchQuery("");
  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar with overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={closeSidebar}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-card border-r border-primary/30 flex flex-col md:hidden"
            >
              <SidebarContent
                filteredItems={filteredItems}
                activeSection={activeSection}
                setActiveSection={(id) => {
                  setActiveSection(id);
                  closeSidebar(); // close after selecting item
                }}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                clearSearch={clearSearch}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden md:flex w-72 border-r border-primary/30 bg-card/30 flex-col">
        <SidebarContent
          filteredItems={filteredItems}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          clearSearch={clearSearch}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Mobile Header with Menu */}
        <div className="flex items-center justify-between mb-3 md:hidden">
          <h1 className="text-2xl font-semibold">Settings</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col h-full justify-between pt-3 border-t border-primary/30"
        >
          {/* Appearance Section */}
          {activeSection === "appearance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Appearance</h2>
                <p className="text-muted-foreground">
                  Customize how your interface looks
                </p>
              </div>
              <div>
                <h3 className="font-medium mb-4">Color Theme</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {themes.map((theme) => (
                    <motion.button
                      key={theme.id}
                      onClick={() => setColorTheme(theme.id)}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-colors ${
                        colorTheme === theme.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:bg-muted/50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className={`w-4 h-4 rounded-full ${theme.color}`} />
                      <span className="font-medium">{theme.name}</span>
                      {colorTheme === theme.id && (
                        <Check className="h-4 w-4 ml-auto text-primary" />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Language Section */}
          {activeSection === "language" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Language</h2>
                <p className="text-muted-foreground">
                  Choose your preferred language
                </p>
              </div>
              <div className="space-y-3">
                {languages.map((lang) => (
                  <motion.button
                    key={lang.id}
                    onClick={() => setLanguage(lang.id)}
                    className={`w-full flex items-center gap-3 p-4 rounded-lg border transition-colors ${
                      language === lang.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:bg-muted/50"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <span className="text-2xl">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {language === lang.id && (
                      <Check className="h-4 w-4 ml-auto text-primary" />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Placeholder Sections */}
          {["account", "notifications", "privacy"].map(
            (section) =>
              activeSection === section && (
                <div key={section} className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-semibold mb-2 capitalize">
                      {section}
                    </h2>
                    <p className="text-muted-foreground">
                      Manage your {section} settings
                    </p>
                  </div>
                  <div className="p-6 text-center text-muted-foreground">
                    {section.charAt(0).toUpperCase() + section.slice(1)}{" "}
                    settings coming soon...
                  </div>
                </div>
              )
          )}

          <div className="flex flex-col mt-8">
            <Separator className="my-6" />
            <div className="flex justify-end">
              <Button className="px-6 md:px-8">
                <Check className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// -------------------- SidebarContent --------------------
type SidebarContentProps = {
  filteredItems: SidebarItem[];
  activeSection: string;
  setActiveSection: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  clearSearch: () => void;
};

function SidebarContent({
  filteredItems,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
  clearSearch,
}: SidebarContentProps) {
  return (
    <>
      <div className="p-6 border-b border-primary/30">
        <div className="mb-4 hidden md:block">
          <h1 className="text-2xl font-semibold mb-2">Settings</h1>
          <p className="text-sm text-muted-foreground">Search and configure</p>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search settings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <AnimatePresence>
          {filteredItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors ${
                  activeSection === item.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon className="h-4 w-4" />
                <div className="flex-1">
                  <div className="font-medium">{item.label}</div>
                  {searchQuery && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {item.keywords
                        .filter((k) =>
                          k.toLowerCase().includes(searchQuery.toLowerCase())
                        )
                        .join(", ")}
                    </div>
                  )}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-8 text-muted-foreground"
          >
            <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No settings found</p>
            <p className="text-xs">Try a different search term</p>
          </motion.div>
        )}
      </nav>
    </>
  );
}
