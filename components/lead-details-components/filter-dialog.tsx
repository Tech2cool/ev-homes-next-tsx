import React, { useState, useEffect } from "react";
import styles from "@/components/visit-components/filterDialog.module.css";

const VISIT_TYPES = [
  "",
  "Pending",
  "visit-done", 
  "revisit-done",
  "Visit Pending",
  "Revisit Pending",
  "Line up",
];

const LEAD_FILTER = ["", "Live lead", "Transfer Lead"];

const STATUS_FILTER = ["", "Assigned", "Not Assigned"];

const FEEDBACK_FILTER = [
  "",
  "Call Connected",
  "Call Disconnected", 
  "Call Not Received",
  "Call Not Reachable",
  "Call Busy",
  "Call Abrupt",
];

const CLIENT_STATUS = ["", "interested", "not-interested", "DND", "moderate"];

const LEAD_STATUS = [
  "",
  "just-curious",
  "in-progress", 
  "supposed-to-visit",
  "lost",
];

const CYCLE_STATUS = ["", "120", "60", "30"];

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onOpenChange: (open: boolean) => void;
  filters: {
    visitType: string;
    leadFilter: string;
    statusFilter: string;
    feedbackFilter: string;
    clientStatus: string;
    leadStatus: string;
    cycleStatus: number;
    dateFrom: string;
    dateTo: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  visits: any[];
  resultCount: number;
}

export function LeadFilterDialog({ 
  open,
  onClose,
  onOpenChange,
  filters,
  onFiltersChange,
  onClearFilters,
  visits,
  resultCount,
}: FilterDialogProps) {
  const [datePreset, setDatePreset] = useState("today");
  const [localFilters, setLocalFilters] = useState(filters);

  // Update local filters when props change
  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleChange = (key: string, value: string) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
  };

  const handleDatePresetChange = (preset: string) => {
    setDatePreset(preset);
    const today = new Date();
    let dateFrom = "";
    let dateTo = "";

    switch (preset) {
      case "today":
        dateFrom = today.toISOString().split('T')[0];
        dateTo = today.toISOString().split('T')[0];
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        dateFrom = yesterday.toISOString().split('T')[0];
        dateTo = yesterday.toISOString().split('T')[0];
        break;
      case "last7days":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        dateFrom = weekAgo.toISOString().split('T')[0];
        dateTo = today.toISOString().split('T')[0];
        break;
      case "custom":
        // Don't change dates for custom
        return;
      default:
        break;
    }

    if (preset !== "custom") {
      const newFilters = { ...localFilters, dateFrom, dateTo };
      setLocalFilters(newFilters);
    }
  };

  const  applyFilters = () => {
    onFiltersChange(localFilters);
    onClose();
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      visitType: "",
      leadFilter: "",
      statusFilter: "",
      feedbackFilter: "",
      clientStatus: "",
      leadStatus: "",
      cycleStatus: 0,
      dateFrom: "",
      dateTo: "",
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
    setDatePreset("today");
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!open) return null;

  const isCustomDate = datePreset === "custom";

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.dialog}>
        <div className={styles.header}>
          <h2>Filter Leads</h2>
          <button onClick={onClose} className={styles.closeBtn}>
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.fieldGroup}>
            <label>Visit Type</label>
            <select
              value={localFilters.visitType}
              onChange={(e) => handleChange("visitType", e.target.value)}
              className={styles.select}
            >
              <option value="">All Visit Types</option>
              {VISIT_TYPES.slice(1).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Lead Filter</label>
            <select
              value={localFilters.leadFilter}
              onChange={(e) => handleChange("leadFilter", e.target.value)}
              className={styles.select}
            >
              <option value="">All Lead Types</option>
              {LEAD_FILTER.slice(1).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Status Filter</label>
            <select
              value={localFilters.statusFilter}
              onChange={(e) => handleChange("statusFilter", e.target.value)}
              className={styles.select}
            >
              <option value="">All Statuses</option>
              {STATUS_FILTER.slice(1).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Feedback Filter</label>
            <select
              value={localFilters.feedbackFilter}
              onChange={(e) => handleChange("feedbackFilter", e.target.value)}
              className={styles.select}
            >
              <option value="">All Feedback Types</option>
              {FEEDBACK_FILTER.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Client Status</label>
            <select
              value={localFilters.clientStatus}
              onChange={(e) => handleChange("clientStatus", e.target.value)}
              className={styles.select}
            >
              <option value="">All Client Statuses</option>
              {CLIENT_STATUS.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Lead Status</label>
            <select
              value={localFilters.leadStatus}
              onChange={(e) => handleChange("leadStatus", e.target.value)}
              className={styles.select}
            >
              <option value="">All Lead Statuses</option>
              {LEAD_STATUS.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Cycle Status (Days)</label>
            <select
              value={localFilters.cycleStatus}
              onChange={(e) => handleChange("cycleStatus", e.target.value)}
              className={styles.select}
            >
              <option value="">All Cycle Statuses</option>
              {CYCLE_STATUS.slice(1).map((status) => (
                <option key={status} value={status}>
                  {status} days
                </option>
              ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Date Filter</label>
            <select
              value={datePreset}
              onChange={(e) => handleDatePresetChange(e.target.value)}
              className={styles.select}
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
                  value={localFilters.dateFrom}
                  onChange={(e) => handleChange("dateFrom", e.target.value)}
                  className={styles.dateInput}
                />
                <span>to</span>
                <input
                  type="date"
                  value={localFilters.dateTo}
                  onChange={(e) => handleChange("dateTo", e.target.value)}
                  className={styles.dateInput}
                />
              </div>
            )}
          </div>

          <div className={styles.resultCount}>
            Results: {resultCount} leads
          </div>
        </div>

        <div className={styles.actions}>
          <button onClick={clearAllFilters} className={styles.clearBtn}>
            Clear All
          </button>
          <button onClick={applyFilters} className={styles.applyBtn}>
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
}
