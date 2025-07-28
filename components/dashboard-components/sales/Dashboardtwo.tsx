import React from "react";
import Navbar from "./DashboardNavbar/Navbar";
import Userprofile from "../../DashboardUI/Userprofile";
import "../../DashboardUI/Main.module.css";
import styles from "../../DashboardUI/Dashboardtwo.module.css";
import Selectsection from "../../DashboardUI/Selectsection";
import Leadsoverview from "../../DashboardUI/Leadsoverview";
import VisitOverview from "@/components/DashboardUI/VisitOverview";

function DashboardTwo() {
  return (
    <div className={styles.Maincontainer}>
      <Navbar />
      <Userprofile />
      <div className={styles.container}>
        <Selectsection />
        <Leadsoverview />
        <VisitOverview />
      </div>
    </div>
  );
}
export default DashboardTwo;
