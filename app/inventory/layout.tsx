// app/dashboard/layout.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import AuthInit from '@/components/AuthInit';
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardSidebar } from "@/components/dashboard-sidebar";
import type React from "react";
// ikk
export default async function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ await cookies()
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('x-refresh-token')?.value;

  if (!accessToken) redirect('/login');

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/employee-reauth`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'x-refresh-token': `Bearer ${refreshToken}`,
      "x-platform": "web",
    },
    cache: 'no-store',
  });

  if (!res.ok) redirect('/login');

  const user = await res.json();

  return (
    <>
      <AuthInit user={user.data} />
      <DashboardSidebar />
      <SidebarInset>{children}</SidebarInset>
    </>
  );
}
