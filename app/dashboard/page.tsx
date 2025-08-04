"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import {
 
} from "lucide-react";
import DashboardSalesPage from "@/components/dashboard-components/sales/dashboard";

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return <DashboardSalesPage />;

};

export default DashboardPage;
