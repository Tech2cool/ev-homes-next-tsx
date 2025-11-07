"use client";
import ErrorPage from "@/components/ErrorPage";
import { useUser } from "@/providers/userContext";
import React, { useEffect, useState } from "react";
import DataAnalyzerWrapper from "../data-analyzer/data-analyzer-lead-details/page";
import SalesDetailsWrapper from "../sales-manager/sales-manager-lead-details/page";
import SuperAdminWrapper from "../super-admin/lead-details/page";
import ClosingDetailsWrapper from "../closing-manager/closing-manager-lead-details/page";
import { useMounted } from "@/hooks/useMounted";

export default function leadDetails() {
  const { user, loading } = useUser();
  const mounted = useMounted();

  // wait for hydration
  if (!mounted) return null;

  if (loading) return null; // optional if SSR handles it fully

  if (!user || !user.designation?._id) {
    return <ErrorPage message="User not found or invalid role." />;
  }

  switch (user.designation._id) {
    case "desg-data-analyzer":
      return <DataAnalyzerWrapper />;
    case "desg-sales-manager":
    case "desg-senior-sales-manager":
    case "desg-sales-executive":
      return <SalesDetailsWrapper />;
    case "desg-app-developer":
      console.log("okay");
      return <SuperAdminWrapper />;
    case "desg-senior-closing-manager":
    case "desg-site-head":
    case "desg-post-sales-head":
      return <ClosingDetailsWrapper />;
    default:
      return <ErrorPage message="Unauthorized role detected." />;
  }
}
