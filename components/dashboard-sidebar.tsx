"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
  SidebarTrigger,
  useSidebar, // Import useSidebar hook
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Bell,
  Calendar,
  ClipboardList,
  Home,
  LayoutDashboard,
  Package,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./ThemeToggle";

export function DashboardSidebar() {
  const pathname = usePathname();
  const { state } = useSidebar(); // Get sidebar state

  const navigationItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Leads", href: "/dashboard/leads", icon: Users },
    { title: "Visits", href: "/dashboard/visits", icon: Home },
    { title: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
    { title: "Inventory", href: "/dashboard/inventory", icon: Package },
    { title: "My Reminders", href: "/dashboard/reminders", icon: Calendar },
  ];

  const reminders = [
    "Follow up with John Doe (Lead ID: 123)",
    "Prepare Q3 sales report",
    "Team meeting at 10 AM",
    "Review pending feedback for Project X",
    "Call client ABC for booking confirmation",
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-4 flex flex-col items-center gap-2">
        <div className="flex w-full justify-end">
          <SidebarTrigger className="-mr-2" />
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage
            src="/placeholder.svg?height=64&width=64"
            alt="User Avatar"
          />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        {/* Conditionally render user info based on sidebar state */}
        {state === "expanded" && (
          <div className="text-center w-full">
            <h3 className="font-semibold text-lg truncate">John Doe</h3>
            <p className="text-sm text-muted-foreground truncate">
              Sales Manager
            </p>
          </div>
        )}
      </SidebarHeader>
      <SidebarSeparator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                  >
                    <Link href={item.href}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          {state != "expanded" && <ThemeToggle />}

          <Button
            variant="outline"
            className="w-full bg-transparent"
            size={state === "collapsed" ? "icon" : "default"}
          >
            <Bell
              className={state === "collapsed" ? "h-4 w-4" : "mr-2 h-4 w-4"}
            />{" "}
            {state === "expanded" && "Notifications"}
          </Button>
          {state === "expanded" && <ThemeToggle />}
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter className="p-4 flex flex-col gap-2">
      </SidebarFooter> */}
    </Sidebar>
  );
}
