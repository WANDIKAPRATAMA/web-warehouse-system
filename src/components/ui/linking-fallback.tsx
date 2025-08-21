"use client";
import { useLinkStatus } from "next/link";
import { TransitionIcon } from "./transition-icon";

export function LinkingFallback({ children }: { children?: React.ReactNode }) {
  const { pending } = useLinkStatus();
  return <TransitionIcon isPending={pending}>{children} </TransitionIcon>;
}
