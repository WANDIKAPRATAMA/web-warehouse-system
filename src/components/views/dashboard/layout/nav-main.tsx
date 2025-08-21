"use client";

import { Button } from "@/components/ui/button";
import { LinkingFallback } from "@/components/ui/linking-fallback";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { LucideProps } from "lucide-react";
import Link from "next/link";
import { JSX } from "react";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: JSX.Element;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title}>
                <Link href={item.url} className="flex items-center gap-2">
                  <LinkingFallback>
                    {item.icon && <span>{item.icon}</span>}
                  </LinkingFallback>
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
