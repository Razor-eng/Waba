"use client";

import { useState } from "react";
import { Tag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { Contact } from "@/types";

interface TagSelectorProps {
  contacts: Contact[];
  selectedTags: Contact[];
  onChange: (tags: Contact[]) => void;
}

export function TagSelector({
  contacts,
  selectedTags,
  onChange,
}: TagSelectorProps) {
  const [search, setSearch] = useState<string>("");

  // First remove already-selected contacts
  const availableContacts = contacts.filter(
    (c) => !selectedTags.some((tag) => tag.id === c.id)
  );

  // Then filter them by search term
  const filteredContacts = availableContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const addTag = (contact: Contact) => {
    onChange([...selectedTags, contact]);
  };

  const removeTag = (id: string) => {
    onChange(selectedTags.filter((tag) => tag.id !== id));
  };

  return (
    <div className="flex items-center gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <Tag className="w-4 h-4 shrink-0" />
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-64">
          <Input
            placeholder="Search contacts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="mt-2 max-h-48 overflow-auto">
            {filteredContacts.length > 0 ? (
              filteredContacts.map((c) => (
                <div
                  key={c.id}
                  className="p-2 hover:bg-accent hover:text-white cursor-pointer rounded text-sm"
                  onClick={() => addTag(c)}
                >
                  {c.name}
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground px-2 py-1">
                No contacts found
              </p>
            )}
          </div>
        </PopoverContent>
      </Popover>
      {selectedTags.map((tag) => (
        <span
          key={tag.id}
          className="px-2 py-0.5 bg-muted rounded-sm flex items-center gap-1 text-xs"
        >
          {tag.name}
          <X
            className="w-3 h-3 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              removeTag(tag.id);
            }}
          />
        </span>
      ))}
    </div>
  );
}
