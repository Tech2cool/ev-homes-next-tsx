import React, { useState, useEffect } from "react";
import styles from "@/components/visit-components/filterDialog.module.css";
import { PaginationProps } from "@mui/material/Pagination";

const VISIT_TYPE_MAP: { [key: string]: string } = {
  All: "all",
  Pending: "pending",
  "visit-done": "visit-done",
  "revisit-done": "revisit-done",
  "Visit Pending": "visit-pending",
  "Revisit Pending": "revisit-pending",
  "Line up": "line-up",
};

const LEAD_FILTER_MAP: { [key: string]: string } = {
  "Live lead": "live-lead",
  "Transfer Lead": "transfer-lead",
};

const STATUS_FILTER_MAP: { [key: string]: string } = {
  Assigned: "assigned",
  "Not Assigned": "not-assigned",
  "Feedback pending": "feedback-pending",
};

const FEEDBACK_FILTER_MAP: { [key: string]: string } = {
  "Call Connected": "Call Connected",
  "Call Disconnected": "Call Disconnected",
  "Call Not Received": "Call Not Received",
  "Call Not Reachable": "Call Not Reachable",
  "Call Busy": "Call Busy",
  "Call Abrupt": "Call Abrupt",
};

const CLIENT_STATUS_MAP: { [key: string]: string } = {
  interested: "interested",
  "not-interested": "not-interested",
  DND: "DND",
  moderate: "moderate",
};

const LEAD_STATUS_MAP: { [key: string]: string } = {
  "just-curious": "just-curious",
  "in-progress": "in-progress",
  "supposed-to-visit": "supposed-to-visit",
  lost: "lost",
};

const CYCLE_STATUS_MAP: { [key: string]: number } = {
  "120": 120,
  "60": 60,
  "30": 30,
};

const PROPERTY_TYPE_MAP: { [key: string]: string } = {
  Residential: "Residential",
  Commercial: "Commercial",
};

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
    propertyType: string;
    cycleStatus: number;
    dateFrom: string;
    dateTo: string;
  };
  onFiltersChange: (filters: any) => void;
  onClearFilters: () => void;
  visits: any[];
  resultCount: number;
  onApplyFilters: (filterParams: any) => void; // Add this prop
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
  onApplyFilters, // Receive the apply function
}: FilterDialogProps) {
  const [datePreset, setDatePreset] = useState("today");
  const [localFilters, setLocalFilters] = useState(filters);

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
        dateFrom = today.toISOString().split("T")[0];
        dateTo = today.toISOString().split("T")[0];
        break;
      case "yesterday":
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        dateFrom = yesterday.toISOString().split("T")[0];
        dateTo = yesterday.toISOString().split("T")[0];
        break;
      case "last7days":
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        dateFrom = weekAgo.toISOString().split("T")[0];
        dateTo = today.toISOString().split("T")[0];
        break;
      case "custom":
        return;
      default:
        break;
    }

    if (preset !== "custom") {
      const newFilters = { ...localFilters, dateFrom, dateTo };
      setLocalFilters(newFilters);
    }
  };

  const applyFilters = () => {
    // Convert UI filters to API parameters
    const apiFilters = {
      status:
        VISIT_TYPE_MAP[localFilters.visitType as keyof typeof VISIT_TYPE_MAP],
      taskType:
        LEAD_FILTER_MAP[
          localFilters.leadFilter as keyof typeof LEAD_FILTER_MAP
        ],
      status2:
        STATUS_FILTER_MAP[
          localFilters.statusFilter as keyof typeof STATUS_FILTER_MAP
        ],
      callData:
        FEEDBACK_FILTER_MAP[
          localFilters.feedbackFilter as keyof typeof FEEDBACK_FILTER_MAP
        ],
      clientstatus:
        CLIENT_STATUS_MAP[
          localFilters.clientStatus as keyof typeof CLIENT_STATUS_MAP
        ],
      leadstatus:
        LEAD_STATUS_MAP[
          localFilters.leadStatus as keyof typeof LEAD_STATUS_MAP
        ],
      cycle:
        CYCLE_STATUS_MAP[
          localFilters.cycleStatus.toString() as keyof typeof CYCLE_STATUS_MAP
        ],
      propertyType: PROPERTY_TYPE_MAP[localFilters.propertyType],
      startDateDeadline: localFilters.dateFrom || null,
      endDateDeadline: localFilters.dateTo || null,
    };

    // Call the parent function to apply filters
    onApplyFilters(apiFilters);
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
      propertyType: "",
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
          {/* Keep all your existing JSX structure */}
          <div className={styles.fieldGroup}>
            <label>Visit Type</label>
            <select
              value={localFilters.visitType}
              onChange={(e) => handleChange("visitType", e.target.value)}
              className={styles.select}
            >
              <option value="">All Visit Types</option>
              {Object.keys(VISIT_TYPE_MAP)
                .filter((key) => key)
                .map((type) => (
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
              {Object.keys(LEAD_FILTER_MAP)
                .filter((key) => key)
                .map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
            </select>
          </div>

          <div className={styles.fieldGroup}>
            <label>Property Filter</label>
            <select
              value={localFilters.propertyType}
              onChange={(e) => handleChange("propertyType", e.target.value)}
              className={styles.select}
            >
              <option value="">All Property Types</option>
              {Object.keys(PROPERTY_TYPE_MAP).map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Add similar mapping for other filter types */}
          <div className={styles.fieldGroup}>
            <label>Status Filter</label>
            <select
              value={localFilters.statusFilter}
              onChange={(e) => handleChange("statusFilter", e.target.value)}
              className={styles.select}
            >
              <option value="">All Statuses</option>
              {Object.keys(STATUS_FILTER_MAP)
                .filter((key) => key)
                .map((type) => (
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
              {Object.keys(FEEDBACK_FILTER_MAP)
                .filter((key) => key)
                .map((status) => (
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
              {Object.keys(CLIENT_STATUS_MAP)
                .filter((key) => key)
                .map((status) => (
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
              {Object.keys(LEAD_STATUS_MAP)
                .filter((key) => key)
                .map((status) => (
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
              <option value={0}>All Cycle Statuses</option>
              {Object.keys(CYCLE_STATUS_MAP)
                .filter((key) => key)
                .map((days) => (
                  <option key={days} value={days}>
                    {days} days
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

          <div className={styles.resultCount}>Results: {resultCount} leads</div>
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
