"use client";
import { ClosingManagerDashboardHeader } from "@/components/dashboard-components/closing-manager/dashboard";
import { useUser } from "@/providers/userContext";
import React from "react";

const ClosingManagerPage = () => {
    const { user,  } = useUser();
  
  return (
   
      <ClosingManagerDashboardHeader
      
      userName={user?._id ||""}
      pendingText="5 pending"
      lastSyncText="07 Oct 25"
      avatarUrl={user?.profilePic||""}
      onSyncNow={() => console.log("Sync clicked")}/>

  );
};




export default ClosingManagerPage;