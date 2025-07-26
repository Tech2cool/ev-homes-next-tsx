// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { DataProvider } from "@/providers/dataContext";
import { UserProvider } from "@/providers/userContext";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EV Homes",
  description: "Your smart real estate platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies(); // ✅ await here
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <UserProvider>
            <DataProvider> <SidebarProvider defaultOpen={defaultOpen}>
              {children}
                </SidebarProvider>
              </DataProvider>
          </UserProvider>
          {/* <DataProvider>
            <SidebarProvider defaultOpen={defaultOpen}>
              {children}

            </SidebarProvider>
          </DataProvider> */}

        </ThemeProvider>
      </body>
    </html>
  );
}
