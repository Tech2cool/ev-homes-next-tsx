// "use client";
// import {
//   Sidebar,
//   SidebarContent,
//   SidebarFooter,
//   SidebarGroup,
//   SidebarGroupContent,
//   SidebarGroupLabel,
//   SidebarHeader,
//   SidebarMenu,
//   SidebarMenuButton,
//   SidebarMenuItem,
//   SidebarSeparator,
//   SidebarTrigger,
//   useSidebar, // Import useSidebar hook
// } from "@/components/ui/sidebar";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Bell,
//   Calendar,
//   ClipboardList,
//   Home,
//   LayoutDashboard,
//   Package,
//   Users,
// } from "lucide-react";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { ThemeToggle } from "./ThemeToggle";

// export function DashboardSidebar() {
//   const pathname = usePathname();
//   const { state } = useSidebar(); // Get sidebar state

//   const navigationItems = [
//     { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
//      { title: "Attendance", href: "/attandance", icon: Calendar },
//     { title: "Leads", href: "/dashboard/leads", icon: Users },
//     { title: "Visits", href: "/dashboard/visits", icon: Home },
//     { title: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
//     { title: "Inventory", href: "/dashboard/inventory", icon: Package },
//     { title: "My Reminders", href: "/dashboard/reminders", icon: Calendar },
//   ];

//   const reminders = [
//     "Follow up with John Doe (Lead ID: 123)",
//     "Prepare Q3 sales report",
//     "Team meeting at 10 AM",
//     "Review pending feedback for Project X",
//     "Call client ABC for booking confirmation",
//   ];

//   return (
//     <Sidebar collapsible="icon">
//       <SidebarHeader className="p-4 flex flex-col items-center gap-2">
//         <div className="flex w-full justify-end">
//           <SidebarTrigger className="-mr-2" />
//         </div>
//         <Avatar className="h-10 w-10">
//           <AvatarImage
//             src="/placeholder.svg?height=64&width=64"
//             alt="User Avatar"
//           />
//           <AvatarFallback>JD</AvatarFallback>
//         </Avatar>
//         {/* Conditionally render user info based on sidebar state */}
//         {state === "expanded" && (
//           <div className="text-center w-full">
//             <h3 className="font-semibold text-lg truncate">John Doe</h3>
//             <p className="text-sm text-muted-foreground truncate">
//               Sales Manager
//             </p>
//           </div>
//         )}
//       </SidebarHeader>
//       <SidebarSeparator />
//       <SidebarContent>
//         <SidebarGroup>
//           <SidebarGroupLabel>Navigation</SidebarGroupLabel>
//           <SidebarGroupContent>
//             <SidebarMenu>
//               {navigationItems.map((item) => (
//                 <SidebarMenuItem key={item.title}>
//                   <SidebarMenuButton
//                     asChild
//                     isActive={pathname === item.href}
//                     tooltip={item.title}
//                   >
//                     <Link href={item.href}>
//                       <item.icon />
//                       <span>{item.title}</span>
//                     </Link>
//                   </SidebarMenuButton>
//                 </SidebarMenuItem>
//               ))}
//             </SidebarMenu>
//           </SidebarGroupContent>
//         </SidebarGroup>

//         <SidebarSeparator />

//         <SidebarGroup>
//           {state != "expanded" && <ThemeToggle />}

//           <Button
//             variant="outline"
//             className="w-full bg-transparent"
//             size={state === "collapsed" ? "icon" : "default"}
//           >
//             <Bell
//               className={state === "collapsed" ? "h-4 w-4" : "mr-2 h-4 w-4"}
//             />{" "}
//             {state === "expanded" && "Notifications"}
//           </Button>
//           {state === "expanded" && <ThemeToggle />}
//         </SidebarGroup>
//       </SidebarContent>
//       {/* <SidebarFooter className="p-4 flex flex-col gap-2">
//       </SidebarFooter> */}
//     </Sidebar>
//   );
// }





"use client";

import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell, Calendar, ClipboardList, Home, LayoutDashboard, Package, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "next-themes";
// odlk
export function DashboardSidebar() {
  const { theme } = useTheme();
  const pathname = usePathname();
   const { state } = useSidebar();  // desktop collapsible state

  const [windowWidth, setWindowWidth] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);



  const navigationItems = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "Attendance", href: "/attandance", icon: Calendar },
    { title: "Leads", href: "/dashboard/leads", icon: Users },
    { title: "Visits", href: "/dashboard/visits", icon: Home },
    { title: "Tasks", href: "/dashboard/tasks", icon: ClipboardList },
    { title: "Inventory", href: "/dashboard/inventory", icon: Package },
    { title: "My Reminders", href: "/dashboard/reminders", icon: Calendar },
  ];
  const isMobile = windowWidth < 1024;
  // ----------------- DESKTOP SIDEBAR -----------------
  const desktopSidebar = (
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


  const mobileSidebar = (
    <>
      <Button
        variant="ghost"
        onClick={() => setMobileOpen(!mobileOpen)}
        className="absolute top-4 right-4 z-50 p-2 lg:hidden"
      >
        {mobileOpen ? "" : "☰"}
      </Button>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">

          <div
            className="fixed inset-0 bg-black/30 dark:bg-black/50"
            onClick={() => setMobileOpen(false)}
          />


          <div
            className={`relative flex flex-col h-full w-64 shadow-md transition-all duration-300
                        ${theme === "dark" ? "bg-[var(--sidebar)] text-gray-100" : "bg-[var(--sidebar)] text-gray-900"}`}
          >

            <SidebarHeader className={`p-4 flex flex-col items-center gap-2 border-b
                                        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              <Button
                variant="ghost"
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 lg:hidden"
              >
                ✕
              </Button>
              <Avatar className={`h-10 w-10  ${theme === "dark" ? "bg-gray-600" : "bg-gray-600"}`}>
                <AvatarImage src="/placeholder.svg?height=64&width=64" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-center w-full">
                <h3 className="font-semibold text-lg truncate">John Doe</h3>
                <p className={`text-sm truncate ${theme === "dark" ? "text-gray-400" : "text-muted-foreground"}`}>Sales Manager</p>
              </div>
            </SidebarHeader>

            <div className={` p-2 overflow-y-auto border-b
                                        ${theme === "dark" ? "border-gray-700" : "border-gray-200"}`}>
              <h4 className={`px-2 text-sm mb-2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>Navigation</h4>
              <nav className="flex flex-col gap-1">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-2 p-2 rounded
                                ${pathname === item.href
                        ? theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                        : ""
                      } 
                                hover:bg-gray-100 dark:hover:bg-gray-800`}
                  >
                    <item.icon size={17} />
                    <span>{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>


            {/* Footer */}
            <div className="p-2 flex flex-col gap-2">
              <Button className={`flex items-center gap-2 ${theme === "dark" ? "bg-gray-800 text-gray-100" : "bg-gray-200 text-gray-900"}`}>
                <Bell /> Notifications
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </>
  );
  return (
    <>

      {!isMobile && (
        <Sidebar collapsible="icon" className="hidden lg:flex fixed h-full z-30">
          {desktopSidebar}
        </Sidebar>
      )}
      {isMobile && mobileSidebar}
    </>
  );
}
