// components/layout/Box.tsx
import { ComponentPropsWithoutRef } from "react";
import { twMerge } from "tailwind-merge";

type BoxProps = ComponentPropsWithoutRef<"div">;

const Box = ({ className, ...props }: BoxProps) => {
  return <div className={twMerge("p-4 rounded-lg", className)} {...props} />;
};

export default Box;
