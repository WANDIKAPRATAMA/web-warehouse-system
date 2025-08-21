import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/views/dashboard/layout/app-sidebar";
import { SiteHeader } from "@/components/views/dashboard/layout/site-header";

export default function Layout({ children }: ChildrenProps) {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2 min-h-screen p-4 sm:p-6 md:p-8 ">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
