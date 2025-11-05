// app/dashboard/layout.tsx
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type React from "react";

export default async function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ await cookies()
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  const refreshToken = cookieStore.get("x-refresh-token")?.value;

  if (!accessToken) return<>{children}</>;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/employee-reauth`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "x-refresh-token": `Bearer ${refreshToken}`,
        "x-platform": "web",
      },
      cache: "no-store",
    }
  );

  if (!res.ok) return<>{children}</>;

  const user = await res.json();
  redirect("/dashboard");

}
