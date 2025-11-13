import React, { useState } from "react";
import Image from "next/image";
import styles from "./maintab.module.css";
import { MdBadge } from "react-icons/md";
import { IoPersonCircle } from "react-icons/io5";

import AttendanceSection from "./AttendanceSection";
import LeaveSection from "./LeaveSection";
import Personalsection from "./Personalsection";
import WeekOffSection from "./WeekOffSection";
import Regularization from "./Regularizationsection";
import Assets from "./Assetssection";
import ShiftPlannerSection from "./ShiftPlannerSection";
import ReimbursementSection from "./ReimbursementSection";
import ApprovalSection from "./ApprovalSection/ApprovalSection";
import GracetimeSection from "./GracetimeSection";
import { useRouter } from "next/navigation";
// import Overtime from "./Overtime"

const MainTab = () => {
  const router = useRouter();

  const [selectedTab, setSelectedTab] = useState("Attendance");
  const [approvalPendingCount, setApprovalPendingCount] = useState(2); // dummy count

  // Dummy user
  const user = {
    firstName: "John",
    lastName: "Doe",
    employeeId: "EMP12345",
    designation: { designation: "Software Engineer" },
    status: "active",
    profilePic: "",
    permissions: [],
  };


  const renderSection = () => {
    switch (selectedTab) {
      case "Personal":
        return <Personalsection  />;
      case "Attendance":
        return <AttendanceSection />
      case "Leave":
        return <LeaveSection />;
      case "Weekoff":
        return <WeekOffSection  />;
      case "Regularization":
        return <Regularization />;
      case "Gracetime":
        return <GracetimeSection />;
      case "Reimbursement":
        return <ReimbursementSection />;
      case "Assets":
        return <Assets />;
      case "ShiftPlannerRequest":
        return <ShiftPlannerSection  />;

        // case "Overtime" :
        //   return <Overtime />



      case "Approval":
        return (
<ApprovalSection onPendingCountChange={setApprovalPendingCount} />



        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.secondContainer}>
        <div className={styles.container}>
          <div className={styles.profileSection}>
            <Image
              src={
                user?.profilePic ||
                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
              }
              alt="Profile"
              className={styles.profileImage}
              width={100}
              height={100}
            />
            <div className={styles.details}>
              <div className={styles.name}>
                {user?.firstName} {user?.lastName}
              </div>
              <div className={`${styles.status} ${user?.status === "active" ? styles.active : styles.inactive}`}>
                {user?.status === "active" ? "Active" : "Inactive"}
              </div>
            </div>
          </div>
          <div>
            <div className={styles.empid}>
              <IoPersonCircle size={15} color="#d3af1f" /> Emp Id: {user?.employeeId}
            </div>
            <div className={styles.desgination}>
              <MdBadge size={15} color="#d3af1f" /> {user?.designation?.designation}
            </div>
          </div>
        </div>
        <button
          className={styles.btn}
          onClick={() => router.push("./attandance/attendanceinsight")}
        >
          Attendance Insight
          <svg>
            <defs>
              <filter id="glow">
                                <feGaussianBlur result="coloredBlur" stdDeviation="3"></feGaussianBlur>

                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            <rect />
          </svg>
        </button>
      </div>

      <div className={styles.navbar}>
        <div className={styles.links}>
          {[
            "Personal",
            "Attendance",
            "Leave",
            "Weekoff",
            // "Regularization",
            // "Gracetime",
            "Reimbursement",
            "Assets",
            // "ShiftPlannerRequest",
          ].map((tab) => (
            <span
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={selectedTab === tab ? styles.activeTab : ""}
            >
              {tab === "ShiftPlannerRequest" ? "Shift Planner Request" : tab}
            </span>
          ))}

          <div className={styles.rightAligned}>
            <span
              onClick={() => setSelectedTab("Approval")}
              className={`${selectedTab === "Approval" ? styles.activeTab : ""} ${styles.approvalTab}`}
            >
              Approval Section
              {approvalPendingCount > 0 && <span className={styles.badge}>{approvalPendingCount}</span>}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.sectionContainer}>{renderSection()}</div>
    </div>
  );
};

export default MainTab;
