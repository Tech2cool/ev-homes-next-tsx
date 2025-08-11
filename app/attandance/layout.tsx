import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type React from "react"; // Import React for React.ReactNode type

export default function AtttandanceLayout({
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
