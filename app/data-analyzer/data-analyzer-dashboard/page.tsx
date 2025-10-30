"use client";
import styles from "./dataanalyzer.module.css"
import DataHeader from "../../../components/dashboard-components/data-analyzer-dashboard/DashboardHeader"
import SectionTap from "../../../components/dashboard-components/data-analyzer-dashboard/Overview"
import { useState } from "react";
import TaggingForm from "@/components/dashboard-components/data-analyzer-dashboard/TaggingFrom";
import Enquiries from "@/components/dashboard-components/data-analyzer-dashboard/EnquiriesSection"
import InventoryMain from "@/components/Inventory/InventoryMain";
const DataAnalyzerDashboard = () => {

  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className={styles.teamplate}>
      <DataHeader setActiveTab={setActiveTab} activeTab={activeTab} />
      <div className={styles.detlContainer}>
       {activeTab ==="overview" && <SectionTap/>}
        {activeTab === "enquiry" && <Enquiries/>}
        {activeTab === "inventory" && <InventoryMain/>}
        {activeTab === "tagging" && <TaggingForm/>}
      </div>
    </div>
  );
};

export default DataAnalyzerDashboard;
