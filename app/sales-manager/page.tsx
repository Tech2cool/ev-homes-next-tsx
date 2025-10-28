"use client";
import { SalesManagerDashboardHeader } from "@/components/dashboard-components/sales-manager/dashboard";
import { useUser } from "@/providers/userContext";
import React from "react";

const SalesManagerPage = () => {
  const { user,  } = useUser();

  return (
    <SalesManagerDashboardHeader
      userName={user?._id ||""}
      pendingText="5 pending"
      lastSyncText="07 Oct 25"
      avatarUrl={user?.profilePic||""}
      onSyncNow={() => console.log("Sync clicked")}
    />
  );
};

export default SalesManagerPage;
