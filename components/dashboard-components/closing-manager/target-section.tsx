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

export function TargetSection({
  progressPercent = 60,
  metrics = [
    { label: "Target", value: 22, tone: "blue", icon: "flag" },
    { label: "Booking", value: 789, tone: "rose", icon: "home" },
    { label: "Registration", value: 2, tone: "amber", icon: "trophy" },
  ],
  projects = [
    {
      projectName: "EV 9 SQUARE",
      items: [
        { label: "Target", value: 789 },
        { label: "Booking", value: 789 },
        { label: "Registration", value: 789 },
      ],
    },
    {
      projectName: "SUNRISE PARK",
      items: [
        { label: "Target", value: 320 },
        { label: "Booking", value: 154 },
        { label: "Registration", value: 45 },
      ],
    },
    {
      projectName: "LAKEVIEW RESIDENCE",
      items: [
        { label: "Target", value: 560 },
        { label: "Booking", value: 210 },
        { label: "Registration", value: 70 },
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
          className={styles.wrap}
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

              <div
                className={styles.metricsRow}
                role="list"
                aria-label="Target metrics"
              >
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    role="listitem"
                    className={`${styles.metricPill} ${
                      styles[`tone-${m.tone}`]
                    }`}
                    aria-label={`${m.label}: ${m.value}`}
                  >
                    <div className={styles.metricIconLabel}>
                      <span className={styles.metricIcon} aria-hidden="true">
                        {ICONS[m.icon]}
                      </span>
                    </div>
                    <span className={styles.metricLabel}>{m.label}</span>
                    <div className={styles.metricValue}>{m.value}</div>
                  </div>
                ))}
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
