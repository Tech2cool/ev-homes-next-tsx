"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/providers/userContext";
import ClosingManagerPage from "../closing-manager/closing-manager-dashboard/page";
import DataAnalyzerDashboard from "../data-analyzer/data-analyzer-dashboard/page";
import SalesManagerPage from "../sales-manager/sales-manager-dashboard/page";
import SuperAdminDashboard from "../super-admin/supar-admin-dashboard/page";
import ErrorPage from "@/components/ErrorPage";

export default function DashboardPage() {
  const { user, loading } = useUser();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // wait for hydration
  if (!mounted) return null;

  if (loading) return null; // optional if SSR handles it fully

  if (!user || !user.designation?._id) {
    return <ErrorPage message="User not found or invalid role." />;
  }

  switch (user.designation._id) {
    case "desg-data-analyzer":
      return <DataAnalyzerDashboard />;
    case "desg-sales-manager":
    case "desg-senior-sales-manager":
    case "desg-sales-executive":
      return <SalesManagerPage />;
    case "desg-app-developer":
      return <SuperAdminDashboard />;
    case "desg-senior-closing-manager":
    case "desg-site-head":
    case "desg-post-sales-head":
      return <ClosingManagerPage />;
    default:
      return <ErrorPage message="Unauthorized role detected." />;
  }
}
