import React, { useState } from "react";
import styles from "@/components/visit-components/filterDialog.module.css";

const PROJECTS = ["Project A", "Project B", "Project C"];
const MANAGERS = ["Manager 1", "Manager 2", "Manager 3"];
const STATUSES = ["Pending", "Confirmed", "Cancelled"];
const DATE_OPTIONS = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "Last 30 Days",
  "Custom",
];

interface LeadbookingfilterProps {
  open: boolean;
  onClose: () => void;
}

export function Leadbookingfilter({ open, onClose }: LeadbookingfilterProps) {
  const [project, setProject] = useState("");
  const [manager, setManager] = useState("");
  const [status, setStatus] = useState("");
  const [datePreset, setDatePreset] = useState("Today");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  if (!open) return null;

  const isCustomDate = datePreset === "Custom";

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const clearAll = () => {
    setProject("");
    setManager("");
    setStatus("");
    setDatePreset("Today");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2>Filter Bookings</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.fieldGroup}>
            <label>Project</label>
            <select
              value={project}
              onChange={(e) => setProject(e.target.value)}
              className={styles.select}
            >
              <option value="">All Projects</option>
              {PROJECTS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Closing Manager</label>
            <select
              value={manager}
              onChange={(e) => setManager(e.target.value)}
              className={styles.select}
            >
              <option value="">All Managers</option>
              {MANAGERS.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Booking Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className={styles.select}
            >
              <option value="">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Select Date</label>
            <select
              value={datePreset}
              onChange={(e) => setDatePreset(e.target.value)}
              className={styles.select}
            >
              {DATE_OPTIONS.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>

            {isCustomDate && (
              <div className={styles.dateRange}>
                <input
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className={styles.dateInput}
                />
                <span>to</span>
                <input
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            )}
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={clearAll} className={styles.clearBtn}>
            Clear All
          </button>
          <button onClick={onClose} className={styles.applyBtn}>
            Apply
          </button>
        </div>
      </div>
    </div>
  );
}
