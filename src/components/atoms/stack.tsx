// components/layout/Stack.tsx
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type StackProps = ComponentPropsWithoutRef<"div"> & {
  spacing?: "xs" | "sm" | "md" | "lg" | "xl";
};

const Stack = ({ className, spacing = "md", ...props }: StackProps) => {
  const spacingClasses = {
    xs: "gap-1",
    sm: "gap-2",
    md: "gap-4",
    lg: "gap-6",
    xl: "gap-8",
  };

  return (
    <div
      className={twMerge("flex flex-col", spacingClasses[spacing], className)}
      {...props}
    />
  );
};

export default Stack;
