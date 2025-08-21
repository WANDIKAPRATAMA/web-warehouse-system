import { memo } from "react";
import { Loader } from "lucide-react";
import { cn } from "@/lib/utils";

type TransitionIconProps = PendingProps &
  ChildrenProps & {
    className?: string; // Add className prop
  };
export const TransitionIcon = memo(
  ({ isPending, children, className }: TransitionIconProps) => (
    <>
      {isPending ? (
        <Loader className={cn("h-4 w-4 animate-spin", className)} />
      ) : (
        children
      )}
    </>
  )
);
TransitionIcon.displayName = "TransitionIcon";
