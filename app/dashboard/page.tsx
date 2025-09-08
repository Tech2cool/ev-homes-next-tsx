"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { 
 
} from "lucide-react";
import DashboardSalesPage from "@/components/dashboard-components/sales/dashboard";
import { useUser } from "@/providers/userContext";
import DataAnalyzerDashboardPage from "@/components/dashboard-components/data-analyzer/dashboard";

const DashboardPage = () => {
  const router = useRouter();
  const { user, loading } = useUser(); 



    if (loading) return;

    if (user?.designation?._id === "desg-data-analyzer") {
         return <DataAnalyzerDashboardPage />;
    }else {
 return <DashboardSalesPage />;
    }
    // else let them stay on this page

  
  const handleLogout = () => {
    router.push("/");
  };


  //

};

export default DashboardPage;
