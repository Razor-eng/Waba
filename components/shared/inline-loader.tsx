"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: number; // pixel size
  thickness?: number; // stroke width
  color?: string; // tailwind class e.g. "text-primary"
  message?: string;
  variant?: "centered" | "inline";
  className?: string;
}

export function InlineLoader({
  size = 32,
  thickness = 3,
  color = "text-primary",
  message,
  variant = "centered",
  className,
}: LoaderProps) {
  const spinner = (
    <motion.svg
      className={cn("animate-spin", color)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={thickness}
      />
      <motion.circle
        className="opacity-75"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeDasharray="80"
        strokeDashoffset="60"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
    </motion.svg>
  );

  if (variant === "inline") {
    return (
      <span className={cn("inline-flex items-center gap-2", className)}>
        {spinner}
        {message && (
          <span className="text-sm text-muted-foreground">{message}</span>
        )}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-8",
        className
      )}
    >
      {spinner}
      {message && (
        <motion.p
          className="mt-4 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}
