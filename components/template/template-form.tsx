"use client";

import type React from "react";
import { useState, useMemo, useEffect } from "react";
import type {
  MessageTemplate,
  HeaderFormat,
  ButtonComponent,
  TemplateCategory,
  TemplateBuilderSection,
  ButtonType,
} from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { AnimatePresence, motion } from "framer-motion";

interface TemplateFormProps {
  onSectionChange: (section: TemplateBuilderSection) => void;
  onTemplateDataChange: (data: Partial<MessageTemplate>) => void;
  currentSection: TemplateBuilderSection;
  setCurrentSection: (section: TemplateBuilderSection) => void;
  initialTemplate?: MessageTemplate;
}

export default function TemplateForm({
  onSectionChange,
  onTemplateDataChange,
  currentSection,
  setCurrentSection,
  initialTemplate,
}: TemplateFormProps) {
  const [templateName, setTemplateName] = useState("");
  const [language, setLanguage] = useState("en_US");
  const [category, setCategory] = useState<TemplateCategory>("MARKETING");
  const [headerFormat, setHeaderFormat] = useState<HeaderFormat>("NONE");
  const [headerText, setHeaderText] = useState("");
  const [headerTextExample, setHeaderTextExample] = useState("");
  const [headerMediaUrl, setHeaderMediaUrl] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [bodyExample, setBodyExample] = useState("");
  const [footerText, setFooterText] = useState("");
  const [buttons, setButtons] = useState<ButtonComponent[]>([]);

  useEffect(() => {
    if (initialTemplate) {
      setTemplateName(initialTemplate.name);
      setLanguage(initialTemplate.language);
      setCategory(initialTemplate.category);

      const header = initialTemplate.components.find(
        (c) => c.type === "HEADER"
      );

      if (header) {
        setHeaderFormat(header.format || "NONE");
        if (header.format === "TEXT") {
          setHeaderText(header.text || "");
          setHeaderTextExample(header.example?.header_text?.[0] || "");
          setHeaderMediaUrl("");
        } else {
          setHeaderText("");
          setHeaderTextExample("");
          setHeaderMediaUrl(header.example?.header_text?.[0] || "");
        }
      } else {
        setHeaderFormat("NONE");
        setHeaderText("");
        setHeaderTextExample("");
        setHeaderMediaUrl("");
      }

      const body = initialTemplate.components.find((c) => c.type === "BODY");
      if (body) {
        setBodyText(body.text || "");
        setBodyExample(body.example?.body_text?.[0]?.join(", ") || "");
      } else {
        setBodyText("");
        setBodyExample("");
      }

      const footer = initialTemplate.components.find(
        (c) => c.type === "FOOTER"
      );
      setFooterText(footer?.text || "");

      const buttonsComp = initialTemplate.components.find(
        (c) => c.type === "BUTTONS"
      );
      setButtons(buttonsComp?.buttons || []);
    } else {
      setTemplateName("");
      setLanguage("en_US");
      setCategory("MARKETING");
      setHeaderFormat("NONE");
      setHeaderText("");
      setHeaderTextExample("");
      setHeaderMediaUrl("");
      setBodyText("");
      setBodyExample("");
      setFooterText("");
      setButtons([]);
    }
  }, [initialTemplate]);

  const sections: TemplateBuilderSection[] = [
    "details",
    "header",
    "body",
    "footer",
    "buttons",
  ];
  const currentSectionIndex = sections.indexOf(currentSection);

  const goToNextSection = () => {
    if (
      currentSection === "header" &&
      headerFormat !== "NONE" &&
      headerFormat !== "TEXT" &&
      !headerMediaUrl
    ) {
      alert(`Please upload a ${headerFormat.toLowerCase()} for the header.`);
      return;
    }
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSection(sections[currentSectionIndex + 1]);
    }
  };

  const goToPreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSection(sections[currentSectionIndex - 1]);
    }
  };

  const generateTemplateObject = (): Partial<MessageTemplate> => {
    const components: MessageTemplate["components"] = [];

    if (headerFormat !== "NONE") {
      const headerComponent: MessageTemplate["components"][0] = {
        type: "HEADER",
        format: headerFormat,
      };
      if (headerFormat === "TEXT") {
        headerComponent.text = headerText;
        if (headerTextExample) {
          headerComponent.example = { header_text: [headerTextExample] };
        }
      } else {
        if (headerMediaUrl) {
          headerComponent.example = { header_text: [headerMediaUrl] };
        } else {
          headerComponent.example = { header_text: [""] };
        }
      }
      components.push(headerComponent);
    }

    if (bodyText) {
      const bodyComponent: MessageTemplate["components"][0] = {
        type: "BODY",
        text: bodyText,
      };
      if (bodyExample) {
        bodyComponent.example = {
          body_text: [bodyExample.split(",").map((s) => s.trim())],
        };
      }
      components.push(bodyComponent);
    }

    if (footerText) {
      components.push({
        type: "FOOTER",
        text: footerText,
      });
    }

    if (buttons.length > 0) {
      components.push({
        type: "BUTTONS",
        buttons: buttons.map((btn) => {
          const newBtn: ButtonComponent = {
            type: btn.type,
            text: btn.text,
          };
          if (btn.type === "PHONE_NUMBER") {
            newBtn.phone_number = btn.phone_number;
          } else if (btn.type === "URL") {
            newBtn.url = btn.url;
          }
          return newBtn;
        }),
      });
    }

    return {
      name: templateName,
      language,
      category,
      components,
    };
  };

  const currentTemplatePreview = useMemo(generateTemplateObject, [
    templateName,
    language,
    category,
    headerFormat,
    headerText,
    headerTextExample,
    headerMediaUrl,
    bodyText,
    bodyExample,
    footerText,
    buttons,
  ]);

  useEffect(() => {
    onSectionChange(currentSection);
  }, [currentSection, onSectionChange]);

  useEffect(() => {
    onTemplateDataChange(currentTemplatePreview);
  }, [currentTemplatePreview, onTemplateDataChange]);

  const handleAddButton = () => {
    if (buttons.length < 10) {
      setButtons([
        ...buttons,
        { type: "QUICK_REPLY", text: "", phone_number: "", url: "" },
      ]);
    } else {
      alert("You can add a maximum of 10 buttons.");
    }
  };

  const handleRemoveButton = (index: number) => {
    setButtons(buttons.filter((_, i) => i !== index));
  };

  const handleButtonChange = (
    index: number,
    field: keyof ButtonComponent,
    value: string
  ) => {
    const newButtons = [...buttons];
    // @ts-ignore
    newButtons[index][field] = value;
    setButtons(newButtons);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalTemplate = {
      ...generateTemplateObject(),
      id: initialTemplate?.id || Date.now().toString(),
      createdAt: initialTemplate?.createdAt || new Date().toISOString(),
    } as MessageTemplate;

    if (initialTemplate) {
      console.log("Updated Template:", JSON.stringify(finalTemplate, null, 2));
      alert("Template updated! Check console for JSON output.");
    } else {
      console.log("Created Template:", JSON.stringify(finalTemplate, null, 2));
      alert("Template created! Check console for JSON output.");
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 p-4 md:p-6 lg:p-8">
      <h1 className="text-2xl font-bold">
        {initialTemplate
          ? `Edit Template: ${initialTemplate.name}`
          : "Create New Message Template"}
      </h1>

      <AnimatePresence mode="wait">
        {currentSection === "details" && (
          <motion.div
            key="details"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border border-primary/50">
              <CardHeader>
                <CardTitle>Template Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="templateName">Template Name</Label>
                  <Input
                    id="templateName"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="e.g., seasonal_promotion"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select value={language} onValueChange={setLanguage}>
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en_US">English (US)</SelectItem>
                      <SelectItem value="es_ES">Spanish (Spain)</SelectItem>
                      <SelectItem value="fr_FR">French (France)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={category}
                    onValueChange={(value: TemplateCategory) =>
                      setCategory(value)
                    }
                  >
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="MARKETING">Marketing</SelectItem>
                      <SelectItem value="UTILITY">Utility</SelectItem>
                      <SelectItem value="AUTHENTICATION">
                        Authentication
                      </SelectItem>
                      <SelectItem value="TRANSACTIONAL">
                        Transactional
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentSection === "header" && (
          <motion.div
            key="header"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border border-primary/50">
              <CardHeader>
                <CardTitle>Header</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={headerFormat}
                  onValueChange={(value: HeaderFormat) => {
                    setHeaderFormat(value);
                    if (value === "TEXT") {
                      setHeaderMediaUrl("");
                    } else if (value !== "NONE") {
                      setHeaderText("");
                      setHeaderTextExample("");
                    } else {
                      setHeaderText("");
                      setHeaderTextExample("");
                      setHeaderMediaUrl("");
                    }
                  }}
                  className="flex flex-wrap gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="NONE" id="header-none" />
                    <Label htmlFor="header-none">None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="TEXT" id="header-text" />
                    <Label htmlFor="header-text">Text</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="IMAGE" id="header-image" />
                    <Label htmlFor="header-image">Image</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="VIDEO" id="header-video" />
                    <Label htmlFor="header-video">Video</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="AUDIO" id="header-audio" />
                    <Label htmlFor="header-audio">Audio</Label>
                  </div>
                </RadioGroup>

                {headerFormat === "TEXT" && (
                  <div className="space-y-2">
                    <Label htmlFor="headerText">Header Text</Label>
                    <Input
                      id="headerText"
                      value={headerText}
                      onChange={(e) => setHeaderText(e.target.value)}
                      placeholder="e.g., Our {{1}} is on!"
                    />
                    <p className="text-sm text-muted-foreground">
                      Use {"{{1}}"} for dynamic variable (only one allowed).
                    </p>
                    <Label htmlFor="headerTextExample">
                      Header Example (for {"{{1}}"})
                    </Label>
                    <Input
                      id="headerTextExample"
                      value={headerTextExample}
                      onChange={(e) => setHeaderTextExample(e.target.value)}
                      placeholder="e.g., Summer Sale"
                    />
                  </div>
                )}
                {headerFormat !== "NONE" && headerFormat !== "TEXT" && (
                  <div className="space-y-2">
                    <Label htmlFor="headerMedia">
                      Upload {headerFormat.toLowerCase()}
                    </Label>
                    <Input
                      id="headerMedia"
                      type="file"
                      accept={
                        headerFormat === "IMAGE"
                          ? "image/*"
                          : headerFormat === "VIDEO"
                          ? "video/*"
                          : "audio/*"
                      }
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const mediaUrl = URL.createObjectURL(file);
                          setHeaderMediaUrl(mediaUrl);
                        }
                      }}
                    />
                    <p className="text-sm text-muted-foreground">
                      (Upload {headerFormat.toLowerCase()} to preview. In a real
                      app, this would upload to a server.)
                    </p>
                    {headerFormat === "IMAGE" && headerMediaUrl && (
                      <img
                        src={headerMediaUrl}
                        alt="Header preview"
                        className="w-32 h-auto mt-2 rounded"
                      />
                    )}
                    {headerFormat === "VIDEO" && headerMediaUrl && (
                      <video
                        src={headerMediaUrl}
                        className="w-32 h-auto mt-2 rounded"
                        controls
                      />
                    )}
                    {headerFormat === "AUDIO" && headerMediaUrl && (
                      <audio
                        src={headerMediaUrl}
                        controls
                        className="w-32 mt-2"
                      />
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentSection === "body" && (
          <motion.div
            key="body"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border border-primary/50">
              <CardHeader>
                <CardTitle>Body</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="bodyText">Body Text</Label>
                <Textarea
                  id="bodyText"
                  value={bodyText}
                  onChange={(e) => setBodyText(e.target.value)}
                  placeholder="e.g., Shop now through {{1}} and use code {{2}} to get {{3}} off of all merchandise."
                  rows={4}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Use {"{{1}}"}, {"{{2}}"}, etc. for dynamic variables.
                </p>
                <Label htmlFor="bodyExample">
                  Body Example (comma-separated for {"{{1}}, {{2}}"})
                </Label>
                <Input
                  id="bodyExample"
                  value={bodyExample}
                  onChange={(e) => setBodyExample(e.target.value)}
                  placeholder="e.g., the end of August, 25OFF, 25%"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentSection === "footer" && (
          <motion.div
            key="footer"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border border-primary/50">
              <CardHeader>
                <CardTitle>Footer</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Label htmlFor="footerText">Footer Text</Label>
                <Input
                  id="footerText"
                  value={footerText}
                  onChange={(e) => setFooterText(e.target.value)}
                  placeholder="e.g., Use the buttons below to manage your marketing subscriptions"
                />
              </CardContent>
            </Card>
          </motion.div>
        )}

        {currentSection === "buttons" && (
          <motion.div
            key="buttons"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Card className="border border-primary/50">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Buttons ({buttons.length}/10)
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddButton}
                    disabled={buttons.length >= 10}
                  >
                    <Plus className="w-4 h-4 mr-2" /> Add Button
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {buttons.length === 0 && (
                  <p className="text-muted-foreground text-sm">
                    No buttons added yet. Click "Add Button" to start.
                  </p>
                )}
                {buttons.map((button, index) => (
                  <div
                    key={index}
                    className="border p-4 rounded-md space-y-3 relative"
                  >
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
                      onClick={() => handleRemoveButton(index)}
                      aria-label="Remove button"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    <h4 className="font-semibold text-md">
                      Button {index + 1}
                    </h4>
                    <div className="grid gap-2 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor={`button-type-${index}`}>
                          Button Type
                        </Label>
                        <Select
                          value={button.type}
                          onValueChange={(value: ButtonType) =>
                            handleButtonChange(index, "type", value)
                          }
                        >
                          <SelectTrigger id={`button-type-${index}`}>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="QUICK_REPLY">
                              Quick Reply
                            </SelectItem>
                            <SelectItem value="PHONE_NUMBER">
                              Call to Action (Phone)
                            </SelectItem>
                            <SelectItem value="URL">
                              Call to Action (URL)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`button-text-${index}`}>
                          Button Text
                        </Label>
                        <Input
                          id={`button-text-${index}`}
                          value={button.text}
                          onChange={(e) =>
                            handleButtonChange(index, "text", e.target.value)
                          }
                          placeholder="e.g., Unsubscribe from Promos"
                          required
                        />
                      </div>
                    </div>
                    {button.type === "PHONE_NUMBER" && (
                      <div className="space-y-2">
                        <Label htmlFor={`button-phone-${index}`}>
                          Phone Number
                        </Label>
                        <Input
                          id={`button-phone-${index}`}
                          value={button.phone_number || ""}
                          onChange={(e) =>
                            handleButtonChange(
                              index,
                              "phone_number",
                              e.target.value
                            )
                          }
                          placeholder="e.g., +15551234567"
                          required
                        />
                      </div>
                    )}
                    {button.type === "URL" && (
                      <div className="space-y-2">
                        <Label htmlFor={`button-url-${index}`}>URL</Label>
                        <Input
                          id={`button-url-${index}`}
                          value={button.url || ""}
                          onChange={(e) =>
                            handleButtonChange(index, "url", e.target.value)
                          }
                          placeholder="e.g., https://example.com/promo"
                          required
                        />
                      </div>
                    )}
                    {index < buttons.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex justify-between mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={goToPreviousSection}
          disabled={currentSectionIndex === 0}
        >
          <ChevronLeft className="w-4 h-4 mr-2" /> Previous
        </Button>
        {currentSectionIndex < sections.length - 1 ? (
          <Button type="button" onClick={goToNextSection}>
            Next <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <Button type="submit">
            {initialTemplate ? "Update Template" : "Create Template"}
          </Button>
        )}
      </div>
    </form>
  );
}
