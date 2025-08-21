"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import dynamic from "next/dynamic";
// import {
//   Dialog,
//   DialogTrigger,
//   DialogContent,
//   DialogTitle,
//   DialogHeader,
// } from "@/components/ui/dialog";
import { z } from "zod";
import useMediaQuery from "@/hooks/use-mediaquery";
const UUIDSchema = z.string().uuid();
function BreadCrumbs() {
  const pathname = usePathname();
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = React.useState(false);

  const segments = pathname.split("/").filter(Boolean).slice(1);

  const labelMap: Record<string, string> = {
    dashboard: "Home",
    missions: "Missions",
    accounts: "Accounts",
    profile: "Profile",
    securitys: "Security",
    notifications: "Notifications",
    reports: "Reports",
    editor: "Editor",
  };

  const getLabel = (segment: string) =>
    labelMap[segment] ?? UUIDSchema.safeParse(segment).success
      ? "Page"
      : segment.charAt(0).toUpperCase().replaceAll("-", " ") + segment.slice(1);

  const basePath = "/";
  const breadcrumbItems = segments.map((seg, idx) => ({
    label: getLabel(seg),
    href: `${basePath}/${segments.slice(0, idx + 1).join("/")}`,
  }));

  return (
    <div className="flex items-center gap-4">
      <Breadcrumb>
        <BreadcrumbList>
          {pathname !== basePath && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">{labelMap["dashboard"]}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          {breadcrumbItems.length > 0 && (
            <>
              <BreadcrumbItem>
                <BreadcrumbLink
                  asChild
                  onClick={() => {
                    if (window.history.length > 1) {
                      router.back();
                    } else {
                      router.push("/dashboard");
                    }
                  }}
                >
                  <button aria-label="Back to previous page">Previous</button>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}

          {breadcrumbItems.length > 2 && (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {
                  isDesktop && (
                    <DropdownMenu open={open} onOpenChange={setOpen}>
                      <DropdownMenuTrigger
                        className="flex items-center gap-1"
                        aria-label="Toggle menu"
                      >
                        <BreadcrumbEllipsis className="size-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start">
                        {breadcrumbItems.slice(0, -1).map((item, index) => (
                          <DropdownMenuItem key={index}>
                            <Link href={item.href}>{item.label}</Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )
                  // : (
                  //   <Dialog open={open} onOpenChange={setOpen}>
                  //     <DialogTrigger asChild>
                  //       <button aria-label="Open Breadcrumb Dialog">
                  //         <BreadcrumbEllipsis className="h-4 w-4" />
                  //       </button>
                  //     </DialogTrigger>
                  //     <DialogContent>
                  //       <DialogHeader>
                  //         <DialogTitle>Navigate to</DialogTitle>
                  //       </DialogHeader>
                  //       <div className="grid gap-2">
                  //         {breadcrumbItems.slice(0, -1).map((item, index) => (
                  //           <span
                  //             key={index}
                  //             // href={item.href}
                  //             className="text-sm underline underline-offset-4"
                  //             onClick={() => setOpen(false)}
                  //           >
                  //             {item.label}
                  //           </span>
                  //         ))}
                  //       </div>
                  //     </DialogContent>
                  //   </Dialog>
                  // )
                }
              </BreadcrumbItem>
            </>
          )}

          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {breadcrumbItems.length > 0
                ? breadcrumbItems[breadcrumbItems.length - 1].label
                : labelMap["dashboard"]}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}

export const StreamBreadcrumb = dynamic(() => Promise.resolve(BreadCrumbs), {
  ssr: false,
});
