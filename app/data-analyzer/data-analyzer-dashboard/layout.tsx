import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type React from "react"; 
export default function dataanalyzer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
