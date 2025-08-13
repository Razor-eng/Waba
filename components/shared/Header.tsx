"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  CircleQuestionMark,
  GraduationCap,
  Lightbulb,
  Sparkles,
} from "lucide-react";

interface HeaderProps {
  className?: string;
}

export function Header({ className }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        y: { duration: 0.3, ease: "easeOut" },
        opacity: { duration: 0.5, delay: 0.3, ease: "easeIn" },
      }}
      className={cn(
        "w-full h-16 bg-gradient-to-r from-sidebar-bg to-zinc-100 border-b border-border flex items-center justify-between px-4 sm:px-6",
        className
      )}
    >
      <div className="flex items-center gap-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.8 }}
          className="size-8 rounded-lg flex items-center justify-center"
        >
          <Image src={"/tick.png"} alt="logo" height={300} width={300} />
        </motion.div>
        <h2 className="font-bold text-xl sm:text-2xl">Waba</h2>
      </div>

      <div className="flex items-center gap-1 sm:gap-3">
        <Button
          variant={"secondary"}
          size={"icon"}
          className="text-primary bg-white shadow-md hidden sm:inline-flex"
        >
          <Lightbulb className="size-4 sm:size-5" />
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="text-primary bg-white shadow-md relative"
        >
          <div className="rounded-full bg-destructive size-2.5 absolute right-0 top-0" />
          <Sparkles className="size-4 sm:size-5" />
        </Button>
        <Button
          variant={"secondary"}
          size={"icon"}
          className="text-primary bg-white shadow-md hidden sm:inline-flex"
        >
          <GraduationCap className="size-4 sm:size-5" />
        </Button>
        <Button
          variant={"secondary"}
          size={"sm"}
          className="text-primary bg-white shadow-md hidden sm:inline-flex"
        >
          <CircleQuestionMark className="size-4 sm:size-5 mr-1" />
          <span className="hidden md:inline">Get Help</span>
        </Button>

        {/* Mobile menu button (you can add functionality later) */}
        <Button
          variant={"secondary"}
          size={"icon"}
          className="text-primary bg-white shadow-md sm:hidden"
        >
          <Lightbulb className="size-4" />
        </Button>
      </div>
    </motion.header>
  );
}
