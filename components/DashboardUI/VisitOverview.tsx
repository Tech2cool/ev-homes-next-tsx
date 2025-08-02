"use client";
import React from "react";
import styles from "../DashboardUI/Visitoverview.module.css";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { Pointer } from "lucide-react";

const dynamicVisitData = [
  {
    name: "Approved",
    value: 15,
    color: "#28a745",
  },
  {
    name: "Rejected",
    value: 25,
    color: "#dc3545",
  },
  {
    name: "Pending",
    value: 50,
    color: "#ffc107",
  },
];

function VisitOverview() {
  return (
    <div className={styles.VisitWrapper}>
      <h2 className={styles.sectionHeader}>Visit Overview</h2>

      <div className={styles.VisitContainer}>
        <div className={styles.GraphWithInfo}>
        <ResponsiveContainer className={styles.Graphsection}  >
          <PieChart>
            <Pie
              data={dynamicVisitData}
              cx="50%"
              cy="50%"
              innerRadius="52%"
              outerRadius="80%"
              startAngle={180}
              endAngle={0}
              paddingAngle={5}
              dataKey="value"
            >
              {dynamicVisitData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>  
        <div className={styles.VisitInfo}>
          <p className={styles.VisitNumber}>1844</p>
          <p className={styles.TotalVisits}>Total Visits</p>
          <a
            href="#"
            className={styles.ViewVisit}
            style={{
              color: "rgb(27,158,201)",
              marginTop: "1vh",
              textDecoration: "none",
              cursor: "Pointer",
            }}
          >
            View Total Visits
          </a>
        </div>
        </div>
        <div>

          <div className={`${styles.OverviewStatus} ${styles.Approved}`} >
            {" "}
            <div className={styles.GreenDot}>
              <p>g</p>
            </div>{" "}
            Approved <div>685</div> <div className={styles.percentage}>35%</div>
          </div>

          <div className={styles.OverviewStatus}>
            {" "}
            <div className={styles.RedDot}>
              <p>r</p>
            </div>
            Rejected <div>17 </div>
            <div className={styles.percentage}>1%</div>
          </div>


          <div className={styles.OverviewStatus}>
          {" "}
          <div className={styles.YellowDot}>
            <p>y</p>
          </div>{" "}
          Pending <div>1</div>
          <div className={styles.percentage}>0%</div>
        </div>{" "}


        </div>
        
      </div>
    </div>
  );
}
export default VisitOverview;
