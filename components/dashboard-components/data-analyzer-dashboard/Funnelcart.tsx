"use client";
import React, { useState } from "react";
import { FaFilter } from "react-icons/fa";
import styles from "./reportssection.module.css";

const funnelStages = [
  { stage: "Site Visits", count: 2000, color: "#0088FE" },
  { stage: "Visited", count: 800, color: "#00C49F" },
  { stage: "Revisited", count: 600, color: "#FFBB28" },
  { stage: "Approved", count: 300, color: "#FF8042" },
  { stage: "Booked", count: 30, color: "#FF6347" },
  { stage: "Rejected", count: 10, color: "#FF4500" },
];

const filterOptions = ["Weekly", "Monthly", "Quarterly", "Semi-Annually", "Annually"];

const FunnelChart: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);

  const total = funnelStages.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className={styles.leadsFunnel}>
      <div className={styles.chartHeader}>
        <span>Leads Funnel</span>
        <div className={styles.filterWrapper}>
          <FaFilter onClick={() => setShowFilter(!showFilter)} />
          {showFilter && (
            <div className={styles.filterDropdown}>
              {filterOptions.map((opt) => (
                <div key={opt} className={styles.filterOption}>
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.totalCount}>Total Leads: {total}</div>

      <div className={styles.funnelContainer}>
        {funnelStages.map((stage, index) => {
          
          const max = funnelStages[0].count;
          const widthPercent = 100 - index * 15; 
          return (
            <div
              key={index}
              className={styles.funnelStage}
              style={{
                backgroundColor: stage.color,
                width: `${widthPercent}%`,
              }}
            >
              <span className={styles.stageLabel}>
                {stage.stage}: {stage.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FunnelChart;
