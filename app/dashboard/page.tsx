"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { 
} from "lucide-react";
import DashboardSalesPage from "@/components/dashboard-components/sales/dashboard";
import { useUser } from "@/providers/userContext";
import DataAnalyzerDashboardPage from "@/components/dashboard-components/data-analyzer/dashboard";
import ClosingManagerPage from "../closing-manager-dashboard/page";
import DataAnalyzerDashboard from "../data-analyzer-dashboard/page";
import SalesManagerPage from "../sales-manager/page";

const DashboardPage = () => {
  const { user, loading } = useUser(); 


// console.log("user ",user);
    if (loading) return;

    if (user?.designation?._id === "desg-data-analyzer") {
         return <DataAnalyzerDashboard />;
    } else if (user?.designation?._id === "desg-sales-executive") {
         return <SalesManagerPage />;
    }
    else {
 return <ClosingManagerPage />;
    }
    // else let them stay on this page  

  //

};

export default DashboardPage;
