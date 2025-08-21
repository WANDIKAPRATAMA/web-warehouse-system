import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { NavDocuments } from "./nav-document";
import { NavMain } from "./nav-main";
import { NavSecondary } from "./nav-secondary";
import { NavUser } from "./nav-user";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChartBarStacked,
  ChartColumnStacked,
  GalleryHorizontal,
  LayoutDashboard,
  LayoutDashboardIcon,
  LocationEdit,
  PackageSearch,
} from "lucide-react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/services/next-auth-service";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard/",
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      title: "Products",
      url: "/dashboard/products",
      icon: <PackageSearch className="w-4 h-4" />,
    },
    {
      title: "Categories",
      url: "/dashboard/categories",
      icon: <ChartColumnStacked className="w-4 h-4" />,
    },
    {
      title: "Locations",
      url: "/dashboard/locations",
      icon: <LocationEdit className="w-4 h-4" />,
    },
    {
      title: "Stocks",
      url: "/dashboard/stocks",
      icon: <ChartBarStacked className="w-4 h-4" />,
    },
  ],
  navClouds: [
    // {
    //   title: "Capture",
    //   icon: IconCamera,
    //   isActive: true,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Active Proposals",
    //       url: "#",
    //     },
    //     {
    //       title: "Archived",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Proposal",
    //   icon: IconFileDescription,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Active Proposals",
    //       url: "#",
    //     },
    //     {
    //       title: "Archived",
    //       url: "#",
    //     },
    //   ],
    // },
    // {
    //   title: "Prompts",
    //   icon: IconFileAi,
    //   url: "#",
    //   items: [
    //     {
    //       title: "Active Proposals",
    //       url: "#",
    //     },
    //     {
    //       title: "Archived",
    //       url: "#",
    //     },
    //   ],
    // },
  ],
  navSecondary: [
    // {
    //   title: "Settings",
    //   url: "#",
    //   icon: IconSettings,
    // },
    // {
    //   title: "Get Help",
    //   url: "#",
    //   icon: IconHelp,
    // },
    // {
    //   title: "Search",
    //   url: "#",
    //   icon: IconSearch,
    // },
  ],
  documents: [
    // {
    //   name: "Data Library",
    //   url: "#",
    //   icon: IconDatabase,
    // },
    // {
    //   name: "Reports",
    //   url: "#",
    //   icon: IconReport,
    // },
    // {
    //   name: "Word Assistant",
    //   url: "#",
    //   icon: IconFileWord,
    // },
  ],
};

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const session = await getServerSession(authOptions);

  const avatar = session?.user
    ? {
        name: session.user.name ?? session.user.email.split("@")[0],
        email: session.user.email,
        avatar: "",
      }
    : {
        name: "System",
        email: "system@gmail.com",
        avatar: "",
      };
  console.log("🚀 ~ AppSidebar ~ avatar:", avatar);
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="#">
                <GalleryHorizontal className="!size-5" />
                <span className="text-base font-semibold">WMS.</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="flex-1 pr-4">
          <NavMain items={data.navMain} />
          <NavDocuments items={data.documents} />
          <NavSecondary items={data.navSecondary} className="mt-auto" />
        </ScrollArea>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={avatar} />
      </SidebarFooter>
    </Sidebar>
  );
}
