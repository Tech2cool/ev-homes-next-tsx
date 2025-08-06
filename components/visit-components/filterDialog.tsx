// File: components/FilterDialog.jsx
import React, { useState } from "react";
import styles from "./filterDialog.module.css";

const DATE_OPTIONS = ["today", "yesterday", "last7days", "custom"];
const VISIT_TYPES = ["visit", "revisit", "virtual-meeting"];
const APPROVAL_STATUSES = ["pending", "approved", "rejected"];

export function FilterDialog({
  open,
  onClose,
  filters,
  onFiltersChange,
  onClearFilters,
  visits,
}:any) {
  const [datePreset, setDatePreset] = useState("today");

  const managers = [
    ...new Set(visits?.map((v:any) => v.closingManager?._id).filter(Boolean)),
  ];

  const handleChange = (key:any, value:any) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const isCustomDate = datePreset === "custom";

  const handleOverlayClick = (e:any) => {
    // Close only if the click is on the overlay itself
    if (e.target.classList.contains(styles.overlay)) {
      onClose();
    }
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.overlay}>
        <div className={styles.dialog}>
          <div className={styles.header}>
            <h2>Filter Visits</h2>
            <button onClick={onClose} className={styles.closeBtn}>
              ×
            </button>
          </div>

          <div className={styles.fieldGroup}>
            <label>Visit Type</label>
            <select
              value={filters.visitType}
              onChange={(e) => handleChange("visitType", e.target.value)}
            >
              <option value="">All</option>
              {VISIT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <label>Approval Status</label>
            <select
              value={filters.approvalStatus}
              onChange={(e) => handleChange("approvalStatus", e.target.value)}
            >
              <option value="">All</option>
              {APPROVAL_STATUSES.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            
            
            <label>Closing Manager</label>
            <select
              value={filters.closingManager}
              onChange={(e) => handleChange("closingManager", e.target.value)}
            >
              <option value="">All</option>
              {managers.map((mgr:any) => (
                <option key={mgr} value={mgr}>
                  {mgr}
                </option>
              ))}
            </select>

            <label>Date Filter</label>
            <select
              value={datePreset}
              onChange={(e) => setDatePreset(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="yesterday">Yesterday</option>
              <option value="last7days">Last 7 Days</option>
              <option value="custom">Custom Range</option>
            </select>

            {isCustomDate && (
              <div className={styles.dateRange}>
                <input
                  type="date"
                  value={filters.dateFrom}
                  onChange={(e) => handleChange("dateFrom", e.target.value)}
                />
                <span>to</span>
                <input
                  type="date"
                  value={filters.dateTo}
                  onChange={(e) => handleChange("dateTo", e.target.value)}
                />
              </div>
            )}
          </div>

          <div className={styles.actions}>
            <button onClick={onClearFilters} className={styles.clearBtn}>
              Clear All
            </button>
            <button onClick={onClose} className={styles.applyBtn}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
