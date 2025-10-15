"use client";

import { useState } from "react";
import styles from "./target-section.module.css";
import {
  Flag,
  Home,
  Trophy,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";
import type { JSX } from "react/jsx-runtime";
import { BsCardChecklist } from "react-icons/bs";
import { PiChartLineUpLight } from "react-icons/pi";
import { GrGroup } from "react-icons/gr";

type Metric = {
  label: string;
  value: number;
  tone: "blue" | "rose" | "amber";
  icon: "flag" | "home" | "trophy";
};

type ProjectTarget = {
  projectName: string;
  items: Array<{ label: string; value: number }>;
};

export interface TargetSectionProps {
  title?: string;
  progressPercent?: number;
  metrics?: Metric[];
  projects?: ProjectTarget[];
}

const ICONS: Record<Metric["icon"], JSX.Element> = {
  flag: <Flag size={18} strokeWidth={2} className="icons" />,
  home: <Home size={18} strokeWidth={2} className="icons" />,
  trophy: <Trophy size={18} strokeWidth={2} className="icons" />,
};

 const data = [
    {
      label: "Target",
      value: 22,
      color1: "#ff7e5f",
      color2: "#feb47b",
      icon: Flag,
      iconColor: "#ff7e5f",
    },
    {
      label: "Booking",
      value: 1,
      color1: "#00b09b",
      color2: "#96c93d",
      icon: Home,
      iconColor: "#00b09b",
    },
    {
      label: "Registration",
      value: 0,
      color1: "#4facfe",
      color2: "#00f2fe",
      icon: Trophy,
      iconColor: "#4facfe",
    },
  ];

export function TargetSection({
  progressPercent = 0,
  
  metrics = [
    { label: "Target", value: 22, tone: "blue", icon: "flag" },
    { label: "Booking", value: 0, tone: "rose", icon: "home" },
    { label: "Registration", value: 0, tone: "amber", icon: "trophy" },
  ],
  projects = [
    {
      projectName: "EV 23 Malibu West",
      items: [
        { label: "Target", value: 6 },
        { label: "Booking", value: 0 },
        { label: "Registration", value: 0 },
      ],
    },
    {
      projectName: "EV 10 Marina Bay",
      items: [
        { label: "Target", value: 9 },
        { label: "Booking", value: 0 },
        { label: "Registration", value: 0 },
      ],
    },
    {
      projectName: "EV Heart City",
      items: [
        { label: "Target", value: 7 },
        { label: "Booking", value: 0 },
        { label: "Registration", value: 0 },
      ],
    },
    {
      projectName: "EV 9 Square",
      items: [
        { label: "Target", value: 1 },
        { label: "Booking", value: 0 },
        { label: "Registration", value: 0 },
      ],
    },
  ],
}: TargetSectionProps) {
  const [activeProject, setActiveProject] = useState(0);

  const prev = () =>
    setActiveProject((p) => (p - 1 + projects.length) % projects.length);
  const next = () => setActiveProject((p) => (p + 1) % projects.length);

  const current = projects[activeProject];

  return (
    <>
      <div className="p-6 pt-0">
        <h2 className="text-xl font-semibold text-foreground mb-6">Target</h2>
       <section
  className={`${styles.wrap} bg-card text-card-foreground rounded-xl shadow-sm p-2 border`}
  aria-labelledby="target-section-heading"
>
          {/* Transparent container with spacing from corners */}

          <div className={styles.transparentContainer}>
            <div className={styles.centeredContent}>
              
              <div className={styles.overviewHead}>
                <span className={styles.overviewTitle}>Target Overview</span>
              </div>

              <div className={styles.overviewHead}>
                <span className={styles.progressText}>
                  Progress {progressPercent}%
                </span>
              </div>

               <div className={styles.grafcontainer}>
          {data.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div className={styles.mytr} key={index}>
                <div
                  className={styles.donut}
                  style={{
                    background: `conic-gradient(from 0deg, ${item.color1} 0%, ${item.color2} ${item.value}%, #e0e0e0 ${item.value}% 100%)`,
                  }}
                >
                  <div
                    className={styles.iconBg}
                    style={{ color: item.iconColor }}
                  >
                    <IconComponent size={40} />
                  </div>
                  <div className={styles.centerNumber}>{item.value}</div>
                </div>
                <div className={styles.label}>{item.label}</div>
              </div>
            );
          })}
        </div>

            </div>
          </div>

          <div className={styles.right} aria-label="Project Targets">
            <div className={styles.rightHeader}>
              <span className={styles.rightTitle}>Project Targets</span>
            </div>

            <div className={styles.projectSwitcher} aria-live="polite">
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous project"
                onClick={prev}
              >
                <ChevronLeft size={16} />
              </button>

              <div
                className={styles.projectBadge}
                role="group"
                aria-label="Selected project"
              >
                <Building2
                  size={16}
                  className={styles.projectIcon}
                  aria-hidden="true"
                />
                <span className={styles.projectName}>
                  {current.projectName}
                </span>
              </div>

              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next project"
                onClick={next}
              >
                <ChevronRight size={16} />
              </button>
            </div>

            <div
              className={styles.projectList}
              role="list"
              aria-label="Project target items"
            >
              {current.items.map((it, i) => (
                <button
                  key={i}
                  role="listitem"
                  className={styles.projectRow}
                  aria-label={`${it.label} ${it.value}`}
                  type="button"
                >
                  <span className={styles.projectRowLabel}>{it.label}</span>
                  <span className={styles.projectRowValue}>{it.value}</span>
                </button>
              ))}
            </div>
          </div>

          {/* second */}
        </section>
      </div>
    </>
  );
}

export default TargetSection;
