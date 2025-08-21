"use client";
import { memo } from "react";
export type ContainerVariant =
  | "blue"
  | "gray"
  | "black"
  | "green"
  | "indigo"
  | "yellow"
  | "red"
  | "orange"
  | "purple";

interface ContainerIconsProps {
  children: React.ReactNode;
  variant?: ContainerVariant;
  className?: string;
}

const ContainerVariantClasses: Record<
  ContainerVariant,
  { bg: string; text: string; darkBg: string; darkText: string }
> = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    darkBg: "dark:bg-blue-900/30",
    darkText: "dark:text-blue-400",
  },
  gray: {
    bg: "bg-gray-100",
    text: "text-gray-600",
    darkBg: "dark:bg-gray-900/30",
    darkText: "dark:text-gray-400",
  },
  black: {
    bg: "bg-black/10",
    text: "text-black",
    darkBg: "dark:bg-black/50",
    darkText: "dark:text-black",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    darkBg: "dark:bg-green-900/30",
    darkText: "dark:text-green-400",
  },
  indigo: {
    bg: "bg-indigo-100",
    text: "text-indigo-600",
    darkBg: "dark:bg-indigo-900/30",
    darkText: "dark:text-indigo-400",
  },
  yellow: {
    bg: "bg-yellow-100",
    text: "text-yellow-600",
    darkBg: "dark:bg-yellow-900/30",
    darkText: "dark:text-yellow-400",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    darkBg: "dark:bg-purple-900/30",
    darkText: "dark:text-purple-400",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    darkBg: "dark:bg-red-900/30",
    darkText: "dark:text-red-400",
  },
  orange: {
    bg: "bg-orange-100",
    text: "text-orange-600",
    darkBg: "dark:bg-orange-900/30",
    darkText: "dark:text-orange-400",
  },
};

const ContainerIcons = memo(
  ({ children, variant = "blue", className }: ContainerIconsProps) => {
    const classes = ContainerVariantClasses[variant];
    return (
      <div
        className={
          `flex items-center justify-center rounded-lg ` +
          `${classes.bg} ${classes.text} ${classes.darkBg} ${classes.darkText}` +
          ` ${className}`
        }
      >
        {children}
      </div>
    );
  }
);

ContainerIcons.displayName = "ContainerIcons";
export default ContainerIcons;
