"use client";
import styles from "./dataanalyzer.module.css";
import DataHeader from "../../../components/dashboard-components/data-analyzer-dashboard/DashboardHeader";
import SectionTap from "../../../components/dashboard-components/data-analyzer-dashboard/Overview";
import { useState, useEffect } from "react";
import Enquiries from "@/components/dashboard-components/data-analyzer-dashboard/EnquiriesSection";
import InventoryMain from "@/components/Inventory/InventoryMain";
import { useRouter } from "next/navigation";

const DataAnalyzerDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();

  useEffect(() => {
    if (activeTab === "tagging") {
      router.push("/tagging-form");
    }
  }, [activeTab, router]);

  return (
    <div className={styles.teamplate}>
      <DataHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className={styles.detlContainer}>
        {activeTab === "overview" && <SectionTap />}
        {activeTab === "enquiry" && <Enquiries />}
        {activeTab === "inventory" && <InventoryMain />}
      </div>
    </div>
  );
};

export default DataAnalyzerDashboard;
